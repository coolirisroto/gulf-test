/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Personaje {
  name: string;
  height: string;
  mass: string
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<any>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: Date;
  edited: string;
  url: string;

  constructor() {
    this.films = [];
    this.species = [];
    this.vehicles = [];
    this.starships = [];
  }
}
