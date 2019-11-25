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
      <!-- :src="`Audio/${fileName}`" -->
      <audio id="audio" v-if="fileName" :src="`${}`" ref="audio" controls></audio>
    </div>
  </div>
</template>

<script>
import treeComponent from "../components/treeComponent";
import sentenceComponent from "../components/sentenceComponent";
import modelFactory from "../model/index";
const locationModel = modelFactory.get("location");
const speechModel = modelFactory.get("speech");
const wordModel = modelFactory.get("word");
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
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        console.log(reader.result);
        this.$refs.audio.src = reader.result;
        this.$refs.audio.load();
        this.$refs.audio.play();
      });
      this.fileName = event.row.name;
      if (event.row.isfile) {
        wordModel.get(event.row.id).then(data => {
          this.sentenceData = data;
        });
        event.idTree.push(event.row.name);
        const pathTree = event.idTree.join("/");
        speechModel.post(pathTree).then(async data => {
          // console.log(data.data);
          const blob = new Blob(data.data, { type: "audio/mp3" });
          console.log(blob);
          const blobURL = window.URL.createObjectURL(blob);
          // reader.readAsDataURL(blob);
          console.log(blobURL);
          this.$refs.audio.src = blobURL;
          await this.$refs.audio.load();
          await this.$refs.audio.play();
        });
      }
    },
    onClickSentenceWordHandler: function(startTime) {
      this.$refs.audio.currentTime = startTime;
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