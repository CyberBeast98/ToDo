<template>
  <button
      class="create-post-button"
      :disabled="disableButton"
      @click="$emit('clickEvent')">
    {{ buttonText }}
  </button>
</template>

<script>

export default {
  name: 'PostButton',
  props: { inputValue: { type: String }, type: { type: String } },
  computed: {
    disableButton() {
      return this.type === 'create' ? this.inputValue === null || this.inputValue.length === 0 : false;
    },
    buttonText() {
      return this.type === 'create' ? 'Add' : 'Save';
    }
  }
}
</script>
<style scoped>
.create-post-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #87ceeb;
  background-color: transparent;
  border: 1px solid #87ceeb;
  border-radius: 4px;
  transition: 0.5s;
  cursor: pointer;
}

.create-post-button:hover {
  color: #FFFFFF;
  background-color: #87ceeb;
  transition: 0.5s;
}

.create-post-button:disabled {
  color: #FFFFFF;
  background-color: grey;
  border: 1px solid grey;
  opacity: 50%;
  cursor: not-allowed;
}
</style>

