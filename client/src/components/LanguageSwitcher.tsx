// Sélecteur de langue FR / EN / AR — même modèle que Home.tsx
// (boutons FR / EN / AR, classe "language-active" sur la langue courante).

import type { Language } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n";

export default function LanguageSwitcher({
  lang,
  setLang,
  label,
}: {
  lang: Language;
  setLang: (lang: Language) => void;
  label: string;
}) {
  return (
    <div className="language-switcher" aria-label={label}>
      {LANGUAGES.map((option) => (
        <button
          key={option}
          type="button"
          className={lang === option ? "language-active" : ""}
          onClick={() => setLang(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
