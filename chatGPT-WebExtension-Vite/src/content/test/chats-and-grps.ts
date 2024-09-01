import StateManager from "../lib/state-manager/stateManager";
import { AllChatsMapType } from "../types/types";

export async function chatsAndGrpsTest(
  allChatsMap: AllChatsMapType,
  stateManager: StateManager
) {
  console.log("🧪 TESTING - CHATS AND GROUPS");
  try {
    await stateManager.addGroup("Test Chat Group 1");
    await stateManager.addGroup("Test Chat Group 2");
    console.log("🧪 + ✅ Groups added");
  } catch (error) {
    console.log("Error: ", error);
  }

  const AllChatsMapEntries = Array.from(allChatsMap.entries());
  // Grab 2 chats from the allChatsMap
  const chat_1_ID = AllChatsMapEntries[0][0];
  // const chat_1 = AllChatsMapEntries[0][1];

  const chat_2_ID = AllChatsMapEntries[1][0];
  // let chat_2 = AllChatsMapEntries[1][0];

  console.log("🧪 + Chat 1 ID: ", chat_1_ID);
  console.log("🧪 + Chat 1 Title: ", allChatsMap.get(chat_1_ID)?.title);
  console.log("🧪 + Chat 2 ID: ", chat_2_ID);
  console.log("🧪 + Chat 2 Title: ", allChatsMap.get(chat_2_ID)?.title);

  // Add one chat to each group
  // const chatId_1 = "4a327c77-4383-4d77-b675-68d888434805";
  // const chatId_2 = "e82ab09e-46f6-4dac-9667-ed74465ca115";
  if (
    allChatsMap.size >= 2 &&
    allChatsMap.has(chat_1_ID) &&
    allChatsMap.has(chat_2_ID)
  ) {
    const chat1 = allChatsMap.get(chat_1_ID);
    const chat2 = allChatsMap.get(chat_2_ID);

    for (const [key, value] of allChatsMap.entries()) {
      console.log(`☕ [${key}]: `, value);
    }

    if (!chat1 || !chat2) {
      console.error("Chat 1 or Chat 2 not found");
      return;
    }
    // Converting ChatMap Records to ChatObjects
    const chatObj_1 = { ...chat1, id: chat_1_ID };
    const chatObj_2 = { ...chat2, id: chat_2_ID };

    // Get the groups
    const groups = await stateManager.getGroups();
    if (groups.length < 2) {
      console.error("Groups not found");
      return;
    }

    const chatGroup1 = groups.find(
      (group) => group.title === "Test Chat Group 1"
    );
    const chatGroup2 = groups.find(
      (group) => group.title === "Test Chat Group 2"
    );

    if (!chatGroup1 || !chatGroup2) {
      console.error("Chat Groups not found");
      return;
    }

    try {
      await stateManager.addChatToGroup(chatObj_1, chatGroup1, allChatsMap);
      await stateManager.addChatToGroup(chatObj_2, chatGroup2, allChatsMap);
    } catch (error) {
      console.error("Error: ", error);
    }

    const groupsAfterAddition = await stateManager.getGroups();

    console.log("");
    console.log("🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉");
    console.log("The Stored Chat Groups: ", groupsAfterAddition);
    console.log("🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉");
    console.log("");

    // Expectations

    // Refetching the groups
    const updatedChatGroup1 = groupsAfterAddition.find(
      (group) => group.title === "Test Chat Group 1"
    );
    if (!updatedChatGroup1) {
      console.error("Updated Chat Group 1 not found");
      return;
    }
    const updatedChatGroup2 = groupsAfterAddition.find(
      (group) => group.title === "Test Chat Group 2"
    );
    if (!updatedChatGroup2) {
      console.error("Updated Chat Group 2 not found");
      return;
    }
    // Chat Group 1
    console.log("");
    console.log("🧪 TESTING - GROUPS");
    if (updatedChatGroup1.chats.length !== 1) {
      console.error(
        `🧪 + ❌ Chat Group 1 does not have the correct number of chats`,
        updatedChatGroup1.chats
      );
    } else {
      console.log("🧪 + ✅ Chat Group 1 has the correct number of chats");
    }

    // Chat Group 2
    if (updatedChatGroup2.chats.length !== 1) {
      console.error(
        `🧪 + ❌ Chat Group 2 does not have the correct number of chats`,
        updatedChatGroup2.chats
      );
    } else {
      console.log("🧪 + ✅ Chat Group 2 has the correct number of chats");
    }

    // Checking the AllChatsMap
    console.log("");
    const chat1FromMap = allChatsMap.get(chat_1_ID);
    const chat2FromMap = allChatsMap.get(chat_2_ID);

    if (!chat1FromMap || !chat2FromMap) {
      console.error("Chat 1 or Chat 2 not found in AllChatsMap");
      return;
    }

    // Chat from Map 1
    console.log("");
    console.log("🧪 TESTING - CHATS MAP");
    if (chat1FromMap.grpId !== chatGroup1.id) {
      console.error(
        "🧪 + ❌ Chat 1 is not in the correct group in AllChatsMap",
        chat1FromMap
      );
    } else {
      console.log("🧪 + ✅ Chat 1 is in the correct group in AllChatsMap");
    }

    // Chat from Map 2
    if (chat2FromMap.grpId !== chatGroup2.id) {
      console.error(
        "🧪 + ❌ Chat 2 is not in the correct group in AllChatsMap",
        chat2FromMap
      );
    } else {
      console.log("🧪 + ✅ Chat 2 is in the correct group in AllChatsMap");
    }
  }
}
