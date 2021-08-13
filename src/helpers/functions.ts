import { IEpisode } from "@/interfaces";

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
