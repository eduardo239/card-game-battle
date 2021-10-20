<template>
  <h4>Loja</h4>

  <div class="flex-start is-2">
    <div class="card" v-for="item in items" :key="item.id">
      <img class="poster" :src="item.image" :alt="item.name" />
      <button
        class="button is-primary"
        @click="$emit('selectTheItem', $event, item)"
      >
        <span class="icon"><i :class="item.icon"></i></span>
        <span> {{ item.name }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  name: 'Shop',
  emits: ['selectTheItem'],
  props: ['items']
};
</script>

<style></style>
