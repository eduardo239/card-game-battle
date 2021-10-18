<template>
  <h4>Escolher os monstros</h4>
  <button class="button is-warning" @click="$emit('resetMyMonsters')">
    reset
  </button>
  <div class="flex-start is-2">
    <div class="card" v-for="monster in monsters" :key="monster.id">
      <img class="poster" :src="monster.image" :alt="monster.name" />
      <p>{{ monster.type }}</p>
      <button
        :disabled="limit > 2"
        class="button is-link"
        @click="$emit('selectMyMonster', $event, monster.id)"
      >
        <span class="icon"><i :class="monster.icon"></i></span>
        <span>{{ monster.name }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['monsters', 'limit'],
  emits: ['selectMyMonster', 'resetMyMonsters']
};
</script>

<style></style>
