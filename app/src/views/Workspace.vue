<template>
  <div class="page">
    <div @click.capture.prevent.stop="$router.go(-1)">
      <a href>戻る</a>
    </div>
    <div class="top-area">
      <div class="sidebar">
        <div class="sidebar-block" v-for="(block) in shownData" :key="block.id">
          <div class="sidebar-block__name">{{ block.name }}</div>
          <div class="sidebar-column">
            <treeComponent
              v-if="block.page && block.page.length"
              :datas="block.page"
              @pageDetailLoad="onPageDetailLoad"
              :treeNest="treeNest"
            />
          </div>
        </div>
      </div>
      <div class="content-area">
        <router-view></router-view>
        <div v-for="(audio) in audioList" :key="audio.id"></div>
        <!-- <sentenceComponent :sentenceData="sentenceData" @click="onClickSentenceWordHandler" /> -->
      </div>
    </div>
    <div class="bottom-area">
      <audio id="audio" :src="audioSrc" preload="auto" ref="audio" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
// import HidingIcon from "../UIParts/Lv1/HidingIcon";
import treeComponent from "../components/treeComponent";
// import sentenceComponent from "../components/sentenceComponent";
import modelFactory from "../model/index";
import { BASE_URL } from "../util/const";
const workspaceModel = modelFactory.get("workspace");
const speechModel = modelFactory.get("speech");
const wordModel = modelFactory.get("word");
const fileModel = modelFactory.get("file");
export default {
  components: {
    // HidingIcon,
    treeComponent
    // sentenceComponent
  },
  data: function() {
    return {
      audioList: [],
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
    console.log(this.$route.params.id);
    this.shownData = await workspaceModel.getById(this.$route.params.id);
  },
  methods: {
    onClickPrivateHandler: function() {
      // pageの作成処理
    },
    onPageDetailLoad: function(event) {
      this.$router.push(
        {
          name: "audioList",
          params: { pageId: event.page.id }
        },
        () => {},
        () => {}
      );
      // this.fileName = event.row.name;
      // if (event.row.isfile) {
      //   wordModel.get(event.row.id).then(data => {
      //     console.log(data);
      //     this.$set(this, "sentenceData", data);
      //     // this.sentenceData = data;
      //   });
      //   let idTreeCopy = event.idTree.concat();
      //   idTreeCopy.push(event.row.name);
      //   const pathTree = idTreeCopy.join("/");
      //   fileModel
      //     .get(pathTree)
      //     .then(url => {
      //       this.audioSrc = url;
      //     })
      //     .catch(err => {
      //       console.log("署名つきURLの取得に失敗しました。");
      //     });
      // }
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
* {
  text-align: left;
}
.top-area {
  display: flex;
  justify-content: center;
}
.sidebar {
  width: 300px;
  margin-right: 40px;
}
.sidebar-block {
  margin-top: 50px;
  &__name {
    font-weight: bold;
  }
}
// .sidebar-private {
//   line-height: 50px;
//   font-weight: bold;
//   position: relative;
//   &:hover {
//     background-color: $hover-color;
//     .sidebar-private__icon {
//       display: inline-flex;
//     }
//   }
// }
.content-area {
  width: 400px;
}
.bottom-area {
  text-align: center;
}
</style>