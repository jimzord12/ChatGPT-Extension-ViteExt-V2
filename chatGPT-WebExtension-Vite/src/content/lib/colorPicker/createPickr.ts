import { consoleStyles } from "../../constants/console-styles";
import Picker from "vanilla-picker";

export async function createNewColorPicker(
  parentElement: HTMLElement,
  onChangeColorCb: (selectedColor: string) => void
): Promise<Picker> {
  console.log("%cInitialzing Pickr", consoleStyles.info);
  return new Promise((resolve, reject) => {
    try {
      const picker = new Picker({
        parent: parentElement,
        popup: "right",
        alpha: false,
        editor: false,
      });
      picker.onChange = (color) => {
        onChangeColorCb(color.rgbaString);
      };
      resolve(picker);
    } catch (error) {
      console.error("[createNewColorPicker]: ", error);
      reject(error);
    }
  });
}
