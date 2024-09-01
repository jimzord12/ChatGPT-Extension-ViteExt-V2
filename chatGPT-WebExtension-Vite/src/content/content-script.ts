import { injectAll } from "./lib/injectors/index.js";
import { AllChatsMapType, ChatObject, FetchedElements } from "./types/types.js";
import { getChild, getElements } from "./utils/helpers/helpers.js";

import "./test/testing-content.js";

import main from "./main.js";

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", () => {
    getElements().then((elements) => prepareElements(elements));
  });
  injectAll();
} else {
  // `DOMContentLoaded` has already fired
  getElements().then((elements) => prepareElements(elements));
  injectAll();
}

const prepareElements = (elements: FetchedElements | null) => {
  if (!elements) {
    console.log("[getElements]: No Elements found :(");
    return;
  }

  const { sidebarParent, sidebar, sidebarContent, allChatsContainers } =
    elements;
  // Sidebar parent
  sidebarParent.id = "sidebar-parent";

  // Sidebar
  sidebar.id = "sidebar";
  sidebar.style.width = "500px";

  // Sidebar Content
  sidebarContent.id = "sidebar-content";
  sidebarContent.style.width = "500px";

  // All chats containers
  const allChatsMap: AllChatsMapType = new Map<
    string,
    Omit<ChatObject, "id">
  >();

  Array.from(allChatsContainers).forEach((chatContainer, idx) => {
    console.log(`(${idx}) - ${chatContainer}`);
    chatContainer.classList.add("chat-container");

    const chatId = chatContainer.getAttribute("href")?.replace("/c/", "");
    console.log(`Chat ID (${idx}): `, chatId);

    const innerDiv = getChild(chatContainer, "div:first-child");
    if (!innerDiv) {
      return;
    }

    const title = innerDiv.textContent;
    console.log(`Chat Title (${idx}): `, innerDiv.textContent);

    if (chatId === undefined || title === null) return;

    allChatsMap.set(chatId, {
      title,
      htmlRef: chatContainer,
    });
  });

  const data = {
    sidebarParent,
    sidebar,
    sidebarContent,
    allChatsMap,
  };

  main(data);
};

// // Apply the resizable functionality to the sidebar
// waitForElement(".sidebar-selector", (sidebar) => {
//   interact(sidebar).resizable({
//     edges: { left: true, right: false, bottom: false, top: false }, // Allow resizing only from the left edge
//     listeners: {
//       move(event) {
//         let { x } = event.target.dataset; // Only handle horizontal movement

//         x = (parseFloat(x) || 0) + event.deltaRect.left;

//         // Apply the width changes
//         Object.assign(event.target.style, {
//           width: `${event.rect.width}px`,
//           transform: `translateX(${x}px)`, // Ensure the element is only moved horizontally
//         });

//         // Store the horizontal position
//         Object.assign(event.target.dataset, { x });
//       },
//     },
//     modifiers: [
//       interact.modifiers.restrictEdges({
//         outer: "parent",
//       }),
//       interact.modifiers.restrictSize({
//         min: { width: 150 }, // Minimum width
//       }),
//     ],
//     inertia: true,
//   });
// });
