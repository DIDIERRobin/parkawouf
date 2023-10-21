import { defineStore } from "pinia";
import type { iDog } from "../interfaces/dog.interface";
import { ref } from "vue";
import dogsJson from './data.json'

export const dogStore = defineStore('dog', () => {
  const dogs = ref<iDog[]>(dogsJson)

  return {
    dogs,
  }
})
