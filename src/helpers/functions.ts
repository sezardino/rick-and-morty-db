import { IEpisode, ICharacter } from "@/interfaces";
import { PaginationType } from "@/store/interfaces";

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

// PAGINATION

const generateItem = (value: number): PaginationType => ({
  id: generateId(),
  value: value,
  label: value.toString(),
  disabled: false,
});

const editToDotsItem = (item: PaginationType) => {
  item.label = "...";
  item.value = 0;
  item.disabled = true;
};

const editLabelAndValueItem = (item: PaginationType, value: number) => {
  item.label = value.toString();
  item.value = value;
};

export const createPaginationArr = (
  total: number,
  show: number,
  current: number
) => {
  let length: number;

  if (total >= show) {
    length = show;
  } else if (total === 0) {
    length = 1;
  } else {
    length = total;
  }

  let pagination: PaginationType[] | number[] | [] = [];
  let cases: (item: PaginationType, index: number) => void;

  switch (true) {
    case current === 1 || current === 2:
      pagination = [...Array(length).keys()].map((item) => item + 1);
      cases = (item, index) => {
        if (index + 1 === length) {
          editLabelAndValueItem(item, total);
        } else if (index + 1 === length - 1) {
          editToDotsItem(item);
        }
      };
      break;
    case current === total || current === total - 1:
      pagination = [...Array(length).keys()].map(
        (_, index, arr) => total - arr.length + 1 + index
      );
      cases = (item, index) => {
        if (index === 0) {
          editLabelAndValueItem(item, 1);
        } else if (index === 1) {
          editToDotsItem(item);
        }
      };
      break;

    default:
      pagination = [...Array(length).keys()].map((item) => item + 1);
      cases = (item, index) => {
        if (index === 0) {
          editLabelAndValueItem(item, 1);
        } else if (index === length - 1) {
          editLabelAndValueItem(item, total);
        } else if (index === 1 || index + 1 === length - 1) {
          editToDotsItem(item);
        } else if (index === 3) {
          editLabelAndValueItem(item, current);
        } else if (index === 2) {
          editLabelAndValueItem(item, current - 1);
        } else if (index === 4) {
          editLabelAndValueItem(item, current + 1);
        }
      };
      break;
  }

  pagination.forEach((pageData, index) => {
    const item = generateItem(pageData);
    cases(item, index);

    pagination[index] = item;
  });

  return pagination;
};
