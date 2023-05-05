import {IResource} from './IResouce';

export interface IStarship extends IResource {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
}

export function checkIsStarship(obj: any | unknown): obj is IStarship {
  if (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'model' in obj &&
    'manufacturer' in obj &&
    'cost_in_credits' in obj &&
    'length' in obj &&
    'max_atmosphering_speed' in obj &&
    'crew' in obj &&
    'passengers' in obj &&
    'cargo_capacity' in obj &&
    'consumables' in obj &&
    'hyperdrive_rating' in obj &&
    'MGLT' in obj &&
    'starship_class' in obj &&
    'pilots' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
