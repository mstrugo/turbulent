export const arrayReorder = (list: any[], start: number, end: number) => {
  const newList = list.slice();
  const [removed] = newList.splice(start, 1);

  newList.splice(end, 0, removed);

  return newList;
};
