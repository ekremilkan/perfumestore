import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DphMVhZR.mjs';
import { c as createTranslator, $ as $$Layout } from '../chunks/Layout_CW4dC78d.mjs';
import { a as getBusinessConfig } from '../chunks/business_eBF7zugw.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$Checkout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Checkout;
  const locale = Astro2.locals.locale ?? "en";
  createTranslator(locale);
  await getBusinessConfig();
  const title = "Checkout - PerfumeStore";
  const description = "Complete your purchase securely with PerfumeStore.";
  return renderTemplate(_a || (_a = __template(["", ` <script>
  // Load cart items and populate checkout
  async function loadCheckoutData() {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to load cart');

      const cartData = await response.json();
      const items = cartData.items || [];
      const subtotal = cartData.subtotal || 0;
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      // Populate cart items
      const itemsContainer = document.getElementById('checkout-items');
      if (itemsContainer && items.length > 0) {
        itemsContainer.innerHTML = items.map(item => \`
          <div class="flex items-center space-x-4">
            <img src="\${item.image || '/placeholder.jpg'}" alt="\${item.name}" class="w-12 h-12 rounded-lg object-cover">
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-[var(--color-secondary)]">\${item.name}</h4>
              <p class="text-xs text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">Qty: \${item.quantity}</p>
            </div>
            <span class="text-sm font-semibold text-[var(--color-secondary)]">\u20AC\${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        \`).join('');
      }

      // Update totals
      document.getElementById('checkout-subtotal').textContent = \`\u20AC\${subtotal.toFixed(2)}\`;
      document.getElementById('checkout-tax').textContent = \`\u20AC\${tax.toFixed(2)}\`;
      document.getElementById('checkout-total').textContent = \`\u20AC\${total.toFixed(2)}\`;

    } catch (error) {
      console.error('Failed to load checkout data:', error);
      document.getElementById('checkout-items').innerHTML = \`
        <div class="text-center text-sm text-red-600 py-8">
          Failed to load cart items. Please try again.
        </div>
      \`;
    }
  }

  // Handle form submission
  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    /** @type {HTMLFormElement} */
    const target = e.target;
    const formData = new FormData(target);
    const orderData = {
      email: formData.get('email'),
      shippingAddress: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country')
      },
      paymentMethod: formData.get('paymentMethod'),
      cardNumber: formData.get('cardNumber'),
      expiry: formData.get('expiry'),
      cvv: formData.get('cvv')
    };

    /** @type {HTMLButtonElement} */
    const button = document.getElementById('place-order-btn');
    if (!button) return;
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...';

    try {
      // Here you would typically send the order to your backend
      // For demo purposes, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Redirect to success page or show success message
      alert('Order placed successfully! Thank you for your purchase.');
      window.location.href = '/';

    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });

  // Load checkout data on page load
  loadCheckoutData();
<\/script> `], ["", ` <script>
  // Load cart items and populate checkout
  async function loadCheckoutData() {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to load cart');

      const cartData = await response.json();
      const items = cartData.items || [];
      const subtotal = cartData.subtotal || 0;
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      // Populate cart items
      const itemsContainer = document.getElementById('checkout-items');
      if (itemsContainer && items.length > 0) {
        itemsContainer.innerHTML = items.map(item => \\\`
          <div class="flex items-center space-x-4">
            <img src="\\\${item.image || '/placeholder.jpg'}" alt="\\\${item.name}" class="w-12 h-12 rounded-lg object-cover">
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-[var(--color-secondary)]">\\\${item.name}</h4>
              <p class="text-xs text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">Qty: \\\${item.quantity}</p>
            </div>
            <span class="text-sm font-semibold text-[var(--color-secondary)]">\u20AC\\\${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        \\\`).join('');
      }

      // Update totals
      document.getElementById('checkout-subtotal').textContent = \\\`\u20AC\\\${subtotal.toFixed(2)}\\\`;
      document.getElementById('checkout-tax').textContent = \\\`\u20AC\\\${tax.toFixed(2)}\\\`;
      document.getElementById('checkout-total').textContent = \\\`\u20AC\\\${total.toFixed(2)}\\\`;

    } catch (error) {
      console.error('Failed to load checkout data:', error);
      document.getElementById('checkout-items').innerHTML = \\\`
        <div class="text-center text-sm text-red-600 py-8">
          Failed to load cart items. Please try again.
        </div>
      \\\`;
    }
  }

  // Handle form submission
  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    /** @type {HTMLFormElement} */
    const target = e.target;
    const formData = new FormData(target);
    const orderData = {
      email: formData.get('email'),
      shippingAddress: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country')
      },
      paymentMethod: formData.get('paymentMethod'),
      cardNumber: formData.get('cardNumber'),
      expiry: formData.get('expiry'),
      cvv: formData.get('cvv')
    };

    /** @type {HTMLButtonElement} */
    const button = document.getElementById('place-order-btn');
    if (!button) return;
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...';

    try {
      // Here you would typically send the order to your backend
      // For demo purposes, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Redirect to success page or show success message
      alert('Order placed successfully! Thank you for your purchase.');
      window.location.href = '/';

    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });

  // Load checkout data on page load
  loadCheckoutData();
<\/script> `])), renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "data-astro-cid-ojox7d5b": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[var(--color-surface,#fdf8f2)] py-12" data-astro-cid-ojox7d5b> <div class="max-w-6xl mx-auto px-6" data-astro-cid-ojox7d5b> <div class="mb-8" data-astro-cid-ojox7d5b> <h1 class="font-heading text-3xl md:text-4xl text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Checkout</h1> <p class="text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]" data-astro-cid-ojox7d5b>Complete your order securely</p> </div> <form id="checkout-form" class="grid lg:grid-cols-3 gap-8" data-astro-cid-ojox7d5b> <!-- Left Column - Contact & Shipping --> <div class="lg:col-span-2 space-y-8" data-astro-cid-ojox7d5b> <!-- Contact Information --> <div class="bg-white rounded-3xl p-8 shadow-sm" data-astro-cid-ojox7d5b> <h2 class="font-heading text-xl text-[var(--color-secondary)] mb-6" data-astro-cid-ojox7d5b>Contact Information</h2> <div class="space-y-4" data-astro-cid-ojox7d5b> <div data-astro-cid-ojox7d5b> <label for="email" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Email Address</label> <input type="email" id="email" name="email" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="your@email.com" data-astro-cid-ojox7d5b> </div> </div> </div> <!-- Shipping Address --> <div class="bg-white rounded-3xl p-8 shadow-sm" data-astro-cid-ojox7d5b> <h2 class="font-heading text-xl text-[var(--color-secondary)] mb-6" data-astro-cid-ojox7d5b>Shipping Address</h2> <div class="grid md:grid-cols-2 gap-4" data-astro-cid-ojox7d5b> <div data-astro-cid-ojox7d5b> <label for="firstName" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>First Name</label> <input type="text" id="firstName" name="firstName" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> <div data-astro-cid-ojox7d5b> <label for="lastName" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Last Name</label> <input type="text" id="lastName" name="lastName" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> </div> <div class="mt-4" data-astro-cid-ojox7d5b> <label for="address" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Street Address</label> <input type="text" id="address" name="address" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="123 Main Street" data-astro-cid-ojox7d5b> </div> <div class="grid md:grid-cols-3 gap-4 mt-4" data-astro-cid-ojox7d5b> <div data-astro-cid-ojox7d5b> <label for="city" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>City</label> <input type="text" id="city" name="city" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> <div data-astro-cid-ojox7d5b> <label for="postalCode" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Postal Code</label> <input type="text" id="postalCode" name="postalCode" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> <div data-astro-cid-ojox7d5b> <label for="country" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Country</label> <select id="country" name="country" required class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> <option value="" data-astro-cid-ojox7d5b>Select Country</option> <option value="FR" data-astro-cid-ojox7d5b>France</option> <option value="DE" data-astro-cid-ojox7d5b>Germany</option> <option value="IT" data-astro-cid-ojox7d5b>Italy</option> <option value="ES" data-astro-cid-ojox7d5b>Spain</option> <option value="GB" data-astro-cid-ojox7d5b>United Kingdom</option> <option value="US" data-astro-cid-ojox7d5b>United States</option> </select> </div> </div> </div> <!-- Payment Method --> <div class="bg-white rounded-3xl p-8 shadow-sm" data-astro-cid-ojox7d5b> <h2 class="font-heading text-xl text-[var(--color-secondary)] mb-6" data-astro-cid-ojox7d5b>Payment Method</h2> <div class="space-y-4" data-astro-cid-ojox7d5b> <div class="flex items-center space-x-3" data-astro-cid-ojox7d5b> <input type="radio" id="card" name="paymentMethod" value="card" checked class="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" data-astro-cid-ojox7d5b> <label for="card" class="flex items-center space-x-2" data-astro-cid-ojox7d5b> <span class="text-sm font-medium text-[var(--color-secondary)]" data-astro-cid-ojox7d5b>Credit/Debit Card</span> <div class="flex space-x-1" data-astro-cid-ojox7d5b> <div class="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold" data-astro-cid-ojox7d5b>V</div> <div class="w-6 h-4 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold" data-astro-cid-ojox7d5b>MC</div> <div class="w-6 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold" data-astro-cid-ojox7d5b>PP</div> </div> </label> </div> <div class="ml-7 space-y-4" data-astro-cid-ojox7d5b> <div data-astro-cid-ojox7d5b> <label for="cardNumber" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Card Number</label> <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> <div class="grid md:grid-cols-2 gap-4" data-astro-cid-ojox7d5b> <div data-astro-cid-ojox7d5b> <label for="expiry" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>Expiry Date</label> <input type="text" id="expiry" name="expiry" placeholder="MM/YY" class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> <div data-astro-cid-ojox7d5b> <label for="cvv" class="block text-sm font-medium text-[var(--color-secondary)] mb-2" data-astro-cid-ojox7d5b>CVV</label> <input type="text" id="cvv" name="cvv" placeholder="123" class="w-full px-4 py-3 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" data-astro-cid-ojox7d5b> </div> </div> </div> </div> </div> </div> <!-- Right Column - Order Summary --> <div class="space-y-6" data-astro-cid-ojox7d5b> <div class="bg-white rounded-3xl p-6 shadow-sm sticky top-6" data-astro-cid-ojox7d5b> <h2 class="font-heading text-xl text-[var(--color-secondary)] mb-6" data-astro-cid-ojox7d5b>Order Summary</h2> <!-- Cart Items --> <div id="checkout-items" class="space-y-4 mb-6" data-astro-cid-ojox7d5b> <!-- Items will be populated by JavaScript --> <div class="text-center text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)] py-8" data-astro-cid-ojox7d5b>
Loading cart items...
</div> </div> <!-- Order Totals --> <div class="border-t border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] pt-6 space-y-3" data-astro-cid-ojox7d5b> <div class="flex justify-between items-center" data-astro-cid-ojox7d5b> <span class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]" data-astro-cid-ojox7d5b>Subtotal</span> <span id="checkout-subtotal" class="text-sm font-semibold text-[var(--color-secondary)]" data-astro-cid-ojox7d5b>€0.00</span> </div> <div class="flex justify-between items-center" data-astro-cid-ojox7d5b> <span class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]" data-astro-cid-ojox7d5b>Shipping</span> <span class="text-sm font-semibold text-green-600" data-astro-cid-ojox7d5b>Free</span> </div> <div class="flex justify-between items-center" data-astro-cid-ojox7d5b> <span class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]" data-astro-cid-ojox7d5b>Tax</span> <span id="checkout-tax" class="text-sm font-semibold text-[var(--color-secondary)]" data-astro-cid-ojox7d5b>€0.00</span> </div> <hr class="border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]" data-astro-cid-ojox7d5b> <div class="flex justify-between items-center" data-astro-cid-ojox7d5b> <span class="text-lg font-semibold text-[var(--color-secondary)]" data-astro-cid-ojox7d5b>Total</span> <span id="checkout-total" class="text-2xl font-heading text-[var(--color-secondary)]" data-astro-cid-ojox7d5b>€0.00</span> </div> </div> <!-- Checkout Button --> <button type="submit" class="w-full mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-4 text-lg font-semibold text-[var(--color-secondary)] transition hover:bg-[color-mix(in srgb,var(--color-primary) 85%,white 15%)] disabled:opacity-50 disabled:cursor-not-allowed" id="place-order-btn" data-astro-cid-ojox7d5b> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ojox7d5b> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-ojox7d5b></path> </svg>
Place Order
</button> <p class="text-xs text-center text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)] mt-4" data-astro-cid-ojox7d5b>
Your payment information is secure and encrypted
</p> </div> </div> </form> </div> </div> ` }));
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/checkout.astro", void 0);

const $$file = "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
