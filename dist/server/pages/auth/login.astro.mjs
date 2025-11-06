import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DphMVhZR.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { c as createTranslator, $ as $$Layout } from '../../chunks/Layout_CW4dC78d.mjs';
export { renderers } from '../../renderers.mjs';

function OtpLogin({ texts, redirectTo }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email");
  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/auth/email-otp/create-verification-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, type: "sign-in" })
      });
      if (!response.ok) {
        throw new Error("Failed request");
      }
      setMessage(texts.success);
      setStep("otp");
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setLoading(false);
    }
  };
  const handleVerify = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/sign-in/email-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      if (!response.ok) {
        throw new Error("Failed request");
      }
      window.location.href = redirectTo;
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    error && /* @__PURE__ */ jsx("p", { className: "rounded-full bg-red-100 px-4 py-2 text-sm text-red-700", children: error }),
    message && /* @__PURE__ */ jsx("p", { className: "rounded-full bg-green-100 px-4 py-2 text-sm text-green-700", children: message }),
    /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: step === "email" ? handleSendOtp : handleVerify, children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
        texts.emailLabel,
        /* @__PURE__ */ jsx(
          "input",
          {
            required: true,
            type: "email",
            value: email,
            onChange: (event) => setEmail(event.target.value),
            className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
          }
        )
      ] }),
      step === "otp" && /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
        texts.otpLabel,
        /* @__PURE__ */ jsx(
          "input",
          {
            required: true,
            value: otp,
            pattern: "\\\\d{6}",
            onChange: (event) => setOtp(event.target.value),
            placeholder: texts.otpPlaceholder,
            className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full rounded-full bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[color-mix(in srgb,var(--color-secondary) 85%,white 15%)] disabled:cursor-not-allowed disabled:opacity-70",
          children: step === "email" ? texts.sendOtp : texts.verifyOtp
        }
      )
    ] })
  ] });
}

const $$Astro = createAstro("http://localhost:4321");
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("meta.loginTitle"), "description": t("meta.homeDescription") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto flex w-full max-w-md flex-col gap-6 py-16"> <div class="space-y-2 text-center"> <h1 class="font-heading text-3xl font-semibold text-[var(--color-secondary)]"> ${t("auth.title")} </h1> <p class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ${t("auth.subtitle")} </p> </div> <div class="rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6"> ${renderComponent($$result2, "OtpLogin", OtpLogin, { "client:load": true, "redirectTo": "/admin", "texts": {
    emailLabel: t("auth.emailLabel"),
    sendOtp: t("auth.sendOtp"),
    otpLabel: t("auth.otpLabel"),
    otpPlaceholder: t("auth.otpPlaceholder"),
    verifyOtp: t("auth.verifyOtp"),
    success: t("auth.success"),
    error: t("auth.error")
  }, "client:component-hydration": "load", "client:component-path": "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/auth/OtpLogin.tsx", "client:component-export": "OtpLogin" })} </div> <div class="text-center"> <a class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--color-secondary)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)] hover:text-white" href="/api/auth/sign-in/google?redirectTo=/admin"> ${t("auth.google")} </a> </div> </section> ` })}`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/auth/login.astro", void 0);

const $$file = "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
