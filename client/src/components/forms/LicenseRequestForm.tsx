// Formulaire de demande de licence — /purchase. Trilingue FR / EN / AR (Lot 4).
// Validation : react-hook-form + zod (mêmes règles que /api/license-request).
// Les valeurs soumises restent celles du schéma zod (enums en français) ;
// seuls les libellés, placeholders et messages affichés sont traduits.
// Les messages d'erreur zod sont traduits via client/src/lib/form-i18n.ts,
// les erreurs API via leur code stable (SERVICE_NOT_CONFIGURED, …).
// Soumission vers /api/license-request. Le succès ne s'affiche qu'après une
// vraie réponse 200 du serveur ; sinon, la raison réelle est affichée.
//
// Paiement : « Acheter maintenant » → /api/checkout (Stripe Checkout,
// redirection si configuré) et « Payer avec PayPal » →
// /api/paypal-create-order (redirection vers l'URL d'approbation si
// configuré). Sans clés configurées, un message honnête s'affiche —
// aucun paiement n'est simulé.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  licenseRequestSchema,
  PLAN_IDS,
  PLAN_LABELS,
  PLAN_PRICES,
  type LicenseRequestInput,
  type LicenseRequestOutput,
  type PlanId,
} from "@shared/form-schemas";
import { postJson } from "@/lib/api-client";
import type { Language } from "@/lib/i18n";
import { fieldError, translateApiError, translateSuccessMessage } from "@/lib/form-i18n";
import { CheckboxField, Field, FormStatus, SelectField, Textarea, TextInput } from "./FormFields";

type SubmitState = "idle" | "loading" | "success" | "error";
type PayState = "idle" | "loading" | "error";

const CLIENT_TYPES = ["particulier", "entreprise", "startup", "agence", "autre"] as const;

type FormUi = {
  title: string;
  intro: string;
  fullName: string;
  company: string;
  companyHint: string;
  clientType: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  website: string;
  optional: string;
  billingAddress: string;
  targetDomain: string;
  domainCount: string;
  domainCountHint: string;
  planLegend: string;
  sector: string;
  projectDescription: string;
  comments: string;
  acceptLicenseTerms: string;
  acceptPrivacyPolicy: string;
  submit: string;
  submitting: string;
  payTitle: string;
  payIntro: (planName: string, price: string) => string;
  buyStripe: string;
  payPaypal: string;
  redirecting: string;
  successFallback: string;
  errorFallback: string;
  payStartFallback: string;
  noRedirect: string;
  clientTypeLabels: Record<string, string>;
  placeholders: Record<string, string>;
};

