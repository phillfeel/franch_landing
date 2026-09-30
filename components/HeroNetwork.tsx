import { hero } from "@/lib/content";
import { LogoMark } from "./SiteChrome";

// Схема первого экрана: AI-ядро в центре, вокруг — источники данных сети. По связям бегут бирюзовые «сигналы».
// Две раскладки связей: широкая и телефонная (карточки ближе к центру, чтобы не выходить за край экрана).
const timing = [
  [2.6, 0],
  [3.1, 0.7],
  [2.2, 1.3],
  [2.8, 0.4],
  [3.4, 1.9],
];

function Wires({ layout }: { layout: "at" | "m" }) {
  return (
    <svg className={`hero-net__wires hero-net__wires--${layout}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {hero.nodes.map((n) => {
        const [x, y] = n[layout];
        return <line key={n.title} x1="50" y1="50" x2={x} y2={y} strokeWidth={n.w} className="hero-net__wire" />;
      })}
      {hero.nodes.map((n, i) => {
        const [x, y] = n[layout];
        const [dur, delay] = timing[i % timing.length];
        const [x1, y1, x2, y2] = n.out ? [50, 50, x, y] : [x, y, 50, 50];
        return (
          <line
            key={`s${n.title}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            pathLength={100}
            className="hero-net__signal"
            style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
          />
        );
      })}
    </svg>
  );
}

export function HeroNetwork() {
  return (
    <div className="hero-net" role="img" aria-label="AI-ядро HUBIS собирает данные из звонков, отзывов, касс и 1С, мессенджеров и таблиц">
      <Wires layout="at" />
      <Wires layout="m" />
      <div className="hero-net__core">
        <LogoMark />
      </div>
      {hero.nodes.map((n) => (
        <div
          key={n.title}
          className={`hero-net__node${n.live ? " is-live" : ""}`}
          style={
            {
              "--x": `${n.at[0]}%`,
              "--y": `${n.at[1]}%`,
              "--mx": `${n.m[0]}%`,
              "--my": `${n.m[1]}%`,
            } as React.CSSProperties
          }
        >
          <span className="hero-net__title">
            {n.live && <span className="dot dot--pulse" aria-hidden="true" />}
            {n.title}
          </span>
          <span className="hero-net__meta">{n.meta}</span>
        </div>
      ))}
    </div>
  );
}
