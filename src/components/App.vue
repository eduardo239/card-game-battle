<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      header: 'Sign up for the Giveway!',
      showModal: false
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    }
  },
  mounted() {},
  created() {},
  update() {},
  unmounted() {}
};
</script>

<style></style>
