<template>
  <div class="container">
    <div class="create-post">
      <input
          class="create-post__input"
          v-model="inputValue"
          @keypress.enter="createPost">
      <PostButton
          :inputValue="inputValue"
          :type="'create'"
          @clickEvent="createPost"/>
    </div>
    <PostCounter :postsLength="posts.length"/>
    <div class="post__buttons">
      <FilterPostsButton buttonText="Done" @clickEvent="filterForTasks('done')" />
      <FilterPostsButton buttonText="Active" @clickEvent="filterForTasks('active')" />
      <FilterPostsButton buttonText="All" @clickEvent="filterForTasks()" />
    </div>
    <div :class="{'posts-container': posts.length > 8}">
      <PostCard v-for="post in posts" :key="post.id" :isChecked="post.isChecked">
        <div class="post__content">
          <input
              class="post__checkbox"
              type="checkbox"
              v-model="post.isChecked"
              @click="completedTask"
          >
          <p class="post__text">{{ post.text }}</p>
        </div>
        <div>
          <EditPostButton v-if="!post.isChecked" @editPost="editPost(post)"/>
          <DeletePostButton @deletePost="deletePost(post)"/>
        </div>
      </PostCard>
    </div>
    <EditPostPopup
        v-if="isShow"
        :editedText="editedText"
        @closePopup="isShow = false"
        @click="saveEditedPost"/>
  </div>
</template>

<script>
import { mapState }     from "vuex";
import { v1 }           from 'uuid'
import PostButton       from "@/components/buttons/postButton";
import PostCounter      from "@/components/postCounter";
import DeletePostButton from "@/components/buttons/deletePostButton";
import EditPostButton   from "@/components/buttons/editPostButton";
import PostCard         from "@/components/postCard";
import EditPostPopup    from "@/components/editPostPopup";
import FilterPostsButton from "@/components/buttons/filterPostsButton";

export default {
  name: 'App',
  components: {
    FilterPostsButton,
    EditPostPopup,
    PostCard,
    EditPostButton,
    DeletePostButton,
    PostCounter,
    PostButton
  },
  data() {
    return {
      inputValue: null,
      isShow: false
    }
  },
  mounted() {
    if (localStorage.posts) this.posts.push(...JSON.parse(localStorage.posts));
  },
  computed: {
    ...mapState({
      posts(state) {
        return state.posts;
      },
      post(state) {
        return state.post;
      },
      editedText(state) {
        return state.editedText;
      }
    })
  },
  methods: {
    createPost() {
      const newPost = {
        text: this.inputValue,
        isChecked: false,
        id: v1()
      };

      this.posts.push(newPost);
      this.inputValue = null;
      this.savePosts();
    },
    editPost(post) {
      this.isShow = !this.isShow;
      this.$store.commit('setPost', this.posts.find((i) => i.id === post.id));
      this.$store.commit('setEditedText', this.post.text);
    },
    saveEditedPost() {
      this.post.text = this.editedText;
      this.isShow = false;
      setTimeout(() => this.savePosts(), 500);
    },
    deletePost(post) {
      this.$store.commit('setPosts', this.posts.filter(p => p.id !== post.id))
      this.savePosts();
    },
    completedTask() {
      setTimeout(() => this.savePosts(), 500)
    },
    savePosts() {
      localStorage.posts = JSON.stringify(this.posts);
      this.$store.commit('setPost', null);
      this.$store.commit('setEditedText', null);
    },
    filterForTasks(filter) {
      this.$store.commit('setPosts', []);
      this.posts.push(...JSON.parse(localStorage.posts));

      if (filter === 'done') return this.$store.commit('setPosts', this.posts.filter(post => post.isChecked));
      if (filter === 'active') return this.$store.commit('setPosts', this.posts.filter(post => !post.isChecked));

    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  overflow: hidden;
}

button {
  border: none;
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: #2c3e50;
  background-color: #ededed;
}

.container {
  width: 500px;
  margin: 50px;
  padding: 20px;
  border-radius: 4px;
  background-color: #FFFFFF;
}

.create-post {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.create-post__input {
  width: 80%;
  padding: 0 5px;
}

.posts-container {
  overflow-y: scroll;
  height: 75vh;
}

.post__content {
  display: flex;
  align-items: center;
  width: 80%;
}

.post__checkbox {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

.post__text {
  width: 80%;
  font-size: 18px;
}

.post__buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
