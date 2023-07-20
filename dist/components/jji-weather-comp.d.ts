import type { Components, JSX } from "../types/components";

interface JjiWeatherComp extends Components.JjiWeatherComp, HTMLElement {}
export const JjiWeatherComp: {
  prototype: JjiWeatherComp;
  new (): JjiWeatherComp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
