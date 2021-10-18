<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      modal shop
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalShop',
  props: [],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style>
.modal {
  z-index: 1000;
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
  background-color: #fff;
}
</style>
