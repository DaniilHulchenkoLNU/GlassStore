import { Glasses } from "../Glasses/Glasses";
import { Dialog } from "./Dialog";

export interface Chat {
  id: string;
  dialog: Dialog[];
  themeofDialogGlass?: Glasses | null;
}
