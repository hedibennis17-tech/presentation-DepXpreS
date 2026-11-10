import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="info-page not-found-page">
      <div className="page-width not-found">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          DEPXPRES / 404
        </div>
        <h1>404</h1>
        <h2>Page introuvable</h2>
        <p>
          La page que vous cherchez n&rsquo;existe pas ou a &eacute;t&eacute;
          d&eacute;plac&eacute;e.
        </p>
        <p className="not-found-alt">
          Page not found — the page you are looking for does not exist or has
          been moved.
        </p>
        <p className="not-found-alt">
          الصفحة غير موجودة — الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link href="/" className="button-primary">
          Retour &agrave; l&rsquo;accueil <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
