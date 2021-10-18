<template>
  <div v-if="message" :class="'notification notification-item ' + type">
    <button class="delete" @click="$emit('closeToast')"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: ['type', 'message'],
  emits: ['closeToast']
};
</script>

<style>
.notification-item {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
  animation: opa 0.3s;
  z-index: 1000;
}
/* @keyframes duration | easing-function | delay |
iteration-count | direction | fill-mode | play-state | name */
@keyframes opa {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
