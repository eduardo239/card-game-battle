<template>
  <ul class="menu-list">
    <li>
      <router-link class="button" to="/">Home</router-link>
    </li>
    <li>
      <router-link class="button" to="/1">heroes</router-link>
    </li>
    <li>
      <router-link class="button" to="/2">monsters</router-link>
    </li>
    <li>
      <router-link class="button" to="/3">maps</router-link>
    </li>
    <li>
      <router-link class="button" to="/4">Jogar</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navigation'
};
</script>

<style>
.menu-list {
  display: flex;
}
.menu-list li {
  margin-left: 10px;
  color: #3a51bb;
}
.router-link-active {
  outline: 3px solid rgba(58, 82, 187, 0.301);
}
</style>
