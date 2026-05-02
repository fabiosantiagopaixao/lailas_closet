import "./styles/global.css";
import { renderLayout } from "./app/layout";
import { router } from "./app/router";

const app = document.getElementById("app")!;

// 👉 correção GLOBAL do base path (ANTES de tudo)
if (window.location.pathname === "/lailas_closet") {
  window.location.replace("/lailas_closet/");
}

function init() {
  renderLayout(app);
  router();

  // 👉 navegação SPA
  window.addEventListener("popstate", router);
}

init();
