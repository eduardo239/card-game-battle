<template>
  <div class="buttons mb-2 menu-sticky">
    <button
      class="button is-danger"
      @click="$emit('play')"
      :disabled="isDisabled"
    >
      Play
    </button>
    <button
      class="button is-info"
      @click="$emit('toggleModal')"
      :disabled="isFighting"
    >
      Loja
    </button>
    <button class="button is-warning" @click="$emit('restart')">
      Reiniciar
    </button>
  </div>
</template>

<script>
export default {
  name: 'MenuPlay',
  props: ['isDisabled', 'isFighting'],
  emits: ['restart', 'play', 'toggleModal']
};
</script>

<style></style>
