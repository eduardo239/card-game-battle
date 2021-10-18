<template>
  <div class="modal" @click.self="closeModal">
    <!-- toggle class -->
    <div class="modal-content" :class="{ sale: theme === 'sale' }">
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

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);

  width: 100%;
  height: 100vh;
}

.modal-content {
  background: rgb(255, 255, 255);
  padding: 1rem;
}

.modal-content.sale {
  color: red;
}
</style>
