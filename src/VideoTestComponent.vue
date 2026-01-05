<template>
  <div class="manager-container">
    <!-- 背景音樂 - 頁面載入時自動播放 -->
    <iframe
      src="https://www.youtube.com/embed/bxlxilRls7g?autoplay=1&mute=0&controls=0&showinfo=0&modestbranding=1"
      style="position: absolute; width: 1px; height: 1px; top: -9999px; left: -9999px;"
      allow="autoplay; encrypted-media"
    ></iframe>

    <nav class="side-menu" :class="{ collapsed: isMenuCollapsed }">
      <h3 @click="toggleMenu" class="menu-toggle-header">
        <span v-show="!isMenuCollapsed">即時影像清單</span>
        <span class="toggle-icon">{{ isMenuCollapsed ? '▶' : '◀' }}</span>
      </h3>
      <div v-show="!isMenuCollapsed" class="menu-items">
        <div 
          v-for="item in sites" 
          :key="item.id"
          class="menu-item"
          :class="{ active: selectedSite.id === item.id }"
          @click="selectedSite = item"
        >
          <span class="type-tag">{{ item.type === 'hls' ? '交通' : item.type === 'youtube' ? '觀光' : '景點' }}</span>
          {{ item.name }}
        </div>
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
        數據來源：{{ 
          selectedSite.type === 'hls' ? '台北市政府交通局' : 
          'YouTube 直播' 
        }}
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
        },
        { 
          id: 3, 
          name: "七星潭安檢所", 
          type: "youtube",
          videoId: "OQnwVN5lzsk"
        }
      ],
      selectedSite: null,
      isMenuCollapsed: false
    };
  },
  created() {
    this.selectedSite = this.sites[0];
  },
  methods: {
    toggleMenu() {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
  }
};
</script>

<style scoped>
.manager-container {
  display: flex;
  min-height: 100vh;
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
  transition: width 0.3s ease;
}

.side-menu.collapsed {
  width: 25px;
  padding: 10px 5px;
}

.menu-toggle-header {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-size: 16px;
  height: 30px;
}

.side-menu.collapsed .menu-toggle-header {
  font-size: 12px;
  justify-content: flex-end;
}

.toggle-icon {
  font-size: 14px;
  transition: transform 0.3s ease;
  margin-left: 5px;
}

.side-menu.collapsed .toggle-icon {
  margin-left: 0;
}

.menu-items {
  transition: opacity 0.3s ease;
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
  width: 100%;
  height: 80vh;
  min-height: 500px;
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

/* 手機響應式設計 */
@media (max-width: 768px) {
  .manager-container {
    flex-direction: column;
    min-height: auto;
    padding: 10px;
    gap: 10px;
  }
  
  .side-menu {
    width: 100%;
    order: 2;
  }
  
  .side-menu.collapsed {
    width: 100%;
  }
  
  .content-area {
    order: 1;
    min-height: 300px;
  }
  
  .youtube-frame {
    height: 60vh;
    min-height: 300px;
  }
}
</style>
