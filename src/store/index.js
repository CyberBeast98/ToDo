import { createStore } from 'vuex'

const store = createStore({
  state: {
    posts: [],
    post: null,
    editedText: null
  },
  mutations: {
    setPosts(state, data) {
      state.posts = data;
    },
    setPost(state, data) {
      state.post = data;
    },
    setEditedText(state, data) {
      state.editedText = data;
    }
  }
});

export default store;