<template>
  <span>Posts: {{ postsLength }}</span>
</template>

<script>

export default {
  name: 'PostCounter',
  props: {
    postsLength: { type: Number }
  },
  data() {
    return {
      completed: false
    }
  }
}
</script>
