<template>
  <div>About</div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <Post />

  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Test />
  <div v-if="showModal">
    <Modal
      :header="header"
      text="Texto do modal"
      theme="sale"
      @close="toggleModal"
    >
      <!-- slots -->
      <template v-slot:links>
        <a href="#">Sign up now</a>
        <a href="#">Sign in now</a>
      </template>
      <h1>Ninjas</h1>
      <a href=""></a>
    </Modal>
  </div>
  <!-- click event modifiers -->
  <button class="button is-primary is-rounded" @click.left="toggleModal">
    MODAL
  </button>

  <br />

  <!-- send html to public files -->
  <teleport to="#modals" v-if="showModal">
    <h2>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime delectus
      vitae accusantium, adipisci voluptatum nostrum repellendus earum animi
      quam accusamus voluptas voluptates temporibus odit! Maxime similique vero
      exercitationem impedit quidem.
    </h2>
  </teleport>
</template>

<script>
import HelloWorld from './HelloWorld.vue';
import Test from './TestComponent.vue';
import Modal from './Modal.vue';
import Post from './Post.vue';

export default {
  name: 'About',
  components: {
    HelloWorld,
    Test,
    Modal,
    Post
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style></style>
