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
}

.edit-post-button img {
  width: 25px;
}
</style>

