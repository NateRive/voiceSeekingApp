<template>
  <div class="audio-detail">
    <sentenceComponent :sentenceData="sentenceData" @click="onClickSentenceWordHandler" />
    <div>
      <audio id="audio" :src="audioSrc" preload="auto" ref="audio" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../store/types";
import modelFactory from "../model/index";
import sentenceComponent from "../components/sentenceComponent";
const pageModel = modelFactory.get("page");
const audioModel = modelFactory.get("audio");
const fileModel = modelFactory.get("file");
export default {
  name: "AudioDetail",
  components: {
    sentenceComponent
  },
  props: {},
  data: function() {
    return {
      sentenceData: [],
      audioSrc: ""
    };
  },
  async created() {
    audioModel.getByAudioId(this.$route.params.audioId).then(data => {
      this.sentenceData = data;
      console.log(data);
    });
    let idTreeCopy = this.pageTree.concat();
    idTreeCopy.unshift(this.workspace.id);
    idTreeCopy.unshift(this.group.id);
    idTreeCopy.push(this.$route.query.audioName);
    const pathTree = idTreeCopy.join("/");
    fileModel
      .get(pathTree)
      .then(url => {
        console.log(url);
        this.audioSrc = url;
      })
      .catch(err => {
        console.log("署名つきURLの取得に失敗しました。");
      });
  },
  updated() {},
  methods: {
    onClickSentenceWordHandler: function(startTime) {
      console.log(startTime);
      this.$refs.audio.currentTime = startTime;
      this.$refs.audio.play();
    }
  },
  computed: {
    ...mapGetters({
      pageTree: types.GET_AUDIO_PAGE_TREE,
      group: types.GET_GROUP,
      workspace: types.GET_WORKSPACE
    })
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
</style>