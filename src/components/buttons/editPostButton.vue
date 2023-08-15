<template>
  <button class="edit-post-button" @click="$emit('editPost')">
    <img src="../../assets/edit.svg" alt="delete-icon">
  </button>
</template>

<script>
export default {
  name: 'EditPostButton'
}
</script>

<style scoped>
.edit-post-button {
  margin-right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.edit-post-button img {
  width: 25px;
}
</style>

