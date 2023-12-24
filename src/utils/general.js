import { Alphabet, Dictionary } from "../source/alphabet";

/**
 *
 * @param {string} letter
 * @param {number} shift
 * @param {Alphabet} alphabet
 */
export const shiftLetter = (letter, shift, alphabet) => {
  // Return shifted letter
  return alphabet.getCharByIndex(alphabet.getIndexByChar(letter) + shift);
};

export const prepareText = (text) => {
  return text
    .toUpperCase()
    .replaceAll("Ё", "$1Е")
    .replace(/[^A-ZА-Я]/g, "");
};

export const shiftText = (text, shift) => {
  return Array.from(text)
    .map((letter) => {
      const alphabet = Dictionary.detectLetterAlphabet(letter);
      if (!alphabet) return "";
      return shiftLetter(letter, shift, alphabet);
    })
    .join("");
};

export const formatText = (text) => {
  // Format text to groups with 5 characters
  const formatted = text.replace(/(.{5})/g, "$1-");

  if (formatted.at(-1) === "-") {
    return formatted.slice(0, formatted.length - 1);
  }

  return formatted;
};
