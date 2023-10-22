<script setup lang="ts">
import type { iDogIsPresent } from "../stores/dog.store";

const props = defineProps<{
  dog: iDogIsPresent
}>()
</script>

<template>
  <div class="dog-container" :style="{ backgroundImage: `url(/pictures/${dog.name.toLowerCase()}.jpeg)` }">
    <div class="name">
      <h2>
        {{ dog.name }}
      </h2>
    </div>
    <font-awesome-icon :class="{ 'present': dog.isPresent, 'absent': !dog.isPresent }" icon="paw" class="status-icon"/>
  </div>
</template>

<style scoped lang="css">
.dog-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  color: var(--color-main) !important;
  position: relative;
}

.name {
  position: absolute;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--color-light);
  padding: 2px;
}

h2 {
  font-weight: bolder;
  font-size: var(--size-text-big);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.status-icon {
  font-size: 1.5em;
  position: absolute;
  right: 10px;
  top: 10px;
}

.present {
  color: var(--color-accent);
  animation: pulse 1s infinite;
}

.absent {
  color: var(--color-dark);
}
</style>

