import spinner from "../assets/infinite-spinner.svg";

export function renderLoading(
  container: HTMLElement,
  text: string = "Cargando...",
) {
  container.innerHTML = `
    <div class="loading-container">
      <img src="${spinner}" class="loading-spinner" alt="Loading..." />
      <p class="loading-text">${text}</p>
    </div>
  `;
}
