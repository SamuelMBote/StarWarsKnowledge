import {IResource} from './IResouce';

export interface IVehicle extends IResource {
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
  vehicle_class: string;
  pilots: string[];
  films: string[];
}
export function checkIsVehicle(obj: any | unknown): obj is IVehicle {
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
    'vehicle_class' in obj &&
    'pilots' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
