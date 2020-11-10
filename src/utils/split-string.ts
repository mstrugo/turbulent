import { SplittedTextRow } from 'types';

export const splitString = (input: string, size: number): SplittedTextRow[] => {
  const arr: string[] = input.split(' ');
  const rows: SplittedTextRow[] = [];
  const words = arr.length;
  let chain = '';

  arr.forEach((word, index) => {
    const updChain = `${chain} ${word}`;

    if (updChain.length > size) {
      rows.push({ value: chain, index });
      chain = word;
    } else {
      chain = updChain;
    }

    if (index === words - 1) {
      rows.push({ value: chain, index: index + 1 });
    }
  });

  return rows;
};
