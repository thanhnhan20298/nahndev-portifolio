export const OVERLOAD_START = "nahndev:overload-start";
export const OVERLOAD_END = "nahndev:overload-end";

export function dispatchOverloadStart() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OVERLOAD_START));
}

export function dispatchOverloadEnd() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OVERLOAD_END));
}
