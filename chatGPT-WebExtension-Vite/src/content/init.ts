import StateManager from "./lib/state-manager/stateManager";
// import "../dist/content/nano.min.css"; // 'nano' theme
import { AllChatsMapType } from "./types/types";
import { attachMetadataToChats } from "./utils/helpers/chat-group-manager";
import { consoleStyles } from "./constants/console-styles";

export const init = async (allChatsMap: AllChatsMapType) => {
  console.log();
  console.log("%c🤞 Starting Initialzation...", consoleStyles.info);
  console.log();
  // Intializing State Manager
  const stateManager = await StateManager.getInstance(); // can be "local" or "sync", defaults to "local"

  console.log("%cInitialzing Chats", consoleStyles.info);
  const allStoredGroups = await stateManager.getGroups();
  console.log("All Stored Groups: ", allStoredGroups);
  await attachMetadataToChats(allChatsMap, allStoredGroups);

  console.log();
  console.log("🤞 Initialzation Completed!");
  console.log();
  return {
    stateManager,
  };
};
