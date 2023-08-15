<template>
  <input type="text" v-model="inputValue">
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'CreatePostInput',
  computed: {
    ...mapState({
      inputValue(state) {
        return state.inputValue;
      }
    })
  }
}
</script>

