import { images } from "@/lib/content";

// Слот изображения: пока картинки нет, показывает плейсхолдер с ID и пропорциями из ТЗ.
// eager — для картинок на первом экране: грузятся сразу и с высоким приоритетом (LCP).
export function Slot({
  id,
  label,
  alt = "",
  className = "",
  style,
  eager = false,
}: {
  id: string;
  label?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
}) {
  const src = images[id];
  if (src) {
    return (
      <div className={`slot slot--img ${className}`} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />
      </div>
    );
  }
  return (
    <div className={`slot ${className}`} style={style} role="img" aria-label={alt || id}>
      <span className="slot__label">{label ?? id}</span>
    </div>
  );
}