const formUi: Record<Language, FormUi> = {
  fr: {
    title: "Demande de licence",
    intro: "Remplissez ce formulaire pour demander une licence DepXpreS. Votre demande est transmise à l'administrateur ; la licence n'est émise qu'après validation des informations contractuelles et, le cas échéant, confirmation réelle du paiement côté serveur.",
    fullName: "Nom complet",
    company: "Nom de l'entreprise",
    companyHint: "Obligatoire sauf pour un particulier.",
    clientType: "Type de client",
    country: "Pays",
    city: "Ville",
    email: "Courriel professionnel",
    phone: "Téléphone",
    website: "Site web",
    optional: "Facultatif.",
    billingAddress: "Adresse de facturation",
    targetDomain: "Domaine destiné à recevoir DepXpreS",
    domainCount: "Nombre de domaines souhaités",
    domainCountHint: "Les formules Independent et Assisted autorisent 1 domaine.",
    planLegend: "Licence demandée",
    sector: "Secteur d'activité",
    projectDescription: "Description du projet",
    comments: "Commentaires",
    acceptLicenseTerms: "J'accepte les conditions de licence (contrat de licence signé avant tout paiement). *",
    acceptPrivacyPolicy: "J'accepte la politique de confidentialité. *",
    submit: "Envoyer la demande de licence",
    submitting: "Envoi en cours…",
    payTitle: "Payer directement",
    payIntro: (planName, price) => `Vous pouvez aussi payer directement la formule sélectionnée (${planName} — ${price} $ USD). L'intégration Stripe / PayPal est préparée : elle sera active une fois les clés configurées côté serveur. La licence n'est émise qu'après confirmation réelle du paiement côté serveur ; la facture est générée après cette confirmation.`,
    buyStripe: "Acheter maintenant (Stripe)",
    payPaypal: "Payer avec PayPal",
    redirecting: "Redirection en cours…",
    successFallback: "Demande de licence transmise.",
    errorFallback: "La demande n'a pas pu être transmise.",
    payStartFallback: "Le paiement n'a pas pu être démarré.",
    noRedirect: "Le service de paiement n'a pas renvoyé d'URL de redirection.",
    clientTypeLabels: { particulier: "Particulier", entreprise: "Entreprise", startup: "Startup", agence: "Agence", autre: "Autre" },
    placeholders: {
      fullName: "Prénom Nom",
      company: "Votre entreprise",
      country: "Pays de déploiement",
      city: "Ville principale",
      email: "vous@entreprise.com",
      phone: "+1 514 000-0000",
      website: "https://www.exemple.com",
      billingAddress: "Adresse complète de facturation",
      targetDomain: "exemple.com",
      domainCount: "1",
      sector: "Ex. livraison de repas, transport de personnes",
      projectDescription: "Décrivez votre marché, vos services visés et votre calendrier de lancement.",
      comments: "Besoins spécifiques, questions, précisions…",
    },
  },
  en: {
    title: "License request",
    intro: "Fill in this form to request a DepXpreS license. Your request is sent to the administrator; the license is issued only after validation of the contractual information and, where applicable, real server-side confirmation of payment.",
    fullName: "Full name",
    company: "Company name",
    companyHint: "Required except for an individual.",
    clientType: "Client type",
    country: "Country",
    city: "City",
    email: "Business email",
    phone: "Phone",
    website: "Website",
    optional: "Optional.",
    billingAddress: "Billing address",
    targetDomain: "Domain that will host DepXpreS",
    domainCount: "Number of domains wanted",
    domainCountHint: "The Independent and Assisted plans allow 1 domain.",
    planLegend: "License requested",
    sector: "Business sector",
    projectDescription: "Project description",
    comments: "Comments",
    acceptLicenseTerms: "I accept the license terms (license agreement signed before any payment). *",
    acceptPrivacyPolicy: "I accept the privacy policy. *",
    submit: "Send the license request",
    submitting: "Sending…",
    payTitle: "Pay directly",
    payIntro: (planName, price) => `You can also pay directly for the selected plan (${planName} — $${price} USD). The Stripe / PayPal integration is prepared: it will go live once the keys are configured server-side. The license is issued only after real server-side confirmation of payment; the invoice is generated after this confirmation.`,
    buyStripe: "Buy now (Stripe)",
    payPaypal: "Pay with PayPal",
    redirecting: "Redirecting…",
    successFallback: "License request sent.",
    errorFallback: "The request could not be sent.",
    payStartFallback: "Payment could not be started.",
    noRedirect: "The payment service did not return a redirect URL.",
    clientTypeLabels: { particulier: "Individual", entreprise: "Business", startup: "Startup", agence: "Agency", autre: "Other" },
    placeholders: {
      fullName: "First name Last name",
      company: "Your company",
      country: "Country of deployment",
      city: "Main city",
      email: "you@company.com",
      phone: "+1 514 000-0000",
      website: "https://www.example.com",
      billingAddress: "Full billing address",
      targetDomain: "example.com",
      domainCount: "1",
      sector: "E.g. meal delivery, passenger transport",
      projectDescription: "Describe your market, target services, and launch timeline.",
      comments: "Specific needs, questions, details…",
    },
  },
  ar: {
    title: "طلب ترخيص",
    intro: "املأ هذا النموذج لطلب ترخيص DepXpreS. يرسل طلبك إلى المدير؛ ولا يصدر الترخيص إلا بعد التحقق من المعلومات التعاقدية، وعند الاقتضاء، بعد تأكيد حقيقي للدفع من جهة الخادم.",
    fullName: "الاسم الكامل",
    company: "اسم الشركة",
    companyHint: "مطلوب إلا للفرد.",
    clientType: "نوع العميل",
    country: "البلد",
    city: "المدينة",
    email: "البريد المهني",
    phone: "الهاتف",
    website: "الموقع الإلكتروني",
    optional: "اختياري.",
    billingAddress: "عنوان الفوترة",
    targetDomain: "النطاق الذي سيستضيف DepXpreS",
    domainCount: "عدد النطاقات المطلوبة",
    domainCountHint: "خطتا Independent وAssisted تسمحان بنطاق واحد.",
    planLegend: "الترخيص المطلوب",
    sector: "قطاع النشاط",
    projectDescription: "وصف المشروع",
    comments: "ملاحظات",
    acceptLicenseTerms: "أقبل شروط الترخيص (عقد الترخيص يوقع قبل أي دفع). *",
    acceptPrivacyPolicy: "أقبل سياسة الخصوصية. *",
    submit: "إرسال طلب الترخيص",
    submitting: "جارٍ الإرسال…",
    payTitle: "ادفع مباشرة",
    payIntro: (planName, price) => `يمكنك أيضا الدفع مباشرة للخطة المختارة (${planName} — ${price} $ أمريكي). تكامل Stripe / PayPal جاهز: سيعمل فور تهيئة المفاتيح من جهة الخادم. لا يصدر الترخيص إلا بعد تأكيد حقيقي للدفع من جهة الخادم؛ وتصدر الفاتورة بعد هذا التأكيد.`,
    buyStripe: "اشترِ الآن (Stripe)",
    payPaypal: "ادفع عبر PayPal",
    redirecting: "جارٍ التحويل…",
    successFallback: "تم إرسال طلب الترخيص.",
    errorFallback: "تعذر إرسال الطلب.",
    payStartFallback: "تعذر بدء الدفع.",
    noRedirect: "لم ترجع خدمة الدفع رابط تحويل.",
    clientTypeLabels: { particulier: "فرد", entreprise: "شركة", startup: "شركة ناشئة", agence: "وكالة", autre: "أخرى" },
    placeholders: {
      fullName: "الاسم الكامل",
      company: "شركتك",
      country: "بلد النشر",
      city: "المدينة الرئيسية",
      email: "you@company.com",
      phone: "+1 514 000-0000",
      website: "https://www.example.com",
      billingAddress: "عنوان الفوترة الكامل",
      targetDomain: "example.com",
      domainCount: "1",
      sector: "مثال: توصيل وجبات، نقل أشخاص",
      projectDescription: "صف سوقك وخدماتك المستهدفة وموعد إطلاقك.",
      comments: "احتياجات خاصة أو أسئلة أو تفاصيل…",
    },
  },
};

