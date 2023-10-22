import { Controller, Get } from '@nestjs/common';
import { iDog } from '@parkawouf/shared';
import { dogs } from './dog.data';

@Controller('dogs')
export class DogController {
  constructor() {
  }

  @Get()
  allDogs(): Promise<iDog[]> {
    return Promise.resolve(dogs);
  }

}
