export class Alphabet {
  /**
   *
   * @param {string} characters
   */
  constructor(characters) {
    this.alphabet = characters;
    this.indexes = Object.fromEntries(
      Array.from(characters).map((char, index) => [char, index])
    );
  }

  get length() {
    return this.alphabet.length;
  }

  /**
   *
   * @param {number} index
   */
  getCharByIndex(index) {
    return this.alphabet[(index + this.length) % this.length];
  }

  /**
   *
   * @param {string} char
   * @returns
   */
  getIndexByChar(char) {
    return this.indexes[char.toUpperCase()];
  }
}

export const LatinAlphabet = new Alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

// `Ё` letters removed
export const RussianAlphabet = new Alphabet("АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ");
