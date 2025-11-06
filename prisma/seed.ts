import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      slug: 'chanel-n5',
      name: 'Chanel N°5',
      description: 'The iconic floral aldehydic fragrance, a timeless classic.',
      price: 150.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Women',
      tenant_id: 'perfume',
      attributes: {
        notes: ['Floral', 'Aldehydic', 'Powdery'],
        seasons: ['Spring', 'Summer']
      }
    },
    {
      slug: 'dior-sauvage',
      name: 'Dior Sauvage',
      description: 'A fresh and spicy masculine fragrance with notes of pepper and lavender.',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Men',
      tenant_id: 'perfume',
      attributes: {
        notes: ['Pepper', 'Lavender', 'Amber'],
        seasons: ['Spring', 'Summer']
      }
    },
    {
      slug: 'gucci-bloom',
      name: 'Gucci Bloom',
      description: 'A romantic floral scent with tuberose and jasmine.',
      price: 130.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Women',
      tenant_id: 'perfume',
    },
    {
      slug: 'tom-ford-oud-wood',
      name: 'Tom Ford Oud Wood',
      description: 'A luxurious oriental fragrance with oud and rose.',
      price: 250.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
    },
    {
      slug: 'yves-saint-laurent-black-opium',
      name: 'Yves Saint Laurent Black Opium',
      description: 'An addictive oriental vanilla fragrance.',
      price: 110.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Women',
      tenant_id: 'perfume',
    },
    {
      slug: 'versace-bright-crystal',
      name: 'Versace Bright Crystal',
      description: 'A fresh and luminous floral fragrance.',
      price: 100.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Women',
      tenant_id: 'perfume',
    },
    {
      slug: 'calvin-klein-ck-one',
      name: 'Calvin Klein CK One',
      description: 'The original unisex fragrance with fresh citrus notes.',
      price: 80.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Women',
      tenant_id: 'perfume',
      attributes: {
        notes: ['Citrus', 'Green', 'Musky'],
        seasons: ['Spring', 'Summer']
      }
    },
    {
      slug: 'burberry-her',
      name: 'Burberry Her',
      description: 'A sophisticated floral fragrance for the modern woman.',
      price: 95.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Women',
      tenant_id: 'perfume',
    },
    {
      slug: 'paco-rabanne-1-million',
      name: 'Paco Rabanne 1 Million',
      description: 'A luxurious masculine fragrance with leather and spice.',
      price: 85.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'jo-malone-london-english-pear',
      name: 'Jo Malone London English Pear',
      description: 'A fruity and floral scent inspired by crisp pears.',
      price: 140.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Women',
      tenant_id: 'perfume',
    },
    {
      slug: 'creed-aventus',
      name: 'Creed Aventus',
      description: 'A legendary fruity fragrance for men.',
      price: 350.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'versace-man',
      name: 'Versace Man',
      description: 'Bold and masculine with citrus and wood.',
      price: 80.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'gucci-pour-homme',
      name: 'Gucci Pour Homme',
      description: 'Sophisticated with leather and tobacco.',
      price: 95.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'armani-code',
      name: 'Armani Code',
      description: 'Magnetic with citrus and tonka bean.',
      price: 85.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'paco-rabanne-invictus',
      name: 'Paco Rabanne Invictus',
      description: 'Victorious aquatic with ambergris.',
      price: 75.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'burberry-brit',
      name: 'Burberry Brit',
      description: 'Fresh and green for the modern man.',
      price: 70.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Men',
      tenant_id: 'perfume',
    },
    {
      slug: 'tom-ford-oud-wood',
      name: 'Tom Ford Oud Wood',
      description: 'A luxurious oriental fragrance with oud and rose.',
      price: 250.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
      attributes: {
        notes: ['Oud', 'Rose', 'Sandalwood'],
        seasons: ['Fall', 'Winter']
      }
    },
    {
      slug: 'creed-original-santai',
      name: 'Creed Original Santal',
      description: 'Rare sandalwood masterpiece.',
      price: 400.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
      attributes: {
        notes: ['Sandalwood', 'Jasmine', 'Vanilla'],
        seasons: ['Fall', 'Winter']
      }
    },
    {
      slug: 'tom-ford-velvet-cherry',
      name: 'Tom Ford Velvet Cherry',
      description: 'Decadent cherry and velvet.',
      price: 220.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
    },
    {
      slug: 'dior-poison-girl',
      name: 'Dior Poison Girl',
      description: 'Sweet and dangerous floral.',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
    },
    {
      slug: 'chanel-sycomore',
      name: 'Chanel Sycomore',
      description: 'Woody elegance for men.',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
    },
    {
      slug: 'ysl-opium-black',
      name: 'YSL Opium Black',
      description: 'Dark oriental seduction.',
      price: 140.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Exclusive Collection',
      tenant_id: 'perfume',
    },
    {
      slug: 'luxury-gift-set',
      name: 'Luxury Gift Set',
      description: 'A curated collection of premium fragrances.',
      price: 250.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Gift Sets',
      tenant_id: 'perfume',
    },
    {
      slug: 'romantic-duo-set',
      name: 'Romantic Duo Set',
      description: 'Perfect for couples: his and hers scents.',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Gift Sets',
      tenant_id: 'perfume',
    },
    {
      slug: 'signature-collection-set',
      name: 'Signature Collection Set',
      description: 'A set of our most popular fragrances.',
      price: 300.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Gift Sets',
      tenant_id: 'perfume',
    },
    {
      slug: 'seasonal-scents-set',
      name: 'Seasonal Scents Set',
      description: 'Fragrances for every season.',
      price: 220.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Gift Sets',
      tenant_id: 'perfume',
    },
    {
      slug: 'luxury-travel-set',
      name: 'Luxury Travel Set',
      description: 'Compact sizes for on-the-go elegance.',
      price: 150.00,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400',
      category: 'Gift Sets',
      tenant_id: 'perfume',
    },
    {
      slug: 'family-bundle-set',
      name: 'Family Bundle Set',
      description: 'Scents for the whole family.',
      price: 250.00,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
      category: 'Gift Sets',
      tenant_id: 'perfume',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('Seeded products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });