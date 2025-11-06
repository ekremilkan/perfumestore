import { e as createAstro, f as createComponent, m as maybeRenderHead, r as renderTemplate, h as addAttribute, l as renderSlot, n as renderHead, k as renderComponent, o as renderScript } from './astro/server_DphMVhZR.mjs';
import 'clsx';
import { g as getCartContext } from './cart_ChTR_Zc6.mjs';
import { a as getBusinessConfig } from './business_eBF7zugw.mjs';
import { env } from 'node:process';
/* empty css                         */

const $$Astro$2 = createAstro("http://localhost:4321");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const { t, businessName } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="bg-[var(--color-secondary)] text-white py-12 mt-20"> <div class="mx-auto max-w-6xl px-6"> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div> <h3 class="font-heading text-lg font-semibold mb-4">${businessName}</h3> <p class="text-sm opacity-80">${t("footer.crafted")}</p> </div> <div> <h4 class="font-semibold mb-4">${t("navigation.collection")}</h4> <ul class="space-y-2 text-sm"> <li><a href="/" class="hover:text-[var(--color-primary)] transition">${t("navigation.home")}</a></li> <li><a href="/#collection" class="hover:text-[var(--color-primary)] transition">${t("navigation.collection")}</a></li> <li><a href="/cart" class="hover:text-[var(--color-primary)] transition">${t("navigation.cart")}</a></li> </ul> </div> <div> <h4 class="font-semibold mb-4">${t("navigation.contact")}</h4> <p class="text-sm opacity-80">${t("footer.contact.email")}</p> <p class="text-sm opacity-80">${t("footer.contact.phone")}</p> </div> </div> <div class="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${businessName}. ${t("footer.copyright")}</p> </div> </div> </footer>`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/layout/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("http://localhost:4321");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { t, cartQuantity, locale, user, businessName, locales, invert } = Astro2.props;
  const cartLabel = t("navigation.cart");
  const cartDescription = t("navigation.cartCount", { count: cartQuantity });
  const isAdmin = user?.role === "ADMIN";
  const loginHref = `/auth/login?lang=${locale}`;
  const logoutHref = `/auth/logout?lang=${locale}&redirectTo=/`;
  const mobileMenuId = "mobile-navigation";
  const menuLabel = t("navigation.menu");
  const openMenuLabel = t("navigation.openMenu");
  const closeMenuLabel = t("navigation.closeMenu");
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<nav class="w-full pb-2"> <div class="flex items-center justify-between gap-4 py-1"> <!-- Logo on left --> <a href="/" class="font-heading text-xl font-semibold tracking-wide transition text-white hover:text-[var(--color-primary)]">', '</a> <!-- Navigation links in center --> <div class="hidden items-center gap-6 md:flex"> <a href="/#women" class="text-sm text-white transition hover:text-[var(--color-primary)]">', '</a> <a href="/#men" class="text-sm text-white transition hover:text-[var(--color-primary)]">', '</a> <a href="/#exclusive" class="text-sm text-white transition hover:text-[var(--color-primary)]">', '</a> <a href="/#gifts" class="text-sm text-white transition hover:text-[var(--color-primary)]">', '</a> </div> <!-- Right side items --> <div class="hidden items-center gap-4 md:flex"> <a href="/products" class="inline-flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-black/20 transition"', '> <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"></circle><path d="M20 20l-4.2-4.2" stroke="currentColor" stroke-width="1.5"></path></svg> </a> <a href="/cart" class="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-black/20 transition"', '> <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M7 7h10l-1 12H8L7 7z" stroke="currentColor" stroke-width="1.5"></path><path d="M9 7a3 3 0 116 0" stroke="currentColor" stroke-width="1.5"></path></svg> ', ' </a> <form method="get" action="/" class="relative"> <label class="sr-only" for="language-select">', '</label> <select id="language-select" name="lang" class="rounded-full border px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm focus:outline-none border-[color-mix(in srgb,var(--color-primary) 20%,transparent 80%)] bg-white/80 text-black focus:border-[var(--color-primary)]"', ' onchange="this.form.submit()"> ', ' </select> </form> </div> <!-- Mobile menu button --> <div class="flex items-center gap-2 md:hidden"> <a href="/cart" class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in srgb,var(--color-primary) 25%,transparent 75%)] bg-white/80 text-white shadow-sm backdrop-blur-sm focus:outline-none transition hover:bg-white/90"', '> <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M7 7h10l-1 12H8L7 7z" stroke="currentColor" stroke-width="1.5"></path><path d="M9 7a3 3 0 116 0" stroke="currentColor" stroke-width="1.5"></path></svg> ', ' </a> <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in srgb,var(--color-primary) 20%,transparent 80%)] bg-white/80 text-white shadow-sm backdrop-blur-sm focus:outline-none transition hover:bg-white/90" aria-expanded="false"', ' data-nav-toggle> <span class="sr-only">', '</span> <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg> </button> </div> </div> </nav> <div', ' data-nav-menu class="hidden w-full rounded-3xl border border-[color-mix(in srgb,var(--color-primary) 22%,transparent 78%)] bg-white/90 p-6 shadow-xl backdrop-blur-xl md:hidden"', '> <div class="flex flex-col gap-5"> <div class="flex items-center justify-between"> <span class="font-heading text-lg text-black">', '</span> <button type="button" class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-[var(--color-primary)] text-white transition hover:bg-[color-mix(in srgb,var(--color-primary) 85%,white 15%)] focus:outline-none" data-nav-close> <span class="sr-only">', '</span> <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none"> <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </svg> </button> </div> <a href="/products" class="text-base font-medium text-black transition hover:text-[var(--color-primary)]"> ', ' </a> <a href="/#women" class="text-sm font-medium text-black/70 transition hover:text-[var(--color-primary)] ml-4"> ', ' </a> <a href="/#men" class="text-sm font-medium text-black/70 transition hover:text-[var(--color-primary)] ml-4"> ', ' </a> <a href="/#exclusive" class="text-sm font-medium text-black/70 transition hover:text-[var(--color-primary)] ml-4"> ', ' </a> <a href="/#gifts" class="text-sm font-medium text-black/70 transition hover:text-[var(--color-primary)] ml-4"> ', ' </a> <a href="/cart" class="text-base font-medium text-black transition hover:text-[var(--color-primary)] mt-2"> ', " </a> ", ' <div class="border-t border-[color-mix(in srgb,var(--color-primary) 20%,transparent 80%)] pt-4"> <form method="get" action="/" class="space-y-2"> <label class="block text-xs uppercase tracking-[0.3em] text-[color-mix(in srgb,var(--color-secondary) 65%,white 35%)]" for="mobile-language-select"> ', ' </label> <select id="mobile-language-select" name="lang" class="w-full rounded-full border border-[color-mix(in srgb,var(--color-primary) 20%,transparent 80%)] bg-white px-4 py-2 text-sm text-[var(--color-secondary)] shadow-sm focus:border-[var(--color-primary)] focus:outline-none"', ' onchange="this.form.submit()"> ', ' </select> </form> </div> <div class="flex flex-col gap-3"> ', ' </div> </div> </div> <script type="module">\n  const navToggle = document.querySelector("[data-nav-toggle]");\n  const navMenu = document.querySelector("[data-nav-menu]");\n  const closeButton = document.querySelector("[data-nav-close]");\n\n  function closeMenu() {\n    if (!navMenu || !navToggle) return;\n    navMenu.classList.add("hidden");\n    navToggle.setAttribute("aria-expanded", "false");\n  }\n\n  function openMenu() {\n    if (!navMenu || !navToggle) return;\n    navMenu.classList.remove("hidden");\n    navToggle.setAttribute("aria-expanded", "true");\n  }\n\n  navToggle?.addEventListener("click", () => {\n    if (!navMenu) return;\n    const isHidden = navMenu.classList.contains("hidden");\n    if (isHidden) {\n      openMenu();\n    } else {\n      closeMenu();\n    }\n  });\n\n  closeButton?.addEventListener("click", closeMenu);\n  document.addEventListener("keydown", (event) => {\n    if (event.key === "Escape") {\n      closeMenu();\n    }\n  });\n<\/script>'])), maybeRenderHead(), businessName, t("navigation.primary.women"), t("navigation.primary.men"), t("navigation.primary.exclusiveCollection"), t("navigation.primary.giftSets"), addAttribute(t("navigation.search"), "aria-label"), addAttribute(`${cartLabel} \u2013 ${cartDescription}`, "aria-label"), cartQuantity > 0 && renderTemplate`<span class="absolute -right-0.5 -top-0.5 inline-flex h-3.5 min-w-[0.875rem] items-center justify-center rounded-full bg-[var(--color-accent)] px-0.5 text-[10px] font-bold text-white"> ${cartQuantity} </span>`, t("navigation.language"), addAttribute(locale, "value"), locales.map((code) => renderTemplate`<option${addAttribute(code, "value")}>${code.toUpperCase()}</option>`), addAttribute(`${cartLabel} \u2013 ${cartDescription}`, "aria-label"), cartQuantity > 0 && renderTemplate`<span class="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-bold text-white"> ${cartQuantity} </span>`, addAttribute(mobileMenuId, "aria-controls"), openMenuLabel, addAttribute(mobileMenuId, "id"), addAttribute(menuLabel, "aria-label"), menuLabel, closeMenuLabel, t("navigation.collection"), t("navigation.primary.women"), t("navigation.primary.men"), t("navigation.primary.exclusiveCollection"), t("navigation.primary.giftSets"), cartLabel, isAdmin && renderTemplate`<a href="/admin" class="text-base font-medium text-[var(--color-secondary)] transition hover:text-[var(--color-primary)]"> ${t("navigation.admin")} </a>`, t("navigation.language"), addAttribute(locale, "value"), locales.map((code) => renderTemplate`<option${addAttribute(code, "value")}>${code.toUpperCase()}</option>`), user ? renderTemplate`<a${addAttribute(logoutHref, "href")} class="button-premium inline-flex items-center justify-center rounded-full bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white"> ${t("navigation.signOut")} </a>` : renderTemplate`<a${addAttribute(loginHref, "href")} class="button-premium inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary)]"> ${t("navigation.signIn")} </a>`);
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/layout/Navigation.astro", void 0);

const meta$2 = {"homeTitle":"PerfumeStore – Manufaktur für Düfte","homeDescription":"Entdecke Signaturdüfte für jede Stimmung in der kuratierten Kollektion von PerfumeStore.","productTitle":"{{name}} – PerfumeStore","productDescription":"Erfahre die Duftgeschichte hinter {{name}} von PerfumeStore.","cartTitle":"Dein Warenkorb – PerfumeStore","cartDescription":"Überprüfe deine kuratierte Duftauswahl vor dem Checkout.","loginTitle":"Melde dich bei deinem PerfumeStore-Konto an","adminTitle":"PerfumeStore Admin-Konsole","adminDescription":"Verwalte Produkte, Bestellungen und Mandanten-Erlebnisse zentral."};
const navigation$2 = {"skipToContent":"Zum Inhalt springen","home":"Startseite","collection":"Kollektion","cart":"Warenkorb","cartCount":"{{count}} Artikel","admin":"Admin","signIn":"Anmelden","signOut":"Abmelden","language":"Sprache","menu":"Menü","openMenu":"Navigationsmenü öffnen","closeMenu":"Navigationsmenü schließen","search":"Suche","searchPlaceholder":"Suchen","badge":{"new":"Neu"},"primary":{"women":"Damen","men":"Herren","exclusiveCollection":"Exklusive Kollektion","giftSets":"Geschenksets"},"contact":{"email":"info@parfum.beispiel","phone":"955123456789"},"secondary":{"bestSellers":"Bestseller","latest":"Neuheiten","giftSets":"Geschenksets","promises":"Rituale & Geschichten","everyMoment":"Ein Duft für jeden Moment","orientalNotes":"Orientalische Noten"}};
const hero$2 = {"ribbon":"Maison de Parfum","heading":"Erlebe die Kunst des Dufts","subheading":"Handgemischte Parfums, inspiriert von zeitloser Parfümerie und moderner Eleganz.","primaryCta":"Kollektion entdecken","secondaryCta":"Unsere Geschichte","benefits":{"composition":"Handverarbeitete Essenzen, in Paris veredelt","notes":"Mehrschichtige Kopf-, Herz- und Basisnoten","sillage":"Unaufdringliche, langanhaltende Sillage","refillable":"Wiederbefüllbare Kristallflakons"},"previewLabel":"Duftnoten entdecken","previewTitle":"Olfaktorische Architektur","previewDescription":"Jeder Duft entsteht aus langsam destillierten Botanicals und seltenen Harzen aus nachhaltigen Quellen.","stats":{"top":"Kopf","topNotes":"Spritzige Bergamotte · Rosa Pfeffer","heart":"Herz","heartNotes":"Damaszener Rose · Cashmereholz","base":"Basis","baseNotes":"Ambra-Akkord · Vetiver","longLasting":"Tragedauer","hours":"10 Std. Aura"}};
const products$2 = {"sectionLabel":"Signature-Auswahl","sectionTitle":"Ausgewählte Düfte","priceLabel":"Preis","viewDetails":"Details ansehen","addToCart":"In den Warenkorb","adding":"Wird hinzugefügt…","added":"Hinzugefügt","outOfStock":"Ausverkauft","empty":"Für diesen Mandanten sind noch keine Produkte verfügbar.","newArrival":"Neuheit","overlayDescription":"Entdecken Sie die Schichten und das handwerkliche Können hinter diesem Duft.","uncategorized":"Signature-Blending"};
const product$2 = {"backLink":"Zur Kollektion","notesHeading":"Duftnoten","notesDescription":"Erkunden Sie die aromatische Architektur und kuratierten Akkorde dieses Extraits.","notesFallback":"Von unseren Parfümeuren kuratiert","topNotes":"Kopfnote","heartNotes":"Herznote","baseNotes":"Basisnote","volume":"Flaschengröße","volumeDefault":"50 ml Extrait","longevity":"Duftdauer","longevityHours":"Bis zu {{hours}} Stunden","longevityDefault":"Langanhaltende Spur","category":"Kollektion","tenant":"Signaturhaus","addToCart":"In den Warenkorb","descriptionHeading":"Deshalb wirst du es lieben","relatedHeading":"Harmoniert mit","relatedDescription":"Kombinieren Sie ergänzende Akkorde, um Ihre Aura individuell zu gestalten.","backToCollection":"Zurück zur Kollektion","ingredientsHeading":"Komposition","accordsHeading":"Akkorde","deliveryCopy":"Kostenloser weltweiter Versand bei Bestellungen über 120 €.","outOfStockMessage":"Melde dich für die Warteliste an – dieser Duft kehrt bald zurück.","stock":{"limited":"Limitiert • {{count}} übrig","available":"Verfügbar"}};
const cart$2 = {"title":"Dein Warenkorb","empty":"Dein Warenkorb ist leer. Entdecke unsere Kollektion für deinen nächsten Signaturduft.","continue":"Weiter einkaufen","summary":"Bestellübersicht","subtotal":"Zwischensumme","checkout":"Sicher zur Kasse","items":"Artikel","remove":"Entfernen","quantity":"Menge","update":"Menge aktualisieren","shippingNotice":"Kostenloser Versand ab 120 € Bestellwert."};
const admin$2 = {"title":"Admin-Konsole","subtitle":"Verwalte Produkte, Bestellungen und Mandanten-Erlebnisse zentral.","nav":{"dashboard":"Dashboard","products":"Produkte","orders":"Bestellungen"},"dashboard":{"metrics":{"revenue":"Umsatz","orders":"Bestellungen","customers":"Kunden","inventory":"Artikelanzahl"}},"products":{"title":"Katalog","empty":"Noch keine Produkte vorhanden.","create":"Produkt anlegen","save":"Produkt speichern","update":"Produkt aktualisieren","delete":"Löschen","cancel":"Abbrechen","statusLabel":"Highlight","confirmDelete":"Möchtest du dieses Produkt wirklich löschen?","form":{"name":"Name","slug":"Slug","description":"Beschreibung","price":"Preis","stock":"Bestand","category":"Kategorie","image":"Bild-URL","isFeatured":"Als Highlight markieren","submitCreate":"Produkt erstellen","submitUpdate":"Änderungen speichern"},"table":{"name":"Name","price":"Preis","stock":"Bestand","updated":"Aktualisiert","actions":"Aktionen"},"feedback":{"created":"Produkt erstellt","updated":"Produkt aktualisiert","deleted":"Produkt entfernt"}},"orders":{"title":"Bestellungen","empty":"Noch keine Bestellungen.","table":{"order":"Bestellung","customer":"Kunde","status":"Status","total":"Gesamt","created":"Erstellt","actions":"Aktionen"},"status":{"PENDING":"Ausstehend","PROCESSING":"In Bearbeitung","COMPLETED":"Abgeschlossen","CANCELLED":"Storniert"},"actions":{"view":"Ansehen","markProcessing":"Als in Bearbeitung markieren","markCompleted":"Als abgeschlossen markieren","cancel":"Bestellung stornieren"},"feedback":{"statusUpdated":"Bestellstatus aktualisiert"}},"notifications":{"error":"Etwas ist schiefgelaufen. Bitte erneut versuchen."}};
const footer$2 = {"newsletterHeading":"Bleib in der Duftspur","newsletterDescription":"Erhalte frühzeitigen Zugang zu limitierten Editionen und kuratierten Duftpaarungen.","newsletterPlaceholder":"E-Mail-Adresse","newsletterCta":"Zum Atelier","copyright":"Alle Rechte vorbehalten.","crafted":"Mit Liebe für Duftliebhaber.","contact":{"email":"hello@perfumestore.com","phone":"+49 30 12345678"}};
const auth$2 = {"title":"Bei PerfumeStore anmelden","subtitle":"Nutze einen Einmalcode oder Google, um fortzufahren.","emailLabel":"E-Mail-Adresse","sendOtp":"Code senden","otpLabel":"Einmalcode","otpPlaceholder":"123456","verifyOtp":"Code bestätigen","google":"Mit Google fortfahren","success":"Bitte prüfe dein Postfach auf den Bestätigungscode.","error":"Die Anfrage konnte nicht abgeschlossen werden. Bitte erneut versuchen."};
const filters$2 = {"categoryLabel":"Kategorie wählen","categoryAll":"Alle Kategorien","priceTitle":"Preis","priceLabel":"Max. {{value}}","featuredOnly":"Nur Highlights","clear":"Filter zurücksetzen","countLabel":"{{count}} Düfte angezeigt","empty":"Keine Düfte passen zu deiner Auswahl."};
const pwa$2 = {"installPrompt":"PerfumeStore-App installieren?","offlineReady":"Inhalte sind zwischengespeichert und offline verfügbar.","updateAvailable":"Eine neue Version ist verfügbar.","refresh":"Aktualisieren","close":"Schließen"};
const notifications$2 = {"cartUpdated":"Warenkorb aktualisiert","cartError":"Der Warenkorb konnte nicht aktualisiert werden. Bitte versuche es erneut."};
const de = {
  meta: meta$2,
  navigation: navigation$2,
  hero: hero$2,
  products: products$2,
  product: product$2,
  cart: cart$2,
  admin: admin$2,
  footer: footer$2,
  auth: auth$2,
  filters: filters$2,
  pwa: pwa$2,
  notifications: notifications$2,
};

const meta$1 = {"homeTitle":"PerfumeStore – Artisanal Fragrance House","homeDescription":"Discover signature scents for every mood with PerfumeStore's curated artisan collection.","productTitle":"{{name}} – PerfumeStore","productDescription":"Explore the fragrant story behind {{name}} from PerfumeStore.","cartTitle":"Your Cart – PerfumeStore","cartDescription":"Review your curated perfume selection before checkout.","loginTitle":"Access Your PerfumeStore Account","adminTitle":"PerfumeStore Admin Console","adminDescription":"Manage products, orders, and tenant experiences in one place."};
const navigation$1 = {"skipToContent":"Skip to content","home":"Home","collection":"Collection","cart":"Cart","cartCount":"{{count}} items","admin":"Admin","signIn":"Sign In","signOut":"Sign Out","language":"Language","menu":"Menu","openMenu":"Open navigation menu","closeMenu":"Close navigation menu","search":"Search","searchPlaceholder":"Search","badge":{"new":"New"},"primary":{"women":"Women","men":"Men","exclusiveCollection":"Exclusive Collection","giftSets":"Gift Sets"},"contact":{"email":"info@perfume.example","phone":"955123456789"},"secondary":{"bestSellers":"Best Sellers","latest":"Latest","giftSets":"Gift Sets","promises":"Incense & Promises","everyMoment":"A scent for every moment","orientalNotes":"Oriental notes"}};
const hero$1 = {"ribbon":"Maison de Parfum","heading":"Experience the Art of Scent","subheading":"Hand-blended fragrances inspired by timeless perfumery and modern elegance.","primaryCta":"Explore Collection","secondaryCta":"Discover Our Story","benefits":{"composition":"Hand-milled essences refined in Paris","notes":"Layered top, heart, and base narratives","sillage":"Memorable sillage that lingers softly","refillable":"Refillable crystal flacons"},"previewLabel":"Preview the notes","previewTitle":"Olfactive Architecture","previewDescription":"Each blend is composed with slow-distilled botanicals and rare resins sourced sustainably.","stats":{"top":"Top","topNotes":"Sparkling bergamot · Pink pepper","heart":"Heart","heartNotes":"Damask rose · Cashmere woods","base":"Base","baseNotes":"Ambergris accord · Vetiver","longLasting":"Wear Time","hours":"10h aura"}};
const products$1 = {"sectionLabel":"Signature Edit","sectionTitle":"Featured Scents","priceLabel":"Price","viewDetails":"View Details","addToCart":"Add to Cart","adding":"Adding…","added":"Added","outOfStock":"Out of Stock","empty":"No products are available for this tenant yet.","newArrival":"New Arrival","overlayDescription":"Discover the layered accords and artisanal craftsmanship behind this scent.","uncategorized":"Signature Blend"};
const product$1 = {"backLink":"Back to collection","notesHeading":"Fragrance Notes","notesDescription":"Explore the aromatic architecture and curated accords that define this extrait.","notesFallback":"Curated by our perfumers","topNotes":"Top Notes","heartNotes":"Heart Notes","baseNotes":"Base Notes","volume":"Bottle Size","volumeDefault":"50 ml extrait","longevity":"Longevity","longevityHours":"Up to {{hours}} hours","longevityDefault":"Long-lasting trail","category":"Collection","tenant":"Signature House","addToCart":"Add to Cart","descriptionHeading":"Why you will love it","relatedHeading":"Pairs beautifully with","relatedDescription":"Layer with complementary accords to tailor your aura.","backToCollection":"Return to collection","ingredientsHeading":"Composition","accordsHeading":"Accords","deliveryCopy":"Complimentary worldwide delivery on orders above €120.","outOfStockMessage":"Join the waitlist — this blend will return soon.","stock":{"limited":"Limited • {{count}} left","available":"In stock"}};
const cart$1 = {"title":"Your Cart","empty":"Your cart is empty. Explore our collection to find your next signature scent.","continue":"Continue Shopping","summary":"Order Summary","subtotal":"Subtotal","checkout":"Secure Checkout","items":"Items","remove":"Remove","quantity":"Quantity","update":"Update Quantity","shippingNotice":"Complimentary shipping on orders above €120."};
const admin$1 = {"title":"Admin Console","subtitle":"Manage products, orders, and tenant experiences in one place.","nav":{"dashboard":"Dashboard","products":"Products","orders":"Orders"},"dashboard":{"metrics":{"revenue":"Revenue","orders":"Orders","customers":"Customers","inventory":"SKU Count"}},"products":{"title":"Catalog","empty":"No products are available yet.","create":"Create product","save":"Save product","update":"Update product","delete":"Delete","cancel":"Cancel","statusLabel":"Featured","confirmDelete":"Are you sure you want to delete this product?","form":{"name":"Name","slug":"Slug","description":"Description","price":"Price","stock":"Stock","category":"Category","image":"Image URL","isFeatured":"Mark as featured","submitCreate":"Create product","submitUpdate":"Save changes"},"table":{"name":"Name","price":"Price","stock":"Stock","updated":"Updated","actions":"Actions"},"feedback":{"created":"Product created","updated":"Product updated","deleted":"Product removed"}},"orders":{"title":"Orders","empty":"No orders yet.","table":{"order":"Order","customer":"Customer","status":"Status","total":"Total","created":"Created","actions":"Actions"},"status":{"PENDING":"Pending","PROCESSING":"Processing","COMPLETED":"Completed","CANCELLED":"Cancelled"},"actions":{"view":"View","markProcessing":"Mark processing","markCompleted":"Mark completed","cancel":"Cancel order"},"feedback":{"statusUpdated":"Order status updated"}},"notifications":{"error":"Something went wrong. Try again."}};
const footer$1 = {"newsletterHeading":"Stay in the Sillage","newsletterDescription":"Receive early access to limited drops and curated scent pairings.","newsletterPlaceholder":"Enter your email","newsletterCta":"Join the Atelier","copyright":"All rights reserved.","crafted":"Crafted for fragrance connoisseurs.","contact":{"email":"hello@perfumestore.com","phone":"+1 (555) 123-4567"}};
const auth$1 = {"title":"Sign in to PerfumeStore","subtitle":"Use a one-time code or Google to continue.","emailLabel":"Email address","sendOtp":"Send code","otpLabel":"One-time code","otpPlaceholder":"123456","verifyOtp":"Verify code","google":"Continue with Google","success":"Check your inbox for the verification code.","error":"We could not complete your request. Please try again."};
const filters$1 = {"categoryLabel":"Select category","categoryAll":"All categories","priceTitle":"Price","priceLabel":"Max {{value}}","featuredOnly":"Featured only","clear":"Reset filters","countLabel":"Showing {{count}} fragrances","empty":"No fragrances match your filters yet."};
const pwa$1 = {"installPrompt":"Install PerfumeStore app?","offlineReady":"Content is cached and available offline.","updateAvailable":"A new version is available.","refresh":"Refresh","close":"Close"};
const notifications$1 = {"cartUpdated":"Cart updated","cartError":"We couldn’t update your cart. Please try again."};
const en = {
  meta: meta$1,
  navigation: navigation$1,
  hero: hero$1,
  products: products$1,
  product: product$1,
  cart: cart$1,
  admin: admin$1,
  footer: footer$1,
  auth: auth$1,
  filters: filters$1,
  pwa: pwa$1,
  notifications: notifications$1,
};

const meta = {"homeTitle":"PerfumeStore – El Yapımı Parfüm Evi","homeDescription":"PerfumeStore'un özenle seçilmiş koleksiyonuyla her ruh hâline uygun imza kokuları keşfet.","productTitle":"{{name}} – PerfumeStore","productDescription":"PerfumeStore'un {{name}} kokusunun hikâyesini keşfet.","cartTitle":"Sepetin – PerfumeStore","cartDescription":"Özenle seçilmiş kokularını ödeme öncesinde gözden geçir.","loginTitle":"PerfumeStore hesabına giriş yap","adminTitle":"PerfumeStore Yönetim Paneli","adminDescription":"Ürünleri, siparişleri ve kiracılara özel deneyimleri tek yerden yönet."};
const navigation = {"skipToContent":"İçeriğe geç","home":"Ana Sayfa","collection":"Koleksiyon","cart":"Sepet","cartCount":"{{count}} ürün","admin":"Yönetim","signIn":"Giriş Yap","signOut":"Çıkış Yap","language":"Dil","menu":"Menü","openMenu":"Gezinme menüsünü aç","closeMenu":"Gezinme menüsünü kapat","search":"Ara","searchPlaceholder":"Ara","badge":{"new":"Yeni"},"primary":{"women":"Kadın","men":"Erkek","exclusiveCollection":"Özel Koleksiyon","giftSets":"Hediye Setleri"},"contact":{"email":"info@perfume.example","phone":"955123456789"},"secondary":{"bestSellers":"En çok satanlar","latest":"En son ürünler","giftSets":"Hediye setleri","promises":"Tütsü ve vaatler","everyMoment":"Her an için bir koku","orientalNotes":"Oryantal notlar"}};
const hero = {"ribbon":"Maison de Parfum","heading":"Koku Sanatını Deneyimle","subheading":"Zamansız parfümeriyle modern zarafeti buluşturan el yapımı parfümler.","primaryCta":"Koleksiyonu Keşfet","secondaryCta":"Hikâyemizi öğren","benefits":{"composition":"Paris'te işlenen el yapımı esanslar","notes":"Katmanlı üst, kalp ve dip notalar","sillage":"Zarif, uzun süre kalıcı iz","refillable":"Yeniden doldurulabilir kristal flakonlar"},"previewLabel":"Notalara göz at","previewTitle":"Olfaktif Mimari","previewDescription":"Her harman, sürdürülebilir kaynaklı bitkiler ve nadir reçinelerle yavaşça damıtılır.","stats":{"top":"Üst","topNotes":"Canlı bergamot · Pembe biber","heart":"Kalp","heartNotes":"Şam gülü · Kaşmir odunları","base":"Dip","baseNotes":"Ambergris akoru · Vetiver","longLasting":"Kalıcılık","hours":"10 saatlik aura"}};
const products = {"sectionLabel":"İmza Seçkisi","sectionTitle":"Öne Çıkan Kokular","priceLabel":"Fiyat","viewDetails":"Detayları Gör","addToCart":"Sepete Ekle","adding":"Ekleniyor…","added":"Eklendi","outOfStock":"Stokta yok","empty":"Bu kiracı için henüz ürün eklenmedi.","newArrival":"Yeni","overlayDescription":"Bu kokunun ardındaki katmanlı akorları ve ustalığı keşfet.","uncategorized":"İmza Harman"};
const product = {"backLink":"Koleksiyona dön","notesHeading":"Koku Notları","notesDescription":"Bu extrait'in aromatik mimarisini ve seçilmiş akorlarını keşfet.","notesFallback":"Parfümörlerimiz tarafından seçildi","topNotes":"Üst notalar","heartNotes":"Kalp notalar","baseNotes":"Dip notalar","volume":"Şişe Boyutu","volumeDefault":"50 ml extrait","longevity":"Kalıcılık","longevityHours":"En fazla {{hours}} saat","longevityDefault":"Uzun ömürlü iz","category":"Koleksiyon","tenant":"İmza Evi","addToCart":"Sepete Ekle","descriptionHeading":"Neden seveceksin","relatedHeading":"Birlikte harika uyum sağlar","relatedDescription":"Auranı kişiselleştirmek için uyumlu akorlarla katmanla.","backToCollection":"Koleksiyona geri dön","ingredientsHeading":"Kompozisyon","accordsHeading":"Akorlar","deliveryCopy":"120 € üzeri siparişlerde dünya çapı ücretsiz gönderim.","outOfStockMessage":"Bekleme listesine katıl — bu harman yakında geri dönecek.","stock":{"limited":"Sınırlı • {{count}} adet kaldı","available":"Stokta"}};
const cart = {"title":"Sepetin","empty":"Sepetin boş. Bir sonraki imza kokunu bulmak için koleksiyonumuza göz at.","continue":"Alışverişe devam et","summary":"Sipariş Özeti","subtotal":"Ara Toplam","checkout":"Güvenli Ödeme","items":"Ürünler","remove":"Kaldır","quantity":"Adet","update":"Adedi Güncelle","shippingNotice":"120 € üzeri siparişlerde ücretsiz gönderim."};
const admin = {"title":"Yönetim Paneli","subtitle":"Ürünleri, siparişleri ve kiracı deneyimlerini tek yerden yönet.","nav":{"dashboard":"Gösterge Paneli","products":"Ürünler","orders":"Siparişler"},"dashboard":{"metrics":{"revenue":"Ciro","orders":"Siparişler","customers":"Müşteriler","inventory":"SKU Sayısı"}},"products":{"title":"Katalog","empty":"Henüz ürün eklenmemiş.","create":"Ürün oluştur","save":"Ürünü kaydet","update":"Ürünü güncelle","delete":"Sil","cancel":"Vazgeç","statusLabel":"Öne çıkan","confirmDelete":"Bu ürünü silmek istediğine emin misin?","form":{"name":"İsim","slug":"Bağlantı","description":"Açıklama","price":"Fiyat","stock":"Stok","category":"Kategori","image":"Görsel URL","isFeatured":"Öne çıkan olarak işaretle","submitCreate":"Ürün oluştur","submitUpdate":"Değişiklikleri kaydet"},"table":{"name":"İsim","price":"Fiyat","stock":"Stok","updated":"Güncellendi","actions":"İşlemler"},"feedback":{"created":"Ürün oluşturuldu","updated":"Ürün güncellendi","deleted":"Ürün silindi"}},"orders":{"title":"Siparişler","empty":"Henüz sipariş yok.","table":{"order":"Sipariş","customer":"Müşteri","status":"Durum","total":"Toplam","created":"Oluşturuldu","actions":"İşlemler"},"status":{"PENDING":"Beklemede","PROCESSING":"Hazırlanıyor","COMPLETED":"Tamamlandı","CANCELLED":"İptal edildi"},"actions":{"view":"Görüntüle","markProcessing":"Hazırlanıyor olarak işaretle","markCompleted":"Tamamlandı olarak işaretle","cancel":"Siparişi iptal et"},"feedback":{"statusUpdated":"Sipariş durumu güncellendi"}},"notifications":{"error":"Bir şeyler ters gitti. Lütfen tekrar dene."}};
const footer = {"newsletterHeading":"Kokunun İzinde Kal","newsletterDescription":"Sınırlı üretim sürümlere ve küratörlü koku eşleştirmelerine erken erişim kazan.","newsletterPlaceholder":"E-posta adresi gir","newsletterCta":"Atölyeye Katıl","copyright":"Tüm hakları saklıdır.","crafted":"Koku tutkunları için özenle tasarlandı.","contact":{"email":"hello@perfumestore.com","phone":"+90 216 123 45 67"}};
const auth = {"title":"PerfumeStore'a giriş yap","subtitle":"Tek kullanımlık kod veya Google ile devam et.","emailLabel":"E-posta adresi","sendOtp":"Kodu gönder","otpLabel":"Tek kullanımlık kod","otpPlaceholder":"123456","verifyOtp":"Kodu doğrula","google":"Google ile devam et","success":"Doğrulama kodu için e-postanı kontrol et.","error":"İstek tamamlanamadı. Lütfen tekrar dene."};
const filters = {"categoryLabel":"Kategori seç","categoryAll":"Tüm kategoriler","priceTitle":"Fiyat","priceLabel":"En fazla {{value}}","featuredOnly":"Sadece öne çıkanlar","clear":"Filtreleri sıfırla","countLabel":"{{count}} koku gösteriliyor","empty":"Filtrelerine uygun koku bulunamadı."};
const pwa = {"installPrompt":"PerfumeStore uygulamasını yüklemek ister misin?","offlineReady":"İçerikler önbelleğe alındı ve çevrimdışı da hazır.","updateAvailable":"Yeni bir sürüm hazır.","refresh":"Yenile","close":"Kapat"};
const notifications = {"cartUpdated":"Sepet güncellendi","cartError":"Sepet güncellenemedi. Lütfen tekrar dene."};
const tr = {
  meta,
  navigation,
  hero,
  products,
  product,
  cart,
  admin,
  footer,
  auth,
  filters,
  pwa,
  notifications,
};

const rawLocales = (env.SUPPORTED_LANGUAGES ?? "en,de,tr").split(",").map((locale) => locale.trim().toLowerCase()).filter(Boolean);
const dictionaries = {
  en,
  de,
  tr
};
const FALLBACK_LOCALE = "en";
function normalizeLocale(locale) {
  if (!locale) return FALLBACK_LOCALE;
  const lowered = locale.toLowerCase();
  const exact = Object.keys(dictionaries).find((key) => key === lowered);
  if (exact) {
    return exact;
  }
  const short = lowered.split("-")[0];
  const supported = Object.keys(dictionaries).find((key) => key === short);
  if (supported) {
    return supported;
  }
  return FALLBACK_LOCALE;
}
const SUPPORTED_LOCALES = Array.from(
  new Set(
    rawLocales.map((locale) => normalizeLocale(locale)).concat(Object.keys(dictionaries))
  )
);
function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[FALLBACK_LOCALE];
}
function getNestedValue(record, key) {
  return key.split(".").reduce((accumulator, part) => {
    if (accumulator && typeof accumulator === "object" && part in accumulator) {
      return accumulator[part];
    }
    return void 0;
  }, record);
}
function interpolate(value, params) {
  if (!params) return value;
  return value.replace(/{{(.*?)}}/g, (_, token) => {
    const trimmed = token.trim();
    const replacement = params[trimmed];
    return replacement !== void 0 && replacement !== null ? String(replacement) : "";
  });
}
function createTranslator(locale) {
  const resolved = normalizeLocale(locale);
  const dictionary = getDictionary(resolved);
  const fallbackDictionary = getDictionary(FALLBACK_LOCALE);
  return (key, params) => {
    const primary = getNestedValue(dictionary, key);
    const fallback = getNestedValue(fallbackDictionary, key);
    const value = primary ?? fallback;
    if (typeof value === "string") {
      return interpolate(value, params);
    }
    return "";
  };
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image, structuredData, noIndex, ogType, overlayHeader, mainFullBleed } = Astro2.props;
  const locale = Astro2.locals.locale ?? "en";
  const translator = createTranslator(locale);
  const business = await getBusinessConfig();
  const cart = await getCartContext(Astro2.cookies);
  const pageTitle = title ?? translator("meta.homeTitle");
  const pageDescription = description ?? translator("meta.homeDescription");
  const metaImage = image ?? business.assets.fallbackHeroImage ?? null;
  const canonicalUrl = Astro2.url.href;
  const shouldIndex = noIndex !== true;
  const openGraphType = ogType ?? "website";
  const theme = business.theme;
  const themeStyle = {
    "--color-primary": theme.primary,
    "--color-secondary": theme.secondary,
    "--color-accent": theme.accent,
    "--color-muted": theme.muted,
    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--font-heading": theme.headingFont,
    "--font-body": theme.bodyFont
  };
  return renderTemplate`<html${addAttribute(locale, "lang")} class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${pageTitle}</title><meta name="description"${addAttribute(pageDescription, "content")}><meta name="theme-color"${addAttribute(theme.primary, "content")}><meta name="color-scheme" content="light">${!shouldIndex && renderTemplate`<meta name="robots" content="noindex,nofollow">`}<link rel="canonical"${addAttribute(canonicalUrl, "href")}><meta property="og:type"${addAttribute(openGraphType, "content")}><meta property="og:site_name"${addAttribute(business.name, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDescription, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}>${metaImage && renderTemplate`<meta property="og:image"${addAttribute(metaImage, "content")}>`}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(pageDescription, "content")}>${metaImage && renderTemplate`<meta name="twitter:image"${addAttribute(metaImage, "content")}>`}<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap">${structuredData && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">\n        {JSON.stringify(structuredData)}\n      <\/script>'])))}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-[var(--color-background)] text-[var(--color-secondary)] antialiased min-h-screen flex flex-col"${addAttribute(themeStyle, "style")}> <a href="#main" class="absolute left-4 top-4 z-50 -translate-y-20 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0 focus:outline-none"> ${translator("navigation.skipToContent")} </a> <header class="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 pt-1 md:pt-2"> <div class="mx-auto w-full max-w-6xl"> ${renderComponent($$result, "Navigation", $$Navigation, { "t": translator, "cartQuantity": cart.totalQuantity, "locale": locale, "user": Astro2.locals.user ?? null, "businessName": business.name, "locales": SUPPORTED_LOCALES, "invert": overlayHeader === true })} </div> </header> <main id="main"${addAttribute(mainFullBleed ? "w-full pb-16 pt-6 flex-grow" : "mx-auto w-full max-w-6xl px-6 pb-16 pt-6 flex-grow", "class")}> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "t": translator, "businessName": business.name })} ${renderScript($$result, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/layouts/Layout.astro", void 0);

export { $$Layout as $, createTranslator as c };
