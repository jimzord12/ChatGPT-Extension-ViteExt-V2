import { templateContent } from "./template";
import { styles } from "./styles";

class ChatAddGrpIcon extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element and append CSS content
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;

    // Create a template element and append HTML content
    const template = document.createElement("template");
    template.innerHTML = templateContent;

    // Append the style and template content to the shadow DOM
    shadow.appendChild(styleElement);
    shadow.appendChild(template.content.cloneNode(true));
  }
}

// Define the custom element
customElements.define("chat-add-grp-icon", ChatAddGrpIcon);
