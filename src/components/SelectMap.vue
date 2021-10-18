<template>
  <h4>Escolher o mapa</h4>
  <div class="flex-start is-2">
    <div class="card" v-for="map in maps" :key="map.id">
      <img class="poster" :src="map.image" :alt="map.name" />
      <p>{{ map.type }}</p>
      <button class="button is-link" @click="$emit('selectMyMap', $event, map)">
        <span class="icon"><i :class="map.icon"></i></span>
        <span> {{ map.name }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['maps'],
  emits: ['selectMyMap']
};
</script>

<style></style>
