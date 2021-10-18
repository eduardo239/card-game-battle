<template>
  <h4>Escolher o herói</h4>
  <div class="flex-start is-2">
    <div class="card" v-for="hero in heroes" :key="hero.id">
      <img class="poster" :src="hero.image" :alt="hero.name" />
      <p>{{ hero.type }}</p>
      <button
        class="button is-link"
        @click="$emit('selectMyHero', $event, hero.id)"
      >
        {{ hero.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['heroes'],
  emits: ['selectMyHero']
};
</script>

<style></style>
