// Formulaire de ticket de support — /support. Trilingue FR / EN / AR (Lot 4).
// Validation : react-hook-form + zod (mêmes règles que /api/support).
// Les valeurs soumises restent celles du schéma zod (enums en français) ;
// seuls les libellés, placeholders et messages affichés sont traduits.
// Les messages d'erreur zod sont traduits via client/src/lib/form-i18n.ts,
// les erreurs API via leur code stable (SERVICE_NOT_CONFIGURED, …).
// Soumission vers /api/support. Le succès ne s'affiche qu'après une vraie
// réponse 200 du serveur ; sinon, la raison réelle est affichée.
//
// Pièce jointe (facultative) : le fichier est lu en base64 et envoyé avec
// la demande. Limite : 5 Mo. Au-delà, l'utilisateur est invité à envoyer
// le fichier par courriel (voir aussi /api/support et le README).

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MAX_ATTACHMENT_BYTES,
  supportTicketSchema,
  type SupportTicketInput,
} from "@shared/form-schemas";
import { postJson } from "@/lib/api-client";
import type { Language } from "@/lib/i18n";
import {
  attachmentTooLargeMessage,
  fieldError,
  fileReadErrorMessage,
  fileTooLargeMessage,
  translateApiError,
  translateSuccessMessage,
} from "@/lib/form-i18n";
import { Field, FormStatus, SelectField, Textarea, TextInput } from "./FormFields";

type SubmitState = "idle" | "loading" | "success" | "error";

const APPS = ["Client", "Chauffeur", "Commerce", "Admin"] as const;
const ISSUE_TYPES = [
  "Installation",
  "Configuration",
  "Activation",
  "API / connecteurs",
  "Bug",
  "Incident critique",
  "Paiement",
  "Autre",
] as const;
const PRIORITIES = ["Normale", "Haute", "Critique"] as const;

const MAX_ATTACHMENT_MB = MAX_ATTACHMENT_BYTES / (1024 * 1024);

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.includes(",") ? result.split(",").slice(1).join(",") : result);
    };
    reader.onerror = () => reject(new Error("Lecture du fichier impossible."));
    reader.readAsDataURL(file);
  });
}

type FormUi = {
  title: string;
  intro: string;
  name: string;
  email: string;
  company: string;
  orderOrLicense: string;
  domain: string;
  app: string;
  issueType: string;
  priority: string;
  description: string;
  stepsToReproduce: string;
  stepsHint: string;
  optional: string;
  attachment: string;
  attachmentHint: (maxMb: number) => string;
  chosenFile: (name: string) => string;
  submit: string;
  submitting: string;
  successFallback: string;
  errorFallback: string;
  appLabels: Record<string, string>;
  issueTypeLabels: Record<string, string>;
  priorityLabels: Record<string, string>;
  placeholders: Record<string, string>;
};

