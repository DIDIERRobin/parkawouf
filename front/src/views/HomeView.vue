<script setup lang="ts">
import DogComponent from "../components/DogComponent.vue";
import { dogStore } from "../stores/dog.store";

const store = dogStore()

</script>

<template>
  <h1>Parkawouf !</h1>
  <div class="dogs-container">
    <div v-for="dog in store.dogs" :key="dog.id" class="dog-item">
      <DogComponent :dog="dog" />
    </div>
  </div>
</template>

<style scoped lang="css">
.dogs-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
  padding: var(--size-gap);
  gap: var(--size-gap);
}
.dog-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--card-height);
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

