import {IResource} from './IResouce';

export interface ISpecie extends IResource {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
}

export function checkIsSpecie(obj: any | unknown): obj is ISpecie {
  if (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'classification' in obj &&
    'designation' in obj &&
    'average_height' in obj &&
    'skin_colors' in obj &&
    'hair_colors' in obj &&
    'eye_colors' in obj &&
    'average_lifespan' in obj &&
    'homeworld' in obj &&
    'language' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
