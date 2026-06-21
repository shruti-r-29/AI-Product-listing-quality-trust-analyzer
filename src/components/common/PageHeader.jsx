import FadeIn from './FadeIn';

export default function PageHeader({ title, subtitle, action }) {
  return (
    <FadeIn className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-muted mt-1 text-sm">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </FadeIn>
  );
}
