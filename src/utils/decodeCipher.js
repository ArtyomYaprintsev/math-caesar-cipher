import { prepareText, shiftText, formatText } from "./general";

export const decodeText = (plainText, shift = 0) => {
  return formatText(shiftText(prepareText(plainText), -+shift));
};
