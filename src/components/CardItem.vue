<template>
  <div class="card-item">
    <div class="relative">
      <img class="poster" :src="data.image" :alt="data.name" />
      <span class="absolute top-left card-item-id">{{ data.id }}</span>
    </div>
    <div class="px-2 pb-2">
      <div class="is-size-5">{{ data.name }}</div>
      <div class="is-flex is-justify-content-space-between is-size-7">
        <span v-if="data.type">TIPO: {{ data.type }}</span>
      </div>

      <div class="is-flex is-justify-content-space-between is-size-7">
        <span v-if="data.level">LVL: {{ data.level }}</span>
        <span v-if="data.exp">EXP: {{ data.exp }}</span>
        <span v-if="data.nextLevel">NEX: {{ data.nextLevel }}</span>
        <span v-if="data.price">PRICE: {{ data.price }}</span>
      </div>

      <button
        style="width: 100%"
        class="button is-link"
        @click="$emit('closeModal')"
      >
        Receber
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: ['data'],
  emits: ['closeModal']
};
</script>

<style>
.card-item {
}
</style>
