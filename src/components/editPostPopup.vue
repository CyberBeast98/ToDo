<template>
  <div class="popup">
    <h2>Edit post</h2>
    <input class="popup__input" type="text" v-model="text" @input="checkValue">
    <div class="popup__buttons">
      <button
          class="popup__button popup__button--cancel" @click="$emit('closePopup')">Cancel</button>
      <PostButton
          class="popup__button"
          type="edit"
          @clickEvent="$emit('click')" />
    </div>
  </div>
  <div class="blur"/>
</template>

<script>
import PostButton from "@/components/buttons/postButton";
export default {
  name: 'EditPostPopup',
  components: { PostButton },
  emits: ['click', 'closePopup'],
  props: { editedText: { type: String } },
  data() {
    return {
      text: this.editedText
    }
  },
  methods: {
    checkValue() {
      this.$store.commit('setEditedText', this.text)
    }
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  z-index: 10;
}

.popup__input {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  padding: 0 5px;
  font-size: 18px;
  box-sizing: border-box;
}

.popup__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.popup__button {
  width: 100%;
}

.popup__button--cancel {
  margin-right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: grey;
  background-color: #FFFFFF;
  border: 1px solid grey;
  border-radius: 4px;
  transition: 0.5s;
  cursor: pointer;
}

.popup__button--cancel:hover {
  color: #FFFFFF;
  background-color: grey;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 50%;
}
</style>

