<template>
  <div id="app">
    <h1>{{ message }}</h1>
    hi there!
    <div>
      <button @click="onTest">測試</button>
      <!-- 新增載入/卸載測試組件按鈕 -->
      <button @click="onLoadTest">載入測試組件</button>
      <button v-if="showTest" @click="onUnloadTest">卸載測試組件</button>
      <span>Clicked: {{ count }}</span>
    </div>

    <!-- 顯示動態載入的測試組件 -->
    <div v-if="showTest">
      <component :is="testComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue 2!',
      count: 0,
      // 新增欄位用於動態/懶載入組件
      testComponent: null,
      showTest: false
    }
  },
  methods: {
    onTest() {
      this.count++
      console.log('測試 button clicked', this.count)
    },
    // 懶載入並顯示組件
    onLoadTest() {
      this.testComponent = () => import('./TestComponent.vue')
      this.showTest = true
    },
    onUnloadTest() {
      this.showTest = false
      this.testComponent = null
    }
  }
}
</script>