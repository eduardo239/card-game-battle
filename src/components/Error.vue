<template>
  <div :class="'notification ' + type" v-if="error">
    <button class="delete"></button>
    <span><i class="fas fa-exclamation-triangle mr-2"></i></span> {{ message }}
  </div>
</template>

<script>
// is-danger
// is-warning
// is-success
export default {
  name: 'Error',
  components: {},
  props: ['error', 'type', 'message'],
  methods: {}
};
</script>

<style></style>
