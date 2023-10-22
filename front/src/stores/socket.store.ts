import { defineStore } from "pinia";
import { io } from 'socket.io-client';
import { type iDogIsPresent, useDogStore } from "./dog.store";
import {
  DOG_IS_IN_PARK,
  DOG_IS_OFF_PARK,
  LIST_ALL_DOGS,
  socketDogNamespace,
  type tListAllDogsEventOutputDto,
  type tUpdateDogParkEventDto
} from "@parkawouf/shared";


export const useSocketStore = defineStore('socket', () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(`${apiUrl}/${socketDogNamespace}`);
  const socket = io(`${apiUrl}/${socketDogNamespace}`);
  const dogStore = useDogStore();

  socket.on(LIST_ALL_DOGS, (dto: tListAllDogsEventOutputDto) => {
    console.log(dto);
    dogStore.updateAllDogsState(dto)
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  const dogOffPark = (dto: tUpdateDogParkEventDto): void => {
    console.log('emitting dog off park')
    socket.emit(DOG_IS_OFF_PARK, dto);
  }

  const dogInPark = (dto: tUpdateDogParkEventDto): void => {
    console.log('emitting dog in park')
    socket.emit(DOG_IS_IN_PARK, dto);
  }

  const updateDogState = (dog: iDogIsPresent):void => {
    if (dog.isPresent) {
      dogOffPark({dogId: dog.id})
    } else {
      dogInPark({dogId: dog.id})
    }
  }

  return {
    socket,
    updateDogState
  };
})
