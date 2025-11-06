interface FilterState {
  category: string;
  priceRange: string;
  featuredOnly: boolean;
  notes: string;
  season: string;
}

interface ProductFiltersProps {
  initialFilters: FilterState;
  categories: string[];
  notes: string[];
  seasons: string[];
  totalCount: number;
  texts: {
    categoryLabel: string;
    categoryAll: string;
    priceTitle: string;
    priceLabel: string;
    featuredOnly: string;
    notesLabel: string;
    notesAll: string;
    seasonLabel: string;
    seasonAll: string;
    clear: string;
    countLabel: string;
  };
  onFiltersChange: (filters: FilterState) => void;
}

import React from 'react';

export function ProductFilters({
  initialFilters,
  categories,
  notes,
  seasons,
  totalCount,
  texts,
  onFiltersChange
}: ProductFiltersProps) {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters);

  const handleFilterChange = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
    onFiltersChange(newFilters);
  };

  const updateURL = (filters: FilterState) => {
    const url = new URL(window.location.href);
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== false) {
        url.searchParams.set(key, value.toString());
      } else {
        url.searchParams.delete(key);
      }
    });
    window.location.href = url.toString();
  };

  const clearFilters = () => {
    const cleared = {
      category: '',
      priceRange: '',
      featuredOnly: false,
      notes: '',
      season: ''
    };
    setFilters(cleared);
    updateURL(cleared);
    onFiltersChange(cleared);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
          {texts.categoryLabel}
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm"
        >
          <option value="">{texts.categoryAll}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
          {texts.priceTitle}
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm"
        >
          <option value="">All prices</option>
          <option value="0-50">Under €50</option>
          <option value="50-100">€50 - €100</option>
          <option value="100-200">€100 - €200</option>
          <option value="200+">Over €200</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
          {texts.notesLabel}
        </label>
        <select
          value={filters.notes}
          onChange={(e) => handleFilterChange('notes', e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm"
        >
          <option value="">{texts.notesAll}</option>
          {notes.map((note) => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
          {texts.seasonLabel}
        </label>
        <select
          value={filters.season}
          onChange={(e) => handleFilterChange('season', e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm"
        >
          <option value="">{texts.seasonAll}</option>
          {seasons.map((season) => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => handleFilterChange('featuredOnly', e.target.checked)}
            className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] rounded"
          />
          <span className="text-sm font-medium text-[var(--color-secondary)]">{texts.featuredOnly}</span>
        </label>
      </div>

      <div className="mb-4 text-sm text-[var(--color-secondary)]/70">
        {texts.countLabel.replace('{{count}}', totalCount.toString())}
      </div>

      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 bg-gray-100 text-[var(--color-secondary)] rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium mb-2"
      >
        {texts.clear}
      </button>
    </div>
  );
}