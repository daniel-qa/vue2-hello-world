<template>
  <div class="manager-container">
    <nav class="side-menu">
      <h3>即時影像清單</h3>
      <div 
        v-for="item in sites" 
        :key="item.id"
        class="menu-item"
        :class="{ active: selectedSite.id === item.id }"
        @click="selectedSite = item"
      >
        <span class="type-tag">{{ item.type === 'hls' ? '交通' : '觀光' }}</span>
        {{ item.name }}
      </div>
    </nav>

    <main class="content-area">
      <div class="header">
        <h2>{{ selectedSite.name }}</h2>
        <span class="status-live">LIVE</span>
      </div>
      
      <div class="player-wrapper">
        <CCTVPlayer 
          v-if="selectedSite.type === 'hls'" 
          :videoUrl="selectedSite.url" 
        />

        <div v-else-if="selectedSite.type === 'youtube'" class="youtube-frame">
          <iframe
            :src="`https://www.youtube.com/embed/${selectedSite.videoId}?autoplay=1&mute=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      
      <p class="footer-info">
        數據來源：{{ selectedSite.type === 'hls' ? '台北市政府交通局' : 'YouTube 觀光局直播' }}
      </p>
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
      sites: [
        { 
          id: 1, 
          name: "台北 101 (信義路口)", 
          type: "hls",
          url: "https://jtmctrafficcctv5.gov.taipei/NVR/b3ab732e-915d-4f43-a4f5-3d8584816dde/live.m3u8" 
        },
        { 
          id: 2, 
          name: "大溪老街 (即時影像)", 
          type: "youtube",
          videoId: "XUWjAsajKXg" // 從您提供的 iframe 中擷取的 ID
        }
      ],
      selectedSite: null
    };
  },
  created() {
    this.selectedSite = this.sites[0];
  }
};
</script>

<style scoped>
.manager-container {
  display: flex;
  height: 90vh;
  gap: 20px;
  padding: 20px;
  background: #f4f7f6;
}

.side-menu {
  width: 260px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.menu-item {
  padding: 12px;
  margin: 8px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
}

.menu-item:hover { background: #f0fdf4; }

.menu-item.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.type-tag {
  font-size: 10px;
  background: rgba(0,0,0,0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 8px;
}

.content-area {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.player-wrapper {
  width: 100%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.youtube-frame {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
}

.youtube-frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.status-live {
  background: #ff4d4f;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
}
</style>
