<template>
  <button
      class="filter-posts-button"
      @click="$emit('clickEvent')">
    {{ buttonText }}
  </button>
</template>

<script>

export default {
  name: 'FilterPostsButton',
  props: { buttonText: { type: String } },
}
</script>
<style scoped>
.filter-posts-button {
  width: 30%;
  padding: 10px 0;
  font-size: 18px;
  color: #FFFFFF;
  background-color: #87ceeb;
  border-radius: 4px;
  transition: 0.3s;
}

.filter-posts-button:hover {
  background-color: #36a5c7;
}
</style>

