export interface ICharacter {
  name: string;
  id: string;
  image: string;
  gender: string;
  species: string;
  episode: string;
}

export interface IEpisode {
  episode: string;
}

export type PaginationType = {
  id: string;
  value: number | null;
  label: string;
  disabled: boolean;
};

export type getPaginationArgs = {
  total: number;
  show: number;
  current: number | undefined;
};
