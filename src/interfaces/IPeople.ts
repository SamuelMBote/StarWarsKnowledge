import {IResource} from './IResouce';

export interface IPeople extends IResource {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}
export function checkIsPeople(obj: any | unknown): obj is IPeople {
  if (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'mass' in obj &&
    'hair_color' in obj &&
    'skin_color' in obj &&
    'eye_color' in obj &&
    'birth_year' in obj &&
    'gender' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
