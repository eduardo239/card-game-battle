<template>
  <article :class="'message ' + type" v-if="error">
    <div class="message-body">Error : {{ error }}</div>
  </article>
</template>

<script>
// is-danger
// is-warning
// is-success
export default {
  name: 'Error',
  components: {},
  props: ['error', 'type']
};
</script>

<style></style>
