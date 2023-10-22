import { defineStore } from "pinia";
import type { iDog } from "../interfaces/dog.interface";
import { ref } from "vue";
import type { tListAllDogsEventOutputDto } from "@parkawouf/shared";

export interface iDogIsPresent extends iDog {
  isPresent: boolean
}

export const useDogStore = defineStore('dog', () => {
  const dogs = ref<iDogIsPresent[]>([])

  const retrieveDogs = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/dogs');
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const data = await response.json();
      dogs.value = data.map((dog: iDog) => ({...dog, isPresent: false}));
    } catch (e) {
      console.log(e);
    }
  }

  const updateAllDogsState = (dto: tListAllDogsEventOutputDto): void => {
    dogs.value = dogs.value.map((dog: iDogIsPresent) => ({
      ...dog,
      isPresent: dto[dog.id]
    }));
  }

  return {
    dogs,
    retrieveDogs,
    updateAllDogsState
  }
})
