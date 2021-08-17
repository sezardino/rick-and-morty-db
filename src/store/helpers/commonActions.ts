import { ActionContextType } from "../interfaces";
import { getItemsInRange } from "@/helpers/functions";

type prepareItemsForPageArgs = {
  page: number;
  indexSearch?: boolean;
};

export const prepareItemsForPage = (
  { getters, rootGetters }: ActionContextType,
  { page, indexSearch = true }: prepareItemsForPageArgs
) => {
  const items = getItemsInRange(
    {
      page: page,
      limit: rootGetters["app/perPage"],
      items: getters.items,
    },
    indexSearch
  );

  return items;
};

export const showPageHandler = async ({
  commit,
  dispatch,
  getters,
}: ActionContextType) => {
  const page = getters.currentPage;
  const items = await dispatch("prepareItemsForPage", { page });

  commit("setPageData", items);
};

export const changePageHandler = async (
  { commit, getters, dispatch }: ActionContextType,
  page: number
) => {
  if (page > getters.totalPages) {
    return;
  }
  commit("setCurrentPage", page);
  await dispatch("showPageHandler");
};