export default function LicenseRequestForm({ initialPlan, lang = "fr" }: { initialPlan: PlanId; lang?: Language }) {
  const t = formUi[lang];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LicenseRequestInput, unknown, LicenseRequestOutput>({
    resolver: zodResolver(licenseRequestSchema),
    defaultValues: {
      fullName: "",
      company: "",
      clientType: "entreprise",
      country: "",
      city: "",
      billingAddress: "",
      email: "",
      phone: "",
      website: "",
      targetDomain: "",
      domainCount: 1,
      plan: initialPlan,
      projectDescription: "",
      sector: "",
      comments: "",
      acceptLicenseTerms: false,
      acceptPrivacyPolicy: false,
    },
  });

  const selectedPlan = watch("plan");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [payState, setPayState] = useState<PayState>("idle");
  const [payMessage, setPayMessage] = useState("");

  const priceLocale = lang === "en" ? "en-US" : "fr-CA";

  const onSubmit = async (data: LicenseRequestOutput) => {
    setSubmitState("loading");
    setSubmitMessage("");
    const result = await postJson<{ message?: string }>("/api/license-request", data, lang);
    if (result.ok) {
      setSubmitState("success");
      setSubmitMessage(translateSuccessMessage(result.data?.message, lang) ?? t.successFallback);
      reset({ ...data, acceptLicenseTerms: false, acceptPrivacyPolicy: false });
    } else {
      setSubmitState("error");
      setSubmitMessage(translateApiError(result.code, result.error, lang) || t.errorFallback);
    }
  };

  const startPayment = async (provider: "stripe" | "paypal") => {
    const plan = selectedPlan;
    const amount = PLAN_PRICES[plan];
    setPayState("loading");
    setPayMessage("");
    const url = provider === "stripe" ? "/api/checkout" : "/api/paypal-create-order";
    const result = await postJson<{ url?: string; approvalUrl?: string }>(url, { plan, amount }, lang);
    if (!result.ok) {
      setPayState("error");
      setPayMessage(translateApiError(result.code, result.error, lang) || t.payStartFallback);
      return;
    }
    const redirectUrl = provider === "stripe" ? result.data?.url : result.data?.approvalUrl;
    if (!redirectUrl) {
      setPayState("error");
      setPayMessage(t.noRedirect);
      return;
    }
    window.location.href = redirectUrl;
  };

  return (
    <div className="form-panel">
      <h2>{t.title}</h2>
      <p className="form-intro">{t.intro}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-grid">
          <Field label={t.fullName} required error={fieldError(errors.fullName, lang)}>
            <TextInput register={register} name="fullName" autoComplete="name" placeholder={t.placeholders.fullName} />
          </Field>
          <Field label={t.company} hint={t.companyHint} error={fieldError(errors.company, lang)}>
            <TextInput register={register} name="company" autoComplete="organization" placeholder={t.placeholders.company} />
          </Field>
          <Field label={t.clientType} required error={fieldError(errors.clientType, lang)}>
            <SelectField
              register={register}
              name="clientType"
              options={CLIENT_TYPES.map((value) => ({ value, label: t.clientTypeLabels[value] }))}
            />
          </Field>
          <Field label={t.country} required error={fieldError(errors.country, lang)}>
            <TextInput register={register} name="country" autoComplete="country-name" placeholder={t.placeholders.country} />
          </Field>
          <Field label={t.city} required error={fieldError(errors.city, lang)}>
            <TextInput register={register} name="city" autoComplete="address-level2" placeholder={t.placeholders.city} />
          </Field>
          <Field label={t.email} required error={fieldError(errors.email, lang)}>
            <TextInput register={register} name="email" type="email" autoComplete="email" placeholder={t.placeholders.email} />
          </Field>
          <Field label={t.phone} required error={fieldError(errors.phone, lang)}>
            <TextInput register={register} name="phone" type="tel" autoComplete="tel" placeholder={t.placeholders.phone} />
          </Field>
          <Field label={t.website} hint={t.optional} error={fieldError(errors.website, lang)}>
            <TextInput register={register} name="website" type="url" autoComplete="url" placeholder={t.placeholders.website} />
          </Field>
        </div>

        <Field label={t.billingAddress} required error={fieldError(errors.billingAddress, lang)}>
          <Textarea register={register} name="billingAddress" rows={2} placeholder={t.placeholders.billingAddress} />
        </Field>

        <div className="form-grid">
          <Field label={t.targetDomain} required error={fieldError(errors.targetDomain, lang)}>
            <TextInput register={register} name="targetDomain" autoComplete="off" placeholder={t.placeholders.targetDomain} />
          </Field>
          <Field
            label={t.domainCount}
            required
            hint={t.domainCountHint}
            error={fieldError(errors.domainCount, lang)}
          >
            <TextInput register={register} name="domainCount" type="number" placeholder={t.placeholders.domainCount} />
          </Field>
        </div>

        <fieldset className="form-fieldset">
          <legend className="form-label">{t.planLegend} *</legend>
          <div className="form-plan-radios">
            {PLAN_IDS.map((plan) => (
              <label key={plan} className={`form-plan-radio ${selectedPlan === plan ? "form-plan-radio-selected" : ""}`}>
                <input type="radio" value={plan} {...register("plan")} />
                <strong>{PLAN_LABELS[plan]}</strong>
                <span>{PLAN_PRICES[plan].toLocaleString(priceLocale)} $ USD</span>
              </label>
            ))}
          </div>
          {errors.plan ? (
            <span className="form-error" role="alert">
              {fieldError(errors.plan, lang)?.message}
            </span>
          ) : null}
        </fieldset>

        <div className="form-grid">
          <Field label={t.sector} required error={fieldError(errors.sector, lang)}>
            <TextInput register={register} name="sector" placeholder={t.placeholders.sector} />
          </Field>
        </div>

        <Field label={t.projectDescription} required error={fieldError(errors.projectDescription, lang)}>
          <Textarea
            register={register}
            name="projectDescription"
            rows={4}
            placeholder={t.placeholders.projectDescription}
          />
        </Field>

        <Field label={t.comments} hint={t.optional} error={fieldError(errors.comments, lang)}>
          <Textarea register={register} name="comments" rows={3} placeholder={t.placeholders.comments} />
        </Field>

        <CheckboxField register={register} name="acceptLicenseTerms" error={fieldError(errors.acceptLicenseTerms, lang)}>
          {t.acceptLicenseTerms}
        </CheckboxField>
        <CheckboxField register={register} name="acceptPrivacyPolicy" error={fieldError(errors.acceptPrivacyPolicy, lang)}>
          {t.acceptPrivacyPolicy}
        </CheckboxField>

        <FormStatus
          status={submitState}
          successMessage={submitState === "success" ? submitMessage : undefined}
          errorMessage={submitState === "error" ? submitMessage : undefined}
        />

        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={submitState === "loading"}>
            {submitState === "loading" ? t.submitting : t.submit}
          </button>
        </div>
      </form>

      <div className="form-payment">
        <h3>{t.payTitle}</h3>
        <p>
          {t.payIntro(PLAN_LABELS[selectedPlan], PLAN_PRICES[selectedPlan].toLocaleString(priceLocale))}
        </p>
        <div className="form-actions">
          <button
            type="button"
            className="button-primary"
            disabled={payState === "loading"}
            onClick={() => void startPayment("stripe")}
          >
            {payState === "loading" ? t.redirecting : t.buyStripe}
          </button>
          <button
            type="button"
            className="button-ghost"
            disabled={payState === "loading"}
            onClick={() => void startPayment("paypal")}
          >
            {t.payPaypal}
          </button>
        </div>
        {payState === "error" && payMessage ? (
          <p className="form-status form-status-error" role="alert">
            {payMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
