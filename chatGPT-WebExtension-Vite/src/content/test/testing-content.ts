(() => {
  if (import.meta.env.VITE_TESTING_CONT_SCRIPT !== "yes") return;

  const bodyElement = document.querySelector("body");

  if (bodyElement) {
    const container = document.createElement("div");
    container.innerHTML = "<h1>Testing Content</h1>";
    container.style.cssText = `
        position: fixed;
        bottom: 15px;
        right: 15px;
        padding: 10px;
        z-index: 999999999;
        border-radius: 5px;
        content: "Testing Content";
        background-color: red;
        color: white;
        text-align: center;
    `;

    container.addEventListener("click", () => {
      alert("Clicked - Content Script Working");
      container.remove();
    });
    bodyElement.appendChild(container);
  }
})();
