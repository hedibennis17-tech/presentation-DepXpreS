// Formulaire de contact commercial — /contact. Trilingue FR / EN / AR (Lot 4).
// Validation : react-hook-form + zod (mêmes règles que /api/contact).
// Seuls les libellés, placeholders et messages affichés sont traduits.
// Les messages d'erreur zod sont traduits via client/src/lib/form-i18n.ts,
// les erreurs API via leur code stable (SERVICE_NOT_CONFIGURED, …).
// Soumission vers /api/contact. Le succès ne s'affiche qu'après une vraie
// réponse 200 du serveur ; sinon, la raison réelle est affichée.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactRequestSchema, type ContactRequestInput } from "@shared/form-schemas";
import { postJson } from "@/lib/api-client";
import type { Language } from "@/lib/i18n";
import { fieldError, translateApiError, translateSuccessMessage } from "@/lib/form-i18n";
import { CheckboxField, Field, FormStatus, Textarea, TextInput } from "./FormFields";

type SubmitState = "idle" | "loading" | "success" | "error";

type FormUi = {
  title: string;
  intro: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  optional: string;
  acceptPrivacyPolicy: string;
  submit: string;
  submitting: string;
  successFallback: string;
  errorFallback: string;
  placeholders: Record<string, string>;
};

const formUi: Record<Language, FormUi> = {
  fr: {
    title: "Envoyer une demande",
    intro: "Décrivez votre pays, votre domaine, le nombre d'opérations visé et le niveau d'accompagnement souhaité. Nous vous orienterons vers la formule adaptée et les prochaines étapes.",
    name: "Nom",
    company: "Entreprise",
    country: "Pays",
    email: "Courriel",
    phone: "Téléphone",
    subject: "Sujet",
    message: "Message",
    optional: "Facultatif.",
    acceptPrivacyPolicy: "J'accepte la politique de confidentialité. *",
    submit: "Envoyer la demande",
    submitting: "Envoi en cours…",
    successFallback: "Demande transmise.",
    errorFallback: "La demande n'a pas pu être transmise.",
    placeholders: {
      name: "Prénom Nom",
      company: "Votre entreprise",
      country: "Pays de déploiement",
      email: "vous@entreprise.com",
      phone: "+1 514 000-0000",
      subject: "Ex. Demande de licence pour le marché X",
      message: "Marché cible, services visés, marque envisagée, nombre de domaines, niveau d'autonomie technique, budget et délai de lancement…",
    },
  },
  en: {
    title: "Send a request",
    intro: "Describe your country, your domain, the number of operations targeted, and the level of guidance wanted. We will point you to the right plan and the next steps.",
    name: "Name",
    company: "Company",
    country: "Country",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    optional: "Optional.",
    acceptPrivacyPolicy: "I accept the privacy policy. *",
    submit: "Send the request",
    submitting: "Sending…",
    successFallback: "Request sent.",
    errorFallback: "The request could not be sent.",
    placeholders: {
      name: "First name Last name",
      company: "Your company",
      country: "Country of deployment",
      email: "you@company.com",
      phone: "+1 514 000-0000",
      subject: "E.g. License request for market X",
      message: "Target market, services, planned brand, number of domains, technical autonomy level, budget, and launch timeline…",
    },
  },
  ar: {
    title: "إرسال طلب",
    intro: "صف بلدك ونطاقك وعدد العمليات المستهدفة ومستوى المرافقة المطلوب. سنوجهك إلى الخطة المناسبة والخطوات التالية.",
    name: "الاسم",
    company: "الشركة",
    country: "البلد",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    subject: "الموضوع",
    message: "الرسالة",
    optional: "اختياري.",
    acceptPrivacyPolicy: "أقبل سياسة الخصوصية. *",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    successFallback: "تم إرسال الطلب.",
    errorFallback: "تعذر إرسال الطلب.",
    placeholders: {
      name: "الاسم الكامل",
      company: "شركتك",
      country: "بلد النشر",
      email: "you@company.com",
      phone: "+1 514 000-0000",
      subject: "مثال: طلب ترخيص للسوق X",
      message: "السوق المستهدف والخدمات والعلامة المخططة وعدد النطاقات ومستوى الاستقلالية التقنية والميزانية وموعد الإطلاق…",
    },
  },
};

export default function ContactForm({ lang = "fr" }: { lang?: Language }) {
  const t = formUi[lang];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactRequestInput>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      acceptPrivacyPolicy: false,
    },
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const onSubmit = async (data: ContactRequestInput) => {
    setSubmitState("loading");
    setSubmitMessage("");
    const result = await postJson<{ message?: string }>("/api/contact", data, lang);
    if (result.ok) {
      setSubmitState("success");
      setSubmitMessage(translateSuccessMessage(result.data?.message, lang) ?? t.successFallback);
      reset();
    } else {
      setSubmitState("error");
      setSubmitMessage(translateApiError(result.code, result.error, lang) || t.errorFallback);
    }
  };

  return (
    <div className="form-panel">
      <h2>{t.title}</h2>
      <p className="form-intro">{t.intro}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-grid">
          <Field label={t.name} required error={fieldError(errors.name, lang)}>
            <TextInput register={register} name="name" autoComplete="name" placeholder={t.placeholders.name} />
          </Field>
          <Field label={t.company} hint={t.optional} error={fieldError(errors.company, lang)}>
            <TextInput register={register} name="company" autoComplete="organization" placeholder={t.placeholders.company} />
          </Field>
          <Field label={t.country} required error={fieldError(errors.country, lang)}>
            <TextInput register={register} name="country" autoComplete="country-name" placeholder={t.placeholders.country} />
          </Field>
          <Field label={t.email} required error={fieldError(errors.email, lang)}>
            <TextInput register={register} name="email" type="email" autoComplete="email" placeholder={t.placeholders.email} />
          </Field>
          <Field label={t.phone} hint={t.optional} error={fieldError(errors.phone, lang)}>
            <TextInput register={register} name="phone" type="tel" autoComplete="tel" placeholder={t.placeholders.phone} />
          </Field>
          <Field label={t.subject} required error={fieldError(errors.subject, lang)}>
            <TextInput register={register} name="subject" placeholder={t.placeholders.subject} />
          </Field>
        </div>

        <Field label={t.message} required error={fieldError(errors.message, lang)}>
          <Textarea
            register={register}
            name="message"
            rows={5}
            placeholder={t.placeholders.message}
          />
        </Field>

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
    </div>
  );
}
