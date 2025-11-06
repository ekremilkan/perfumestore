import { h as handleAuthRequest } from '../../../chunks/auth_CnDPFWXt.mjs';
export { renderers } from '../../../renderers.mjs';

const ALL = async ({ request }) => handleAuthRequest(request);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
