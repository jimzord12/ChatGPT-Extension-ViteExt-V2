export type ChatObject = {
  id: string;
  title: string;
  htmlRef: HTMLAnchorElement;
  grpId?: number;
};

export type ChatGroupType = {
  id: number;
  title: string;
  chats: ChatObject[];
  color: string;
};

export type UserPrefs = {
  enabled: boolean;
  sidebarWidth: number;
  contentWidth: number;
};

export type AllChatsMapType = Map<string, Omit<ChatObject, "id">>;

export type FetchedElements =
  | {
      sidebarParent: HTMLElement;
      sidebar: HTMLElement;
      sidebarContent: HTMLElement;
      allChatsContainers: NodeListOf<HTMLAnchorElement>;
    }
  | undefined;

export type StateKey = "chatGroups" | "userPrefs" | "chatGroupIdCounter";

export type IdCounter = {
  current: number;
  increment: () => number;
  decrement: () => number;
  reset: () => number;
  specify: (num: number) => number;
};

export type userPrefs = {
  enabled: boolean;
  sidebarWidth: number;
  contentWidth: number;
};

export type PickrRoot = {
  app: HTMLDivElement; // Represents the main div with class "pcr-app"
  button: HTMLButtonElement; // Represents the button element with class "pcr-button"
  hue: {
    picker: HTMLDivElement; // Represents the div with class "pcr-picker"
    slider: HTMLDivElement; // Represents the div with class "pcr-hue pcr-slider"
  };
  interaction: {
    result: HTMLInputElement; // Represents the input element with class "pcr-result"
    options: HTMLElement[]; // Represents the array of option elements
    save: HTMLInputElement; // Represents the input element with class "pcr-save"
    cancel: HTMLInputElement; // Represents the input element with class "pcr-cancel"
    clear: HTMLInputElement; // Represents the input element with class "pcr-clear"
    [key: string]: HTMLElement | HTMLElement[]; // Represents any other dynamic interaction elements
  };
  opacity: {
    picker: HTMLDivElement; // Represents the div with class "pcr-picker"
    slider: HTMLDivElement; // Represents the div with class "pcr-opacity pcr-slider"
  };
  palette: {
    picker: HTMLDivElement; // Represents the div with class "pcr-picker"
    palette: HTMLDivElement; // Represents the div with class "pcr-palette"
  };
  preview: {
    lastColor: HTMLButtonElement; // Represents the button element with class "pcr-last-color"
    currentColor: HTMLDivElement; // Represents the div with class "pcr-current-color"
  };
  root: HTMLDivElement; // Represents the root div with class "pickr"
  swatches: HTMLDivElement; // Represents the div with class "pcr-swatches"
};
