import {IResource} from './IResouce';

export interface IPlanet extends IResource {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
}
export function checkIsPlanet(obj: any | unknown): obj is IPlanet {
  if (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'rotation_period' in obj &&
    'orbital_period' in obj &&
    'diameter' in obj &&
    'climate' in obj &&
    'gravity' in obj &&
    'terrain' in obj &&
    'surface_water' in obj &&
    'population' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
