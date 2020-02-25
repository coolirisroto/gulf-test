// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { inject } from '@loopback/context';
import {
  param,
  get,
} from '@loopback/rest';
import { StarWarsBindings } from '../keys';
import { StarWarsClient } from '../services/SwaAPI';
import Personaje from '../models/Personaje';

export class StarWarsController {
  constructor(
    @inject(StarWarsBindings.STAR_WARS_CLIENT)
    public service: StarWarsClient,
  ) { }
  @get('/characters')
  async find(
    @param.query.number('page') page: number,
  ): Promise<Array<Personaje>> {
    if (!page) page = 1;
    const characters = await this.service.getCharacters(page);
    console.log(characters);
    return characters;
  }

  @get('/characters/{id}')
  async findById(@param.path.number('id') id: number): Promise<Personaje> {
    const character = await this.service.getCharcter(id);
    return character;
  }
  @get('/characters/{id}/films')
  async findFilmsById(@param.path.number('id') id: number): Promise<Personaje> {
    const character = await this.service.getCharcter(id);
    return character;
  }
}
