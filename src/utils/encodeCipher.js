import { prepareText, shiftText, formatText } from "./general";

export const encodeText = (plainText, shift = 0) => {
  return formatText(shiftText(prepareText(plainText), +shift));
};
