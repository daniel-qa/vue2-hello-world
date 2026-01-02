<template>
  <div class="manager-container">
    <nav class="side-menu">
      <h3>CCTV 地點清單</h3>
      <div 
        v-for="item in sites" 
        :key="item.id"
        class="menu-item"
        :class="{ active: selectedSite.id === item.id }"
        @click="selectedSite = item"
      >
        {{ item.name }}
      </div>
    </nav>

    <main class="content-area">
      <h2>正在收看：{{ selectedSite.name }}</h2>
      
      <CCTVPlayer :videoUrl="selectedSite.url" />
      
      <p class="info">※ 影像來源：台北市政府即時交通資訊網</p>
    </main>
  </div>
</template>

<script>
import CCTVPlayer from "./CCTVPlayer.vue";

export default {
  components: {
    CCTVPlayer
  },
  data() {
    return {
      // 這裡就是「寫死」的資料
      sites: [
        { 
          id: 1, 
          name: "台北 101", 
          url: "https://jtmctrafficcctv5.gov.taipei/NVR/b3ab732e-915d-4f43-a4f5-3d8584816dde/live.m3u8" 
        },
        { 
          id: 2, 
          name: "市民大道", 
          url: "https://jtmctrafficcctv03.gov.taipei/NVR/68779836-9653-4375-9005-021966699a73/live.m3u8" 
        }
      ],
      selectedSite: null
    };
  },
  created() {
    // 預設選中第一個
    this.selectedSite = this.sites[0];
  }
};
</script>

<style scoped>
.manager-container {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.side-menu {
  width: 200px;
  text-align: left;
}

.menu-item {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 4px;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.menu-item.active {
  background-color: #42b983;
  color: white;
}

.content-area {
  flex: 1;
}

.info {
  margin-top: 15px;
  color: #666;
  font-size: 0.9em;
}
</style>
