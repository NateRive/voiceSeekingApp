<template>
  <div class="page">
    <div class="top-area">
      <div class="drilldownList">
        <div class="drilldownList-column">
          <treeComponent :datas="shownData" :treeNest="treeNest" @click="onClickItemHandler" />
        </div>
      </div>
      <div class="sentence">
        <sentenceComponent :sentenceData="sentenceData" @click="onClickSentenceWordHandler" />
      </div>
    </div>
    <div class="bottom-area">
      <audio id="audio" :src="audioSrc" preload="auto" ref="audio" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
import treeComponent from "../components/treeComponent";
import sentenceComponent from "../components/sentenceComponent";
import modelFactory from "../model/index";
import { BASE_URL } from "../util/const";
const locationModel = modelFactory.get("location");
const speechModel = modelFactory.get("speech");
const wordModel = modelFactory.get("word");
const fileModel = modelFactory.get("file");
export default {
  components: {
    treeComponent,
    sentenceComponent
  },
  data: function() {
    return {
      treeNest: 0,
      fileName: "",
      currentTree: [""],
      sentenceData: [],
      sentenceDataLength: -1,
      inputValue: "",
      isShow: false,
      audioSrc: "",
      shownData: [{}, {}]
    };
  },
  props: {},
  async created() {
    this.shownData = await locationModel.get();
  },
  methods: {
    onClickItemHandler: async function(event) {
      this.fileName = event.row.name;
      if (event.row.isfile) {
        wordModel.get(event.row.id).then(data => {
          console.log(data);
          this.$set(this, "sentenceData", data);
          // this.sentenceData = data;
        });

        let idTreeCopy = event.idTree.concat();
        idTreeCopy.push(event.row.name);
        const pathTree = idTreeCopy.join("/");
        fileModel
          .get(pathTree)
          .then(url => {
            this.audioSrc = url;
          })
          .catch(err => {
            console.log("署名つきURLの取得に失敗しました。");
          });
      }
    },
    onClickSentenceWordHandler: function(startTime) {
      console.log(startTime);
      this.$refs.audio.currentTime = startTime;
      this.$refs.audio.play();
    }
  }
};
</script>



<style lang="scss" scoped>
.top-area {
  display: flex;
  justify-content: center;
}
.drilldownList {
  width: 300px;
  margin-right: 40px;
}
.sentence {
  width: 400px;
}
</style>