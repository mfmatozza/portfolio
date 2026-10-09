import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SIZE = 4;
const GAP = 70;
const PAD = 35;
const DIM = PAD * 2 + GAP * (SIZE - 1);

const dots = Array.from({ length: SIZE * SIZE }, (_, i) => ({
  i,
  x: PAD + (i % SIZE) * GAP,
  y: PAD + Math.floor(i / SIZE) * GAP,
}));

export const PatternLock = ({
  onComplete,
  error,
}: {
  onComplete: (pattern: string) => void;
  error?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState<number[]>([]);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const drawing = useRef(false);
  const pathRef = useRef<number[]>([]);
  const update = (next: number[]) => {
    pathRef.current = next;
    setPath(next);
  };

  const toLocal = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * DIM, y: ((e.clientY - r.top) / r.height) * DIM };
  };

  const hit = (p: { x: number; y: number }) => dots.find((d) => Math.hypot(d.x - p.x, d.y - p.y) < 22);

  const add = (p: { x: number; y: number }) => {
    const d = hit(p);
    if (d && !pathRef.current.includes(d.i)) update([...pathRef.current, d.i]);
  };

  const down = (e: React.PointerEvent) => {
    svgRef.current?.setPointerCapture?.(e.pointerId);
    drawing.current = true;
    update([]);
    const p = toLocal(e);
    setPointer(p);
    add(p);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const p = toLocal(e);
    setPointer(p);
    add(p);
  };
  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    setPointer(null);
    const done = pathRef.current;
    if (done.length >= 4) onComplete(done.join("-"));
    setTimeout(() => update([]), 500);
  };

  const last = path.length ? dots[path[path.length - 1]] : null;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${DIM} ${DIM}`}
      className={cn("w-72 h-72 touch-none select-none", error && "animate-[shake_0.4s]")}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onLostPointerCapture={up}
      onPointerCancel={up}
    >
      {path.slice(1).map((d, k) => (
        <line
          key={k}
          x1={dots[path[k]].x}
          y1={dots[path[k]].y}
          x2={dots[d].x}
          y2={dots[d].y}
          className={error ? "stroke-destructive" : "stroke-primary"}
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
      {last && pointer && (
        <line x1={last.x} y1={last.y} x2={pointer.x} y2={pointer.y} className="stroke-primary/50" strokeWidth={3} strokeLinecap="round" />
      )}
      {dots.map((d) => {
        const on = path.includes(d.i);
        return (
          <g key={d.i}>
            {on && <circle cx={d.x} cy={d.y} r={16} className="fill-primary/20" />}
            <circle cx={d.x} cy={d.y} r={on ? 7 : 5} className={on ? "fill-primary" : "fill-muted-foreground"} />
          </g>
        );
      })}
    </svg>
  );
};
