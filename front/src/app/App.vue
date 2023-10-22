<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <div class="header">
      <h1>Parkawouf !</h1>
    </div>
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>

<style lang="css">
body {
  background: var(--color-dark);
}

.app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  color: var(--color-light);
  height: var(--size-header);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  height: var(--size-page);
  overflow: scroll;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>
