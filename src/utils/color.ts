/* eslint-disable no-bitwise */
/* eslint-disable import/prefer-default-export */
export const stringToColour = (str: string) => {
  const stringUniqueHash = [...str].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 100%, 40%)`;
};