const formUi: Record<Language, FormUi> = {
  fr: {
    title: "Ouvrir un ticket de support",
    intro: "Décrivez votre problème le plus précisément possible : plus le ticket est précis, plus le diagnostic est rapide. Le soutien dépend de votre licence et des conditions contractuelles.",
    name: "Nom",
    email: "Courriel",
    company: "Entreprise",
    orderOrLicense: "Numéro de commande ou licence",
    domain: "Domaine concerné",
    app: "Application concernée",
    issueType: "Type de problème",
    priority: "Niveau de priorité",
    description: "Description du problème",
    stepsToReproduce: "Étapes pour reproduire",
    stepsHint: "Facultatif, mais très utile pour le diagnostic.",
    optional: "Facultatif.",
    attachment: "Pièce jointe (facultatif)",
    attachmentHint: (maxMb) => `Capture d'écran, journal ou document — ${maxMb} Mo maximum. Au-delà, envoyez le fichier par courriel à contact@benniscom.com.`,
    chosenFile: (name) => `Fichier choisi : ${name}`,
    submit: "Envoyer le ticket",
    submitting: "Envoi en cours…",
    successFallback: "Ticket de support transmis.",
    errorFallback: "Le ticket n'a pas pu être transmis.",
    appLabels: { Client: "Client", Chauffeur: "Chauffeur", Commerce: "Commerce", Admin: "Admin" },
    issueTypeLabels: { Installation: "Installation", Configuration: "Configuration", Activation: "Activation", "API / connecteurs": "API / connecteurs", Bug: "Bug", "Incident critique": "Incident critique", Paiement: "Paiement", Autre: "Autre" },
    priorityLabels: { Normale: "Normale", Haute: "Haute", Critique: "Critique" },
    placeholders: {
      name: "Prénom Nom",
      email: "vous@entreprise.com",
      company: "Votre entreprise",
      orderOrLicense: "Ex. CMD-2026-0001",
      domain: "exemple.com",
      description: "Que se passe-t-il ? Depuis quand ? Quel est l'impact sur votre activité ?",
      stepsToReproduce: "1. … 2. … 3. …",
    },
  },
  en: {
    title: "Open a support ticket",
    intro: "Describe your problem as precisely as possible: the more precise the ticket, the faster the diagnosis. Support depends on your license and the contractual terms.",
    name: "Name",
    email: "Email",
    company: "Company",
    orderOrLicense: "Order or license number",
    domain: "Domain concerned",
    app: "Application concerned",
    issueType: "Problem type",
    priority: "Priority level",
    description: "Problem description",
    stepsToReproduce: "Steps to reproduce",
    stepsHint: "Optional, but very useful for diagnosis.",
    optional: "Optional.",
    attachment: "Attachment (optional)",
    attachmentHint: (maxMb) => `Screenshot, log, or document — ${maxMb} MB maximum. Beyond that, send the file by email to contact@benniscom.com.`,
    chosenFile: (name) => `Selected file: ${name}`,
    submit: "Send the ticket",
    submitting: "Sending…",
    successFallback: "Support ticket sent.",
    errorFallback: "The ticket could not be sent.",
    appLabels: { Client: "Customer", Chauffeur: "Driver", Commerce: "Business", Admin: "Admin" },
    issueTypeLabels: { Installation: "Installation", Configuration: "Configuration", Activation: "Activation", "API / connecteurs": "API / connectors", Bug: "Bug", "Incident critique": "Critical incident", Paiement: "Payment", Autre: "Other" },
    priorityLabels: { Normale: "Normal", Haute: "High", Critique: "Critical" },
    placeholders: {
      name: "First name Last name",
      email: "you@company.com",
      company: "Your company",
      orderOrLicense: "E.g. CMD-2026-0001",
      domain: "example.com",
      description: "What is happening? Since when? What is the impact on your business?",
      stepsToReproduce: "1. … 2. … 3. …",
    },
  },
  ar: {
    title: "فتح طلب دعم",
    intro: "صف مشكلتك بأدق ما يمكن: كلما كان الطلب أدق، كان التشخيص أسرع. الدعم يعتمد على ترخيصك والشروط التعاقدية.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    company: "الشركة",
    orderOrLicense: "رقم الطلب أو الترخيص",
    domain: "النطاق المعني",
    app: "التطبيق المعني",
    issueType: "نوع المشكلة",
    priority: "مستوى الأولوية",
    description: "وصف المشكلة",
    stepsToReproduce: "خطوات إعادة الإنتاج",
    stepsHint: "اختياري، لكنه مفيد جدا للتشخيص.",
    optional: "اختياري.",
    attachment: "مرفق (اختياري)",
    attachmentHint: (maxMb) => `لقطة شاشة أو سجل أو مستند — ${maxMb} ميغابايت كحد أقصى. بعد ذلك، أرسل الملف عبر البريد الإلكتروني إلى contact@benniscom.com.`,
    chosenFile: (name) => `الملف المختار: ${name}`,
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    successFallback: "تم إرسال طلب الدعم.",
    errorFallback: "تعذر إرسال الطلب.",
    appLabels: { Client: "العميل", Chauffeur: "السائق", Commerce: "الشركة", Admin: "الإدارة" },
    issueTypeLabels: { Installation: "التثبيت", Configuration: "التهيئة", Activation: "التفعيل", "API / connecteurs": "API / موصلات", Bug: "خطأ", "Incident critique": "حادث حرج", Paiement: "الدفع", Autre: "أخرى" },
    priorityLabels: { Normale: "عادية", Haute: "عالية", Critique: "حرجة" },
    placeholders: {
      name: "الاسم الكامل",
      email: "you@company.com",
      company: "شركتك",
      orderOrLicense: "مثال: CMD-2026-0001",
      domain: "example.com",
      description: "ماذا يحدث؟ منذ متى؟ وما تأثيره على نشاطك؟",
      stepsToReproduce: "1. … 2. … 3. …",
    },
  },
};

