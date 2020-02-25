/* eslint-disable */
//sexport const HTTP_BINDING_KEY = "SwaAPI";
import { inject } from '@loopback/context';
import { OauthClientBindings } from '../keys';
import { HttpClient } from '../helpers/HttpClient';
import axios from "axios";
import Personaje from '../models/Personaje';
const API_URL = 'https://swapi.co/api'

export interface StarWarsAPI<T = any> {
  getCharacters(page: number): Promise<T>;
  getCharcter(characterId: number): Promise<T>;
}

export class StarWarsClient implements StarWarsAPI {
  constructor(
    @inject(OauthClientBindings.HTTP_CLIENT)
    public httpClient: HttpClient,
  ) {

  }
  public getCharacters(page: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let params: any
      params = {
        page
      }
      const response = await this.httpClient.get(`${API_URL}/people`, params);
      if (response.status == 200) {
        const dataCharacters = new Array<Personaje>();
        if (response.data.results) {
          response.data.results.map((character: any) => {
            const newPersonaje = new Personaje();
            newPersonaje.name = character.name;
            newPersonaje.height = character.height;
            newPersonaje.mass = character.mass;
            newPersonaje.hair_color = character.hair_color;
            newPersonaje.skin_color = character.skin_color;
            newPersonaje.eye_color = character.eye_color;
            newPersonaje.birth_year = character.birth_year;
            newPersonaje.gender = character.gender;
            newPersonaje.homeworld = character.homeworld;
            newPersonaje.films = character.films;
            newPersonaje.species = character.species;
            newPersonaje.vehicles = character.vehicles;
            newPersonaje.starships = character.starships;
            newPersonaje.created = new Date(character.created);
            newPersonaje.edited = character.edited;
            newPersonaje.url = character.url;
            dataCharacters.push(newPersonaje);
          })
          const sortedCharacters = dataCharacters.sort((a, b) => +b.created - +a.created)
          resolve(sortedCharacters)
        }
        else {
          resolve([])
        }

      }
      else {
        reject("Error retriving account data")
      }
    })
  }
  public getCharcter(characterId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await this.httpClient.get(`${API_URL}/people/${characterId}`, null);
      if (response.status == 200 && response.data) {
        const character = response.data;
        const personaje = new Personaje();
        personaje.name = character.name;
        personaje.height = character.height;
        personaje.mass = character.mass;
        personaje.hair_color = character.hair_color;
        personaje.skin_color = character.skin_color;
        personaje.eye_color = character.eye_color;
        personaje.birth_year = character.birth_year;
        personaje.gender = character.gender;
        personaje.homeworld = character.homeworld;
        //personaje.films = character.films;
        personaje.species = character.species;
        personaje.vehicles = character.vehicles;
        personaje.starships = character.starships;
        personaje.created = new Date(character.created);
        personaje.edited = character.edited;
        personaje.url = character.url;
        personaje.films = await this.getFilms(character.films);
        resolve(personaje)
      }
      else {
        reject("Error retriving account data")
      }
    })
  }
  private async getFilms(arrayFilms: Array<string>): Promise<Array<string>> {
    const filmsPromises = await this.getFilmsAPI(arrayFilms);
    console.log(filmsPromises);
    const films = Array<any>();
    if (filmsPromises instanceof Array && filmsPromises.length > 0) {
      filmsPromises.map(resultPromise => {
        if (resultPromise.status == 200) {
          const film = resultPromise.data;
          films.push(film)
        }
      });
      const sortedFilms = films.sort((a, b) => b.episode_id - a.episode_id);
      return sortedFilms;
    }
    return films;
  }

  private getFilmsAPI(films: Array<string>): Promise<any> {
    const promises = Array<Promise<any>>();
    films.map(filmUrl => {
      const promise = this.httpClient.get(filmUrl, null);
      promises.push(promise);
    });
    return Promise.resolve(Promise.all(promises));
  }
}
