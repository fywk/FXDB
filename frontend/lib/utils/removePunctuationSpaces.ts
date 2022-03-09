declare global {
  interface String {
    removePunctuationSpaces(): string;
  }
}

const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~/\s]/g;

String.prototype.removePunctuationSpaces = function (this: string) {
  return this.replace(regex, "");
};

export {};