export default function SupportForm({ lang = "fr" }: { lang?: Language }) {
  const t = formUi[lang];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportTicketInput>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      orderOrLicense: "",
      domain: "",
      app: "Client",
      issueType: "Bug",
      priority: "Normale",
      description: "",
      stepsToReproduce: "",
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFileError("");
    if (selected && selected.size > MAX_ATTACHMENT_BYTES) {
      setFile(selected);
      setFileError(
        fileTooLargeMessage((selected.size / (1024 * 1024)).toFixed(1), MAX_ATTACHMENT_MB, lang),
      );
      return;
    }
    setFile(selected);
  };

  const onSubmit = async (data: SupportTicketInput) => {
    if (file && file.size > MAX_ATTACHMENT_BYTES) {
      setSubmitState("error");
      setSubmitMessage(attachmentTooLargeMessage(MAX_ATTACHMENT_MB, lang));
      return;
    }
    setSubmitState("loading");
    setSubmitMessage("");
    let attachment: SupportTicketInput["attachment"];
    if (file) {
      try {
        attachment = {
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          size: file.size,
          contentBase64: await readFileAsBase64(file),
        };
      } catch {
        setSubmitState("error");
        setSubmitMessage(fileReadErrorMessage(lang));
        return;
      }
    }
    const result = await postJson<{ message?: string }>("/api/support", { ...data, attachment }, lang);
    if (result.ok) {
      setSubmitState("success");
      setSubmitMessage(translateSuccessMessage(result.data?.message, lang) ?? t.successFallback);
      setFile(null);
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
          <Field label={t.email} required error={fieldError(errors.email, lang)}>
            <TextInput register={register} name="email" type="email" autoComplete="email" placeholder={t.placeholders.email} />
          </Field>
          <Field label={t.company} hint={t.optional} error={fieldError(errors.company, lang)}>
            <TextInput register={register} name="company" autoComplete="organization" placeholder={t.placeholders.company} />
          </Field>
          <Field label={t.orderOrLicense} hint={t.optional} error={fieldError(errors.orderOrLicense, lang)}>
            <TextInput register={register} name="orderOrLicense" placeholder={t.placeholders.orderOrLicense} />
          </Field>
          <Field label={t.domain} hint={t.optional} error={fieldError(errors.domain, lang)}>
            <TextInput register={register} name="domain" placeholder={t.placeholders.domain} />
          </Field>
          <Field label={t.app} required error={fieldError(errors.app, lang)}>
            <SelectField
              register={register}
              name="app"
              options={APPS.map((value) => ({ value, label: t.appLabels[value] }))}
            />
          </Field>
          <Field label={t.issueType} required error={fieldError(errors.issueType, lang)}>
            <SelectField
              register={register}
              name="issueType"
              options={ISSUE_TYPES.map((value) => ({ value, label: t.issueTypeLabels[value] }))}
            />
          </Field>
          <Field label={t.priority} required error={fieldError(errors.priority, lang)}>
            <SelectField
              register={register}
              name="priority"
              options={PRIORITIES.map((value) => ({ value, label: t.priorityLabels[value] }))}
            />
          </Field>
        </div>

        <Field label={t.description} required error={fieldError(errors.description, lang)}>
          <Textarea
            register={register}
            name="description"
            rows={4}
            placeholder={t.placeholders.description}
          />
        </Field>

        <Field label={t.stepsToReproduce} hint={t.stepsHint} error={fieldError(errors.stepsToReproduce, lang)}>
          <Textarea
            register={register}
            name="stepsToReproduce"
            rows={3}
            placeholder={t.placeholders.stepsToReproduce}
          />
        </Field>

        <div className="form-field">
          <label className="form-label" htmlFor="support-attachment">
            {t.attachment}
          </label>
          <input
            id="support-attachment"
            className="form-input"
            type="file"
            onChange={onFileChange}
          />
          <span className="form-hint">{t.attachmentHint(MAX_ATTACHMENT_MB)}</span>
          {file ? <span className="form-hint">{t.chosenFile(file.name)}</span> : null}
          {fileError ? (
            <span className="form-error" role="alert">
              {fileError}
            </span>
          ) : null}
        </div>

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
