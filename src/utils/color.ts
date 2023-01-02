import { APP_MANTINE_COLORS, APP_MANTINE_COLORS_INDEX } from 'constant/color';

interface IStrToMantineColorRes {
  color: string;
  shade: number;
}

/* eslint-disable no-bitwise */
export const strToMantineColor = (str: string): IStrToMantineColorRes => {
  let stringUniqueHash = [...str].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 4) - acc);
  }, 0);

  if (stringUniqueHash < 0) {
    stringUniqueHash = 0;
  }

  return {
    color: APP_MANTINE_COLORS[stringUniqueHash % APP_MANTINE_COLORS.length],
    shade:
      APP_MANTINE_COLORS_INDEX[
        stringUniqueHash % APP_MANTINE_COLORS_INDEX.length
      ],
  };
};
