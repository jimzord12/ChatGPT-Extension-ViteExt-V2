import {
  sidebarParentSelector,
  sidebarSelector,
  sidebarContentSelector,
  chatsContainerSelector,
} from "../../constants/elementSelectors";
import { AllChatsMapType } from "../../types/types";

export const getElements = async () => {
  try {
    const sidebarParent = await waitForElementPromise(sidebarParentSelector);
    // console.log("[getElements]: Sidebar Parent Element found:", sidebarParent);

    const sidebar = await waitForElementPromise(sidebarSelector);
    // console.log("[getElements]: Sidebar Element found:", sidebar);

    const sidebarContent = await waitForElementPromise(sidebarContentSelector);
    // console.log(
    //   "[getElements]: Sidebar Content Element found:",
    //   sidebarContent
    // );

    const allChatsContainers =
      await waitForAllElementPromise<HTMLAnchorElement>(chatsContainerSelector);

    return { sidebarParent, sidebar, sidebarContent, allChatsContainers };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const waitForElement = (
  selector: string,
  callback: (element: HTMLElement) => void
) => {
  const interval = setInterval(() => {
    const element = document.querySelector(selector) as HTMLElement | null;
    if (element) {
      clearInterval(interval);
      callback(element);
    }
  }, 250);
};

export const waitForElementPromise = async (selector: string) => {
  return new Promise<HTMLElement>((resolve, reject) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element) {
        clearInterval(interval);
        resolve(element);
      } else {
        const timer = setTimeout(() => {
          reject("TimedOut (10s): Element not found");
          clearTimeout(timer);
          clearInterval(interval);
        }, 10 * 1000);
      }
    }, 250);
  });
};

export const waitForAllElementPromise = async <T extends Element>(
  selector: string
) => {
  return new Promise<NodeListOf<T>>((resolve, reject) => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll<T>(selector);
      if (elements.length > 0) {
        clearInterval(interval);
        resolve(elements);
      } else {
        const timer = setTimeout(() => {
          reject("TimedOut (10s): Elements not found");
          clearTimeout(timer);
          clearInterval(interval);
        }, 10 * 1000);
      }
    }, 250);
  });
};

export const getChildren = (parentElement: HTMLElement, selector: string) => {
  return parentElement.querySelectorAll(selector);
};

export const getChild = (parentElement: HTMLElement, selector: string) => {
  return parentElement.querySelector(selector);
};

//TODO: Implement this when Color Picker is ready
export const addGroupColor = (chatsMap: AllChatsMapType) => {
  for (const [chatId, chat] of chatsMap.entries()) {
    console.log(chatId, chat);
  }
};
