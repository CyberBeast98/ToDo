<template>
  <div class="card" :class="{'card--complete': isChecked}">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'PostCard',
  props: {
    isChecked: { type: Boolean }
  },
  data() {
    return {
      completed: false
    }
  }
}
</script>

<style>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 400px;
  padding: 30px 20px;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-bottom: 2px solid #ededed;
}

@keyframes completeTask {
  from { background-color: #FFFFFF; }
  to { background-color: #b4e3aa; }
}

.card--complete {
  background-color: #b4e3aa;
  animation-name: completeTask;
  animation-duration: 1s;
}

</style>
