import NavigationButtons from "./NavigationButtons";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  prev?: string;
  next?: string;
  prevLabel?: string;
  nextLabel?: string;
  breadcrumbs?: Breadcrumb[];
  jsonLd?: object;
}

export default function PageLayout({
  children,
  prev,
  next,
  prevLabel,
  nextLabel,
  breadcrumbs,
  jsonLd,
}: PageLayoutProps) {
  return (
    <div className="card-content eogbook-page">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="eogbook-breadcrumb" aria-label="Breadcrumb">
          <a href="/eogbook">Home</a>
          {breadcrumbs.map((crumb, i) => (
            <span key={i}>
              <span className="breadcrumb-sep"> › </span>
              {i === breadcrumbs.length - 1 ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <a href={crumb.href}>{crumb.label}</a>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="eogbook-content">{children}</div>

      <NavigationButtons
        prev={prev}
        next={next}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
      />
    </div>
  );
}
