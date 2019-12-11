<template>
  <div class="audio-list">
    <div class="audio-list-item" v-for="(audio) in audioList" :key="audio.id">{{ audio.name }}</div>
  </div>
</template>

<script>
import modelFactory from "../model/index";
const pageModel = modelFactory.get("page");
export default {
  name: "AudioList",
  props: {},
  data: function() {
    return {
      audioList: []
    };
  },
  async created() {
    console.log(this.$route.params);
    this.audioList = await pageModel.getPageDetail(this.$route.params.pageId);
  }
};
</script>

<style lang="scss" scoped>
.audio-list {
}
.audio-list-item {
  padding: 20px;
  height: 40px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>