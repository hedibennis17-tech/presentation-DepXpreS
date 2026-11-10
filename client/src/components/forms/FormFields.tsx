// Champs de formulaire partagés (style DepXpreS : bleu nuit, doré/cyan).
// Utilisés par les formulaires de /purchase, /support et /contact.
// Les styles vivent dans client/src/index.css (bloc « Lot 2 — Formulaires »).

import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

/** Erreur de champ telle que react-hook-form la remonte (message éventuel). */
type FieldErrorLike = { message?: string } | undefined;

export function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: FieldErrorLike;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required ? <span className="form-required" aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint ? <span className="form-hint">{hint}</span> : null}
      {error ? (
        <span className="form-error" role="alert">
          {error.message}
        </span>
      ) : null}
    </div>
  );
}

export function TextInput<T extends FieldValues>({
  register,
  name,
  type = "text",
  autoComplete,
  placeholder,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <input
      className="form-input"
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      {...register(name)}
    />
  );
}

export function Textarea<T extends FieldValues>({
  register,
  name,
  rows = 4,
  placeholder,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  rows?: number;
  placeholder?: string;
}) {
  return <textarea className="form-textarea" rows={rows} placeholder={placeholder} {...register(name)} />;
}

/**
 * Options d'un `<select>` : soit une simple chaîne (valeur = libellé),
 * soit un couple { value, label } — la valeur reste celle attendue par
 * le schéma zod (en français), le libellé affiché est traduit (Lot 4).
 */
export type SelectOption = string | { value: string; label: string };

export function SelectField<T extends FieldValues>({
  register,
  name,
  options,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: ReadonlyArray<SelectOption>;
}) {
  return (
    <select className="form-select" {...register(name)}>
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export function CheckboxField<T extends FieldValues>({
  register,
  name,
  error,
  children,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldErrorLike;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label className="form-checkbox-row">
        <input type="checkbox" className="form-checkbox" {...register(name)} />
        <span>{children}</span>
      </label>
      {error ? (
        <span className="form-error" role="alert">
          {error.message}
        </span>
      ) : null}
    </div>
  );
}

export function FormStatus({
  status,
  successMessage,
  errorMessage,
}: {
  status: "idle" | "loading" | "success" | "error";
  successMessage?: string;
  errorMessage?: string;
}) {
  if (status === "success" && successMessage) {
    return (
      <p className="form-status form-status-success" role="status">
        {successMessage}
      </p>
    );
  }
  if (status === "error" && errorMessage) {
    return (
      <p className="form-status form-status-error" role="alert">
        {errorMessage}
      </p>
    );
  }
  return null;
}
