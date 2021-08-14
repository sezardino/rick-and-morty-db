import { IEpisode, ICharacter } from "@/interfaces";

export const generateId = () => "id-" + Math.random().toString(36).substr(2, 9);

export const getLastEpisode = (episodes: Array<IEpisode>) => {
  const sortedArr = episodes.sort((itemA, itemB) => {
    if (itemA.episode < itemB.episode) {
      return -1;
    } else {
      return 1;
    }
    return 0;
  });

  return sortedArr[sortedArr.length - 1]?.episode;
};

type getItemsInIDRangeProps = {
  page: number;
  limit: number;
  items: ICharacter[];
};

export const getItemsInIDRange = ({
  page = 1,
  limit,
  items,
}: getItemsInIDRangeProps): ICharacter[] => {
  const extra = page === 1 ? 0 : 1;
  const start = (page - 1) * limit + extra;
  const end = page * limit;

  const neededItems = items.filter(
    (item: any) => item.id >= start && item.id <= end
  );

  return neededItems;
};

export const createPaginationArr = (total: number, show: number) => {
  let length: number;
  if (total >= show) {
    length = show;
  } else if (total === 0) {
    // numbers of pages === 0
    length = 1;
  } else {
    length = total;
  }
  const numbersArr = [...Array(length).keys()].map((i) => i + 1);
  const pagination = numbersArr.map((item, index) => {
    const value = { id: generateId(), label: item.toString(), disabled: false };

    if (index + 1 === length) {
      value.label = total.toString();
    } else if (index + 1 === length - 1 && length === show) {
      value.label = "...";
      value.disabled = true;
    }

    return value;
  });

  return pagination;
};
