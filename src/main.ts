import "./styles/global.css";
import { renderLayout } from "./app/layout";
import { router } from "./app/router";

const app = document.getElementById("app")!;

// 👉 correção GLOBAL do base path (ANTES de tudo)
if (window.location.pathname === "/lailascloset") {
  window.location.replace("/lailascloset/");
}

function init() {
  renderLayout(app);
  router();

  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerText = `© ${new Date().getFullYear()} Laila’s Closet`;
  }

  window.addEventListener("popstate", router);
}

init();
