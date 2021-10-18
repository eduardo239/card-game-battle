<template>
  <ul class="menu-list">
    <li>
      <router-link class="button is-dark" to="/">Home</router-link>
    </li>
    <li>
      <router-link class="button is-dark" to="/1">heroes</router-link>
    </li>
    <li>
      <router-link class="button is-dark" to="/2">monsters</router-link>
    </li>
    <li>
      <router-link class="button is-dark" to="/3">maps</router-link>
    </li>
    <li>
      <router-link class="button is-dark" to="/4">main</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style>
.menu-list {
  display: flex;
}
</style>
