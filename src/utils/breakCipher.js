import { prepareText, formatText, shiftLetter } from "./general";

import { russianAlphabet } from "../source/alphabet";
import { RUSSIAN_CHARACTER_FREQUENCY } from "../source/frequencies";

const countLettersInText = (text) => {
  return Array.from(text).reduce((_counter, letter) => {
    _counter[letter] = (_counter[letter] ?? 0) + 1;
    return _counter;
  }, {});
};

const getLetterFrequenciesInText = (text) => {
  return Object.fromEntries(
    Object.entries(countLettersInText(text)).map(([letter, count]) => [
      letter,
      Math.round((count / text.length) * 1000) / 1000,
    ])
  );
};

const getReferenceLetterFrequency = (letter) => {
  if (letter === "Ё") {
    return RUSSIAN_CHARACTER_FREQUENCY["Е"];
  }

  if (letter === "Ъ") {
    return RUSSIAN_CHARACTER_FREQUENCY["Ь"];
  }

  return RUSSIAN_CHARACTER_FREQUENCY[letter];
};

const findShift = (text) => {
  // Get letter frequencies in the given text
  const frequencies = getLetterFrequenciesInText(text);

  // Find deviation for each shift
  const shiftDeviations = Array.from(
    { length: russianAlphabet.length },
    (_, index) => index
  ).map((shift) =>
    Array.from(russianAlphabet.alphabet).reduce((prev, letter) => {
      const referenceFrequency = getReferenceLetterFrequency(letter);
      const shiftedLetterFrequency =
        frequencies[shiftLetter(letter, shift, russianAlphabet)] ?? 0;

      return prev + Math.pow(referenceFrequency - shiftedLetterFrequency, 2);
    }, 0)
  );

  return shiftDeviations.indexOf(Math.min.apply(null, shiftDeviations));
};

export const breakCipher = (cipher) => {
  const preparedText = prepareText(cipher);
  const shift = findShift(preparedText);

  return {
    shift,
    brokenText: formatText(
      Array.from(preparedText)
        .map((letter) => shiftLetter(letter, -shift, russianAlphabet))
        .join("")
    ),
  };
};
