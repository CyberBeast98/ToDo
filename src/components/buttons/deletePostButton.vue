<template>
  <button class="delete-post-button" @click="$emit('deletePost')">
    <img src="../../assets/delete.svg" alt="delete-icon">
  </button>
</template>

<script>

export default {
  name: 'DeletePostButton'
}
</script>
<style scoped>
.delete-post-button {
  background-color: transparent;
}

.delete-post-button img {
  width: 25px;
}
</style>

