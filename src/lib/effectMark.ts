import { Mark, mergeAttributes } from "@tiptap/core";

export const EFFECTS = ["glow", "gradient", "glitch", "marker", "flicker"] as const;
export type Effect = (typeof EFFECTS)[number];

export const EffectMark = Mark.create({
  name: "effect",
  addAttributes() {
    return {
      kind: {
        default: "glow",
        parseHTML: (el) => el.getAttribute("data-effect"),
        renderHTML: (attrs) => ({ "data-effect": attrs.kind, class: `fx-${attrs.kind}` }),
      },
    };
  },
  parseHTML() {
    return [{ tag: "span[data-effect]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});
