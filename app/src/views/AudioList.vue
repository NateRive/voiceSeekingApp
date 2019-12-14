<template>
  <div class="audio-list">
    <div class="audio-list-item" v-for="(audio) in audioList" :key="audio.id">
      <router-link
        :to="`/workspaces/${$route.params.workspaceId}/audios/${audio.id}?audioName=${audio.name}`"
      >{{ audio.name }}</router-link>
    </div>
  </div>
</template>

<script>
import modelFactory from "../model/index";
const pageModel = modelFactory.get("page");
const audioModel = modelFactory.get("audio");
export default {
  name: "AudioList",
  props: {},
  data: function() {
    return {
      audioList: []
    };
  },
  async created() {
    this.audioList = await pageModel.getPageDetail(this.$route.params.pageId);
  },
  updated() {},
  methods: {
    onClickAudioItemHandler: async function(audio) {
      await audioModel.getByAudioId();
    }
  },
  watch: {
    "$route.params.pageId": async function(to, from) {
      this.audioList = await pageModel.getPageDetail(to);
    }
  }
};
</script>

<style lang="scss" scoped>
.audio-list {
}
.audio-list-item {
  padding: 20px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
  a {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
</style>