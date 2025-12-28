<template>
  <div id="app">
    <h1>{{ message }}</h1>
    hi there!
    <div>
      <button @click="onTest">測試</button>
      <span>Clicked: {{ count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue 2!',
      count: 0
    }
  },
  methods: {
    onTest() {
      this.count++
      
      console.log('測試 button clicked', this.count)
    }
  }
}
</script>