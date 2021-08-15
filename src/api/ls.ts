import { ICharacter } from "@/interfaces";

class LSApi {
  keyName: string;

  constructor() {
    this.keyName = "rANDmDB";
  }

  getData() {
    const data = localStorage.getItem(this.keyName) as string;

    return JSON.parse(data) || [];
  }

  saveData(items: ICharacter[]) {
    const data = JSON.stringify(items);
    localStorage.setItem(this.keyName, data);
  }
}

export default new LSApi();
