/** Smooth-scroll to a landing section without updating the URL hash. */
export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Remove hash from URL on load and scroll to the target section if present. */
export function restoreSectionFromHash() {
  const hash = window.location.hash;
  if (!hash || hash.length <= 1) return;

  const sectionId = hash.slice(1);
  window.history.replaceState(null, "", window.location.pathname);

  requestAnimationFrame(() => scrollToSection(sectionId));
}
