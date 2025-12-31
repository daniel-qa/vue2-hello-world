<template>
  <div class="test-component">
    <h2>測試組件</h2>
    <button @click="inc">點我 ({{ localCount }})</button>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data() {
    return {
      localCount: 0
    }
  },
  methods: {
    inc() {
      this.localCount++
      console.log('TestComponent clicked', this.localCount)
    }
  }
}
</script>

<style scoped>
.test-component { padding: 12px; border: 1px dashed #999; margin-top: 12px; }
</style>
