import { ICharacter } from "@/interfaces";
import axios from "axios";
import { countQuery, pageQuery, searchCountQuery, searchQuery } from "./querys";

interface IApi {
  getData: () => void;
  getCount: (query: string) => Promise<any>;
}

class Api {
  url: string;
  onPage: number;

  constructor() {
    this.url = "https://rickandmortyapi.com/graphql";
    this.onPage = 20;
  }

  async getData(query: string) {
    const data = await axios({
      url: this.url,
      method: "post",
      data: {
        query: query,
      },
    });

    if (data.status === 200) {
      return data.data;
    }
  }

  async getSearchCount(query: string) {
    const data = await this.getData(searchCountQuery(query));

    return data.data.characters.info.count;
  }

  async getCount() {
    const data = await this.getData(countQuery);

    return data.data.characters.info.count;
  }

  async getCharacters(page = 1) {
    const data = await this.getData(pageQuery(page));

    return data.data.characters.results;
  }

  async getSearchData(query: string, items: number) {
    const totalPages = Math.ceil(items / this.onPage);
    const promiseArr = [...Array(totalPages).keys()].map((item) =>
      this.getData(searchQuery(query, item + 1))
    );

    const response = await Promise.all(promiseArr);

    let allItems: ICharacter[] = [];
    response.map((item) => {
      allItems = [...allItems, ...item.data.characters.results];
    });

    return allItems;
  }
}

export default new Api();
