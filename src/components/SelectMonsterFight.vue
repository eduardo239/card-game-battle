<template>
  <h4>Escolher o monstro para lutar</h4>
  <div class="flex-start is-2">
    <div v-for="monster in myMonsters" :key="monster.id">
      <div v-if="monster.hp > 0">
        <button
          class="button is-primary"
          @click="$emit('selectMonsterToFight', $event, monster)"
        >
          <span class="icon"> <i class="fas fa-pastafarianism"></i> </span>
          <span> {{ monster.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: ' SelectMonsterFight',
  emits: ['selectMonsterToFight'],
  props: ['myMonsters']
};
</script>

<style></style>
