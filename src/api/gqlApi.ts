import axios from "axios";
import { countQuery, pageQuery } from "./querys";

interface IApi {
  getData: () => void;
  getCount: (query: string) => Promise<any>;
}

class Api {
  url: string;

  constructor() {
    this.url = "https://rickandmortyapi.com/graphql";
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

  async getCount() {
    const data = await this.getData(countQuery);

    return data.data.characters.info.count;
  }

  async getCharacters(page = 1) {
    const data = await this.getData(pageQuery(page));

    return { characters: data.data.characters.results, page };
  }
}

export default new Api();
