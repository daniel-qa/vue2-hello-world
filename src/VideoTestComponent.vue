<template>
  <div class="cctv-container">
    <h2>台北 CCTV 即時串流</h2>
    <video
      ref="video"
      controls
      autoplay
      muted
      playsinline
      style="width: 100%; max-width: 800px;"
    ></video>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  name: "TaipeiCCTVStream",
  mounted() {
    const video = this.$refs.video;

    // * 這是 tw.live 取出的 .m3u8 來源
    const streamUrl =
      "https://jtmctrafficcctv5.gov.taipei/NVR/b3ab732e-915d-4f43-a4f5-3d8584816dde/live.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.warn("Video play failed:", err);
        });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS 原生支援 HLS
      video.src = streamUrl;
    } else {
      console.error(
        "不支援 HLS 播放，請確認瀏覽器/設備是否支援 .m3u8 格式"
      );
    }
  }
};
</script>

<style scoped>
.cctv-container {
  padding: 12px;
  text-align: center;
}
</style>
