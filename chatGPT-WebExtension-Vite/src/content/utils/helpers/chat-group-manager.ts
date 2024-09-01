import { consoleStyles } from "../../constants/console-styles";
import { IdCounterSingleton } from "../../lib/id-counter/id-counter";
// import StateManager from "../../lib/state-manager/stateManager";
import { AllChatsMapType, ChatGroupType, ChatObject } from "../../types/types";

/**
 * Creates a new chat group.
 *
 * @param name - The name of the chat group.
 * @returns The newly created chat group.
 */
export function createNewChatGroup(name: string): ChatGroupType {
  const counter = IdCounterSingleton.getInstance();
  const groupId = counter.provideCurrentAndIncrement();

  return {
    id: groupId,
    title: name,
    chats: [],
    color: generateColorBasedOnId(groupId),
  };
}

function generateColorBasedOnId(id: number) {
  const hue = (id * 137.508) % 360;
  const sat = 70;
  const light = 50;

  return `hsl(${hue}, ${sat}%, ${light}%)`;
}
// Adding grp info to Chats (At Init)
export async function attachMetadataToChats(
  allChatsMap: AllChatsMapType,
  allGrps: ChatGroupType[]
) {
  // const chats = Array.from(allChatsMap.entries());
  console.log("🐱‍👤 Attaching Metadata to Chats...");
  // const stateManager = await StateManager.getInstance();

  for (const [chatId, chatValues] of allChatsMap.entries()) {
    for (const grp of allGrps) {
      // if chat is in grp
      if (grp.chats.find((chat) => chat.id === chatId)) {
        chatValues.grpId = grp.id; // 1. Add grp ID to Chats Map
        modifyChatHTMLElement(chatValues, grp);
      }
    }

    // if chat is not in grp
    const addChatGrpIcon = document.createElement("chat-add-grp-icon");

    const iconsContainer = chatValues.htmlRef
      .nextElementSibling as HTMLDivElement;

    addChatGrpIcon.addEventListener("click", () => {
      console.log("🐱‍👤 Add Chat to Grp Icon Clicked");
      // (
      //   _chat: ChatObject,
      //   _group: ChatGroupType,
      //   _chatsMap: AllChatsMapType
      // ) => {
      //   console.log("🐱‍👤 Add Chat to Grp Icon Clicked");
      //   console.log("🐱‍👤 Chat ID: ", _chat.id);
      //   console.log("🐱‍👤 Chat Title: ", _chat.title);
      //   console.log("🐱‍👤 Group ID: ", _group.id);
      //   console.log("🐱‍👤 Group Title: ", _group.title);

      //   stateManager
      //     .addChatToGroup(_chat, _group, _chatsMap)
      //     .then(() => {
      //       console.log("🐱‍👤 Chat Added to Group");
      //       (event.currentTarget as HTMLElement)?.remove();
      //       console.log("🐱‍👤 Add Chat to Grp Icon Removed");
      //     })
      //     .catch((error) => {
      //       console.error("[attachMetadataToChats]: ", error);
      //     });
      // };
    });

    iconsContainer.appendChild(addChatGrpIcon);
  }

  //   for (const grp of allGrps) {
  //     for (const chat of grp.chats) {
  //       const specificChat = allChatsMap.get(chat.id);

  //       if (!specificChat) {
  //         console.error(
  //           "[attachMetadataToChats]: AllChatsMap does not have: ",
  //           chat
  //         );
  //       } else {
  //         specificChat.grpId = grp.id; // 1. Add grp ID to Chats Map
  //         modifyChatHTMLElement(specificChat, grp);
  //       }
  //     }
  //   }
  console.log("🐱‍👤 Metadata Attached to Chats");
}

async function modifyChatHTMLElement(
  chat: Omit<ChatObject, "id">,
  chatGrp: ChatGroupType
) {
  console.log("%c🐱‍👤 Modifying HTML of: ", consoleStyles.info, chat);
  // 1. Add a custom data-* attribute so that the HTML has some metadata just in case.
  chat.htmlRef.setAttribute("data-grp-id", chatGrp.id.toString());

  // 2. Create the ChatGroup Identifier and append it to the chat
  const colorPickerContainer = document.createElement("div");
  colorPickerContainer.classList.add("group-circle");
  colorPickerContainer.style.backgroundColor = chatGrp.color;
  chat.htmlRef.appendChild(colorPickerContainer);

  // 3. Add the additional Menu Item to the Chat "..." menu icon

  // This adds a color picker to the chat group circle
  // try {
  //   await createNewColorPicker(colorPickerContainer, (selectedColor) => {
  //     console.log(
  //       "%cYOU SELECTED THIS COLOR: ",
  //       consoleStyles.highlight,
  //       selectedColor
  //     );
  //   });
  // } catch (error) {
  //   console.error("[modifyChatHTMLElement]: ", error);
  // }

  console.log("%c🐱‍👤 Modifycation Completed", consoleStyles.success);
}
