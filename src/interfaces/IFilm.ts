import {IResource} from './IResouce';

export interface IFilm extends IResource {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}
export function checkIsFilm(obj: any | unknown): obj is IFilm {
  if (
    obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    'episode_id' in obj &&
    'opening_crawl' in obj &&
    'director' in obj &&
    'producer' in obj &&
    'release_date' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
