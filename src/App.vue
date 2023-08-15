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
        <EditPostButton @editPost="editPost(post)"/>
        <DeletePostButton @deletePost="deletePost(post)"/>
      </div>
    </PostCard>
    <EditPostPopup
        v-if="isShow"
        :editedText="editedText"
        @closePopup="isShow = false"
        @click="saveEditedPost"/>
  </div>
</template>

<script>
import { mapState }   from "vuex";
import PostButton from "@/components/buttons/postButton";
import PostCounter from "@/components/postCounter";
import DeletePostButton from "@/components/buttons/deletePostButton";
import EditPostButton from "@/components/buttons/editPostButton";
import PostCard from "@/components/postCard";
import EditPostPopup from "@/components/editPostPopup";

export default {
  name: 'App',
  components: {
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
        id: Math.floor(Math.random() * 100000)
      };

      this.posts.forEach(post => {
        if (post.id === newPost.id) newPost.id = Math.floor(Math.random() * 100000)
      });
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
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
</style>
