import Browser from "webextension-polyfill";

// Function to inject your web component script into the page
export function injectScript(filePath: string) {
  const script = document.createElement("script");
  script.src = Browser.runtime.getURL(filePath);
  script.type = "module"; // Ensure it is loaded as a module
  script.onload = function () {
    (this as HTMLScriptElement).remove(); // Clean up after the script is loaded
  };
  (document.head || document.documentElement).appendChild(script);
}
