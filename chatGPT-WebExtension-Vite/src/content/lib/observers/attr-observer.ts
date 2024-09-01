// How to use

// 1. Use createAttributesObserverCallback to create a callback function that will be called when the attribute changes
// 2. Use createAttributesObserverFor to create a MutationObserver that will call the callback function when the attribute changes

export function createAttributesObserverForElement(
  cssSelector: string,
  mutationCallback: MutationCallback,
  options?: MutationObserverInit
): MutationObserver | null {
  const observer = new MutationObserver(mutationCallback);
  const element = document.querySelector(cssSelector);
  if (!element) {
    console.log("Observer: Could not find element");
    return null;
  }
  observer.observe(
    element,
    options
      ? options
      : {
          attributes: true,
        }
  );
  return observer;
}

export const createAttributesObserverCallback = (
  attribute: string,
  logic: (mutation?: MutationRecord) => void
): MutationCallback => {
  return (mutationsList, _) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "attributes") {
        console.log(
          "The " + mutation.attributeName + " attribute was modified."
        );

        if (mutation.attributeName === attribute) {
          logic(mutation);
        }
      }
    }
  };
};
