import { ICharacter } from "@/interfaces";

const LS_KEYS = {
  FAVORITES: "favorites",
  THEME: "theme",
};

class LSApi {
  keyName: string;

  constructor() {
    this.keyName = "rANDmDB";
  }

  getAllData() {
    const data = localStorage.getItem(this.keyName) as string;

    const parsedData = JSON.parse(data);

    return parsedData || {};
  }

  getData(key: string) {
    const data = this.getAllData();

    switch (key) {
      case LS_KEYS.FAVORITES:
        return data[key] || [];
      case LS_KEYS.THEME:
        return data[key] || "";
    }
  }

  saveData(data: ICharacter[] | string, key: string) {
    const oldData = this.getAllData();
    oldData[key] = data;
    const toSave = JSON.stringify(oldData);
    localStorage.setItem(this.keyName, toSave);
  }
}

export default new LSApi();
