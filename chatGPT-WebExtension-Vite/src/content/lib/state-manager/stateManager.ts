import browser from "webextension-polyfill";
import {
  AllChatsMapType,
  ChatGroupType,
  ChatObject,
  StateKey,
} from "../../types/types";
import { createNewChatGroup } from "../../utils/helpers/chat-group-manager";
import { IdCounterSingleton } from "../id-counter/id-counter";

export default class StateManager {
  private static instance: StateManager;
  private storage: browser.Storage.StorageArea;
  private _initialized: Promise<void>;

  private constructor(storageType = "local") {
    this.storage =
      storageType === "sync" ? browser.storage.sync : browser.storage.local;

    this._initialized = this.setup(); // Ensure setup is handled via a promise
  }

  static async getInstance(storageType = "local"): Promise<StateManager> {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager(storageType);
    }
    await StateManager.instance._initialized;
    return StateManager.instance;
  }

  private async setup(): Promise<void> {
    const grpCounter = await this.getState<number>("chatGroupIdCounter");
    if (typeof grpCounter !== "number" || grpCounter < 0) {
      IdCounterSingleton.getInstance(0); // Initialize the counter to 0
      await this.setState("chatGroupIdCounter", 0);
    } else {
      IdCounterSingleton.getInstance(grpCounter);
    }
  }

  async getState<T>(key: StateKey): Promise<T | undefined> {
    try {
      const result = await browser.storage.local.get(key);
      return result[key];
    } catch (error) {
      throw new Error(`Failed to get state: ${error}`);
    }
  }

  async setState(key: StateKey, value: unknown): Promise<void> {
    try {
      await browser.storage.local.set({ [key]: value });
    } catch (error) {
      throw new Error(`Failed to set state: ${error}`);
    }
  }

  async removeState(key: StateKey): Promise<void> {
    try {
      await browser.storage.local.remove(key);
    } catch (error) {
      throw new Error(`Failed to remove state: ${error}`);
    }
  }

  async clearState(): Promise<void> {
    try {
      await browser.storage.local.clear();
    } catch (error) {
      throw new Error(`Failed to clear state: ${error}`);
    }
  }

  onStateChange(callback: (changes: browser.Storage.StorageChange) => void) {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (
        areaName === (this.storage === browser.storage.sync ? "sync" : "local")
      ) {
        callback(changes);
      }
    });
  }

  async getGroups(): Promise<ChatGroupType[]> {
    return (await this.getState<ChatGroupType[]>("chatGroups")) || [];
  }

  async addGroup(name: string): Promise<void> {
    const groups = (await this.getGroups()) || [];

    if (groups.some((grp) => grp.title === name)) {
      throw new Error(`Group title (${name}) already exists`);
    }

    // Internally it uses the IdCounterSingleton to generate the id
    const newGroup = createNewChatGroup(name);
    groups.push(newGroup);

    await this.updateCounter();
    await this.setState("chatGroups", groups);
  }

  async removeGroup(group: ChatGroupType): Promise<void> {
    const groups = await this.getGroups();
    const updatedGroups = groups.filter((grp) => grp.id !== group.id);
    await this.setState("chatGroups", updatedGroups);
  }

  async addChatToGroup(
    chat: ChatObject,
    group: ChatGroupType,
    chatsMap: AllChatsMapType
  ): Promise<void> {
    const groups = await this.getGroups();
    const desiredGroup = groups.find((grp) => grp.id === group.id);
    if (!desiredGroup) {
      throw new Error("Group not found");
    }

    const chatFromMap = chatsMap.get(chat.id);
    if (!chatFromMap) {
      throw new Error(
        "[StateManager] -> [addChatToGroup]: Chat not found at AllChatsMap"
      );
    }

    chatFromMap.grpId = group.id;

    if (desiredGroup.chats.some((c) => c.id === chat.id)) {
      console.error("Chat already exists in the group: ", chat);
      return;
    }

    desiredGroup.chats.push(chat);
    await this.setState("chatGroups", groups);
  }

  async removeChatFromGroup(chat: ChatObject): Promise<void> {
    const groups = await this.getGroups();
    const desiredGroup = groups.find((grp) => chat.grpId === grp.id);
    if (!desiredGroup) {
      throw new Error("Group not found");
    }

    if (!desiredGroup.chats.some((c) => c.id === chat.id)) {
      throw new Error("Chat not found in the group");
    }

    desiredGroup.chats = desiredGroup.chats.filter((c) => c.id !== chat.id);
    await this.setState("chatGroups", groups);
  }

  async updateCounter() {
    const counter = IdCounterSingleton.getInstance();
    await this.setState("chatGroupIdCounter", counter.current);
  }
}
