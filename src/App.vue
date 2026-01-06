<template>
  <div id="app">
    <h1>{{ message }}</h1>
    
    <div>
      <button v-if="false" @click="onTest">測試</button>
          <span v-if="fals">Clicked: {{ count }}</span>
      <!-- 新增載入/卸載測試組件按鈕 -->
      <button v-if="false" @click="onLoadTest">載入測試組件</button>
      <button v-if="showTest&&false" @click="onUnloadTest">卸載測試組件</button>
      <!-- 新增影片測試按鈕 -->
      <button @click="onLoadVideo">載入影片測試</button>
      <button v-if="showVideo" @click="onUnloadVideo">卸載影片測試</button>
  
    </div>

    <!-- 顯示動態載入的測試組件 -->
    <div v-if="showTest">
      <component :is="testComponent"></component>
    </div>

    <!-- 顯示動態載入的影片測試組件 -->
    <div v-if="showVideo">
      <component :is="videoComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '即時影象Live',
      count: 0,
      // 新增欄位用於動態/懶載入組件
      testComponent: null,
      showTest: false,
      // 新增影片測試組件欄位
      videoComponent: null,
      showVideo: false
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
    },
    // 影片測試組件方法
    onLoadVideo() {
      this.videoComponent = () => import('./VideoTestComponent.vue')
      this.showVideo = true
    },
    onUnloadVideo() {
      this.showVideo = false
      this.videoComponent = null
    }
  }
}
</script>