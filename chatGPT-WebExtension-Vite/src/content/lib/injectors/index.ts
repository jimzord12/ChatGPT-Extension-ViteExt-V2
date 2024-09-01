import { injectClearBtn } from "./injectable-scripts/clear-state-btn";
import { injectScript } from "./script-injector";

export function injectAll() {
  injectClearBtn();

  injectScript(
    "dist/content/web-components/chat-add-grp-icon/chat-add-grp-icon.js"
  );
}
