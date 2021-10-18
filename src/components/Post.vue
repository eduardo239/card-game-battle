<template>
  <div class="column">
    <h3>Cadastro</h3>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Id</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="produto.id"
            />
          </div>
          <button class="button is-small is-danger" @click="this.produto.id--">
            -
          </button>
          <button class="button is-small is-danger" @click="this.produto.id++">
            +
          </button>

          <label class="label">Nome</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="produto.nome"
            />
          </div>

          <label class="label">Descrição</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="produto.descricao"
            />
          </div>

          <label class="label">Preço</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="produto.preco"
            />
          </div>

          <label class="label">Categoria Id</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="produto.categoria_id"
            />
          </div>

          <p class="help">This is a help text</p>

          <div class="control">
            <p>{{ produto.id }}</p>
            <p>{{ produto.nome }}</p>
            <p>{{ produto.descricao }}</p>
            <p>{{ produto.preco }}</p>
            <p>{{ produto.categoria_id }}</p>
          </div>

          <div class="control">
            <button @click.prevent="postProduto" class="button is-primary">
              Submit
            </button>

            <button @click.prevent="updateProduto" class="button is-secondary">
              Update
            </button>

            <button @click.prevent="deleteProduto" class="button is-warning">
              Del
            </button>

            <button @click.prevent="resetProduto" class="button is-danger">
              Reset
            </button>
          </div>
        </div>
      </div>
      <div class="column">
        <div v-for="produto in produtos" :key="produto.id">
          {{ produto }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index';
export default {
  name: 'Post',
  data() {
    return {
      produtos: [],
      produto: {
        id: null,
        nome: null,
        descricao: null,
        preco: null,
        categoria_id: null
      }
    };
  },
  created() {
    this.getProdutos();
  },
  updated() {},
  methods: {
    getProdutos() {
      this.produtos = [];
    },
    postProduto() {
      api
        .post('/produtos', this.produto)
        .then(() => {
          console.log('cadastrado');
          this.getProdutos();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProduto() {
      api
        .put(`/produtos/${this.produto.id}`, this.produto)
        .then(() => {
          console.log('Produto atualizado com sucesso');
          this.getProdutos();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteProduto() {
      api
        .delete(`/produtos/${this.produto.id}`)
        .then(() => {
          console.log('Produto deletado com sucesso');
          this.getProdutos();
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetProduto() {
      this.produto = {
        id: null,
        nome: null,
        descricao: null,
        preco: null,
        categoria_id: null
      };
    }
  }
};
</script>

<style></style>
