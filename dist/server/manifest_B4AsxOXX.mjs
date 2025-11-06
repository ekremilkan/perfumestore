import { p as decodeKey } from './chunks/astro/server_DphMVhZR.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_C0T1I5lw.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_pMjusxW3.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/","cacheDir":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/node_modules/.astro/","outDir":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/dist/","srcDir":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/src/","publicDir":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/public/","buildClientDir":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/dist/client/","buildServerDir":"file:///Users/ekremilkan/Desktop/projects/ecommerce-astro/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/admin/orders","isIndex":false,"type":"page","pattern":"^\\/admin\\/orders\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/orders.astro","pathname":"/admin/orders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/admin/products","isIndex":false,"type":"page","pattern":"^\\/admin\\/products\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/products.astro","pathname":"/admin/products","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/[...auth]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"src/pages/api/auth/[...auth].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/cart","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/cart\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/cart.ts","pathname":"/api/cart","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/orders/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/orders\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/orders/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/orders","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/orders\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/orders/index.ts","pathname":"/api/orders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/products/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/products/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/products","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/products\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/products/index.ts","pathname":"/api/products","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/auth/logout","isIndex":false,"type":"page","pattern":"^\\/auth\\/logout\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/logout.astro","pathname":"/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/cart","isIndex":false,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".animate-spin[data-astro-cid-ojox7d5b]{animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"},{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/checkout","isIndex":false,"type":"page","pattern":"^\\/checkout\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout.astro","pathname":"/checkout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/product/[slug]","isIndex":false,"type":"page","pattern":"^\\/product\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/product/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/products","isIndex":false,"type":"page","pattern":"^\\/products\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/products.astro","pathname":"/products","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".line-clamp-2[data-astro-cid-j7pv25f6]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}@keyframes bounce{0%,20%,50%,80%,to{transform:translateY(0)}40%{transform:translateY(-10px)}60%{transform:translateY(-5px)}}.animate-bounce[data-astro-cid-j7pv25f6]{animation:bounce 2s infinite}\n"},{"type":"external","src":"/_astro/index.B6iwFXBD.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"http://localhost:4321","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/orders.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/products.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/auth/login.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/auth/logout.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/cart.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/checkout.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/product/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/products.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/admin/orders@_@astro":"pages/admin/orders.astro.mjs","\u0000@astro-page:src/pages/admin/products@_@astro":"pages/admin/products.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/auth/[...auth]@_@ts":"pages/api/auth/_---auth_.astro.mjs","\u0000@astro-page:src/pages/api/cart@_@ts":"pages/api/cart.astro.mjs","\u0000@astro-page:src/pages/api/orders/[id]@_@ts":"pages/api/orders/_id_.astro.mjs","\u0000@astro-page:src/pages/api/orders/index@_@ts":"pages/api/orders.astro.mjs","\u0000@astro-page:src/pages/api/products/[id]@_@ts":"pages/api/products/_id_.astro.mjs","\u0000@astro-page:src/pages/api/products/index@_@ts":"pages/api/products.astro.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/auth/logout@_@astro":"pages/auth/logout.astro.mjs","\u0000@astro-page:src/pages/cart@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/checkout@_@astro":"pages/checkout.astro.mjs","\u0000@astro-page:src/pages/product/[slug]@_@astro":"pages/product/_slug_.astro.mjs","\u0000@astro-page:src/pages/products@_@astro":"pages/products.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B4AsxOXX.mjs","/Users/ekremilkan/Desktop/projects/ecommerce-astro/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/ekremilkan/Desktop/projects/ecommerce-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CGssB-4I.mjs","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/admin/OrdersManager.tsx":"_astro/OrdersManager.kPdvPg5r.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/admin/ProductManager.tsx":"_astro/ProductManager.ClWlEBTW.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/auth/OtpLogin.tsx":"_astro/OtpLogin.CZmhedAc.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/CartTable.tsx":"_astro/CartTable.DdozKkHC.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/ProductActions":"_astro/ProductActions.jyxb3gyS.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/ProductFilters":"_astro/ProductFilters.uplnBefq.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.D1A6SuFZ.js","@astrojs/react/client.js":"_astro/client.B_PwMJWB.js","/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/AddToCartButton.tsx":"_astro/AddToCartButton.gpoaIYw5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"cart:updated\",a=>{const t=a.detail,e=document.querySelector(\"[data-cart-count]\");e&&typeof t.totalQuantity==\"number\"&&(e.textContent=String(t.totalQuantity),e.setAttribute(\"data-has-items\",String(t.totalQuantity>0)))});"]],"assets":["/_astro/index.B6iwFXBD.css","/favicon.svg","/manifest.webmanifest","/registerSW.js","/_astro/AddToCartButton.gpoaIYw5.js","/_astro/CartTable.DdozKkHC.js","/_astro/OrdersManager.kPdvPg5r.js","/_astro/OtpLogin.CZmhedAc.js","/_astro/ProductActions.jyxb3gyS.js","/_astro/ProductFilters.uplnBefq.js","/_astro/ProductManager.ClWlEBTW.js","/_astro/client.B_PwMJWB.js","/_astro/index.Be8AcK8B.js","/_astro/jsx-runtime.D_zvdyIk.js","/videos/hero-video.mp4","/icons/icon-192.svg","/icons/icon-512.svg","/icons/icon-maskable.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"FjWLtofoPrJz9TAiAhlcXnaX0JbSlhEv4keqzbZoF8Q=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/ekremilkan/Desktop/projects/ecommerce-astro/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
