<template>
  <div class="modal" @click.self="closeModal">
    <!-- toggle class -->
    <div class="modal-div" :class="{ sale: theme === 'sale' }">
      <h1>{{ header }}</h1>
      <p>{{ text }}</p>
      <!-- slot children -->
      <slot>default content</slot>
      <div class="actions">
        <slot name="links"></slot>
      </div>
      <div>
        <button>click</button>
        <button>reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['header', 'text', 'theme'],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped></style>
