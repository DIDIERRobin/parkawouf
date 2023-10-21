<script setup lang="ts">
import type { iDog } from "../interfaces/dog.interface";

const props = defineProps<{
  dog: iDog
}>()
</script>

<template>
<div class="dog-container" :style="{ backgroundImage: `url(/pictures/${dog.name.toLowerCase()}.jpeg)` }">
  <div class="name">
    <h2>
      {{ dog.name }}
    </h2>
  </div>
</div>
</template>

<style scoped lang="css">
.dog-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  color: var(--color-main) !important;
  text-shadow: var(--shadow-title);
  position: relative;
}
.name {
  position: absolute;
  bottom: 0;
  margin: auto;
  left:0;
  right:0;
  text-align: center;
}
h2 {
  font-weight: bolder;
  font-size: 3rem;
}
</style>

