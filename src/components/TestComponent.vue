<template>
  <h3>Teste</h3>
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, ipsa
    odio. Inventore laborum enim expedita minus fugit magni, voluptatibus
    asperiores dicta repudiandae eos reiciendis aliquam voluptatum voluptatem
    odit voluptas veritatis!
  </div>

  <div>
    <div class="field">
      <label class="label">Label</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" />
      </div>
      <p class="help">This is a help text</p>
      <div class="control">
        <button class="button is-primary">Submit</button>
      </div>
    </div>
    <button @click="handleClick">click me</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      title: 'First App'
    };
  },
  methods: {
    handleClick() {
      console.log(this.$refs.name);
      this.$refs.name.classList.add('active');
      this.$refs.name.focus();
    }
  }
};
</script>

<style></style>
