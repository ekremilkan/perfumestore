import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CGVQeYVU.mjs';
import { manifest } from './manifest_bXscAvNY.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/orders.astro.mjs');
const _page2 = () => import('./pages/admin/products.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page5 = () => import('./pages/api/cart.astro.mjs');
const _page6 = () => import('./pages/api/orders/_id_.astro.mjs');
const _page7 = () => import('./pages/api/orders.astro.mjs');
const _page8 = () => import('./pages/api/products/_id_.astro.mjs');
const _page9 = () => import('./pages/api/products.astro.mjs');
const _page10 = () => import('./pages/auth/login.astro.mjs');
const _page11 = () => import('./pages/auth/logout.astro.mjs');
const _page12 = () => import('./pages/cart.astro.mjs');
const _page13 = () => import('./pages/checkout.astro.mjs');
const _page14 = () => import('./pages/product/_slug_.astro.mjs');
const _page15 = () => import('./pages/products.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/orders.astro", _page1],
    ["src/pages/admin/products.astro", _page2],
    ["src/pages/admin/index.astro", _page3],
    ["src/pages/api/auth/[...auth].ts", _page4],
    ["src/pages/api/cart.ts", _page5],
    ["src/pages/api/orders/[id].ts", _page6],
    ["src/pages/api/orders/index.ts", _page7],
    ["src/pages/api/products/[id].ts", _page8],
    ["src/pages/api/products/index.ts", _page9],
    ["src/pages/auth/login.astro", _page10],
    ["src/pages/auth/logout.astro", _page11],
    ["src/pages/cart.astro", _page12],
    ["src/pages/checkout.astro", _page13],
    ["src/pages/product/[slug].astro", _page14],
    ["src/pages/products.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/darah.k/Downloads/projectsDubai/perfumestore/dist/client/",
    "server": "file:///Users/darah.k/Downloads/projectsDubai/perfumestore/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
