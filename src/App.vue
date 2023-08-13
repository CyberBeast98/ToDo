<template>
  <input v-model="inputValue">
  <button @click="createPost">createPost</button>
  <div v-for="post in posts" :key="post">
    <p>{{post.text}}</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      inputValue: null,
      posts: []
    }
  },
  mounted() {
    this.posts = JSON.parse(localStorage.posts)
  },
  methods: {
    createPost() {
      const post = {
        text: this.inputValue
      }

      this.posts.push(post);

      localStorage.posts = JSON.stringify(this.posts);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
