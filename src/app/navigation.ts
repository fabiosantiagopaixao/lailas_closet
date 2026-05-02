export function navigate(path: string) {
  if (window.location.pathname !== path) {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }
}
