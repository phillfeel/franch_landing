import { images } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Слот изображения: пока картинки нет, показывает плейсхолдер с ID и пропорциями из ТЗ.
export function Slot({
  id,
  label,
  alt = "",
  className = "",
  style,
}: {
  id: string;
  label?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const src = images[id];
  if (src) {
    return (
      <div className={`slot slot--img ${className}`} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={base + src} alt={alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`slot ${className}`} style={style} role="img" aria-label={alt || id}>
      <span className="slot__label">{label ?? id}</span>
    </div>
  );
}
