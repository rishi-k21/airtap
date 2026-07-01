import { useState } from "react";
import { VariationA, VariationB, VariationC, VariationD } from "./variations";
import v from "./variations.module.css";

type VariationId = "A" | "B" | "C" | "D";

const VARIATIONS: {
  id: VariationId;
  label: string;
  swatch: string;
  Component: () => React.JSX.Element;
}[] = [
  { id: "A", label: "Aurora",    swatch: "#714fee", Component: VariationA },
  { id: "B", label: "Midnight",  swatch: "#9277f3", Component: VariationB },
  { id: "C", label: "Editorial", swatch: "#ee6f2d", Component: VariationC },
  { id: "D", label: "DS Native", swatch: "#fbfbfc", Component: VariationD },
];

export function LandingApp() {
  const [active, setActive] = useState<VariationId>("D");
  const Current = VARIATIONS.find((x) => x.id === active)!.Component;

  return (
    <>
      <Current key={active} />
      <div className={v.switcher} role="tablist" aria-label="Landing page variation">
        <span className={v.switchLabel}>Style</span>
        {VARIATIONS.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={active === x.id}
            className={`${v.switchBtn} ${active === x.id ? v.switchActive : ""}`}
            onClick={() => setActive(x.id)}
          >
            <span className={v.switchSwatch} style={{ background: x.swatch }} />
            <span>{x.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
