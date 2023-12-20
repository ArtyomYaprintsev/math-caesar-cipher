import { Alphabet, LatinAlphabet, RussianAlphabet } from "../source/alphabet";

const detectLanguage = (text) => {
  // Only for UPPER case text
  const isContainLatin = /[A-Z]/.test(text);
  const isContainRussian = /[А-Я]/.test(text);

  if (isContainLatin && isContainRussian) {
    throw new Error("Text can not to contain latin and russian characters.");
  }

  if (isContainLatin) {
    return LatinAlphabet;
  }

  return RussianAlphabet;
};

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
    .replaceAll("Ё", "$1E")
    .replace(/[^A-ZА-Я]/g, "");
};

export const shiftText = (text, shift) => {
  const alphabet = detectLanguage(text);

  return Array.from(text)
    .map((letter) => shiftLetter(letter, shift, alphabet))
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
