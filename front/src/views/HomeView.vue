<script setup lang="ts">
import DogComponent from "../components/DogComponent.vue";
import { useDogStore, type iDogIsPresent } from "../stores/dog.store";
import { onMounted, onUnmounted } from 'vue';
import { useSocketStore } from "../stores/socket.store";

const dogStore = useDogStore()
const socketStore = useSocketStore()

onMounted(() => {
  dogStore.retrieveDogs();
});

onUnmounted(() => {
  socketStore.socket.disconnect();
});

const updateDogPresence = (dog: iDogIsPresent) => {
  socketStore.updateDogState(dog);
  dog.isPresent = !dog.isPresent;
};
</script>

<template>
  <div class="dogs-container">
    <div v-for="dog in dogStore.dogs" :key="dog.id" class="dog-item" @click="updateDogPresence(dog)">
      <DogComponent :dog="dog" />

    </div>
  </div>
</template>

<style scoped lang="css">
.dogs-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--size-card-width), 1fr));
  padding: var(--size-gap);
  gap: var(--size-gap);
}
.dog-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--size-card-height);
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>

