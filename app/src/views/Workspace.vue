<template>
  <div class="page">
    <div @click.capture.prevent.stop="$router.go(-1)">
      <a href>戻る</a>
    </div>
    <div class="top-area">
      <div class="sidebar">
        <div class="sidebar-block" v-for="(block) in shownData" :key="block.id">
          <HidingIcon type="add" :isFloat="true" right="10px" top="10px">
            <div class="sidebar-block__name" @click="onClickPageAddHandler(1)">{{ block.name }}</div>
          </HidingIcon>
          <div class="sidebar-column">
            <treeComponent
              v-if="block.page && block.page.length"
              :datas="block.page"
              @pageDetailLoad="onPageDetailLoad($event, block)"
              :treeNest="treeNest"
            />
          </div>
        </div>
      </div>
      <div class="content-area">
        <router-view></router-view>
        <!-- <div v-for="(audio) in audioList" :key="audio.id"></div> -->
        <!-- <sentenceComponent :sentenceData="sentenceData" @click="onClickSentenceWordHandler" /> -->
      </div>
    </div>
    <div class="bottom-area"></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import * as types from "../store/types";
import HidingIcon from "../UIParts/Lv1/HidingIcon";
import treeComponent from "../components/treeComponent";
import modelFactory from "../model/index";
import { BASE_URL } from "../util/const";
const workspaceModel = modelFactory.get("workspace");
const speechModel = modelFactory.get("speech");
const wordModel = modelFactory.get("word");
const fileModel = modelFactory.get("file");
const pageModel = modelFactory.get("page");
export default {
  components: {
    HidingIcon,
    treeComponent
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
      shownData: [{}, {}]
    };
  },
  props: {},
  async created() {
    this.shownData = await workspaceModel.getById(
      this.$route.params.workspaceId
    );
  },
  methods: {
    onClickPageAddHandler: function(noParent) {},
    onPageDetailLoad: function(event, group) {
      this.$router.push(
        {
          name: "audioList",
          params: {
            workspaceId: this.$route.params.workspaceId,
            pageId: event.page.id
          }
        },
        () => {},
        () => {}
      );
      let idTreeCopy = event.idTree.concat();
      this.setGroup(group);
      this.fixPageTree(idTreeCopy);
    },
    ...mapMutations({
      fixPageTree: types.MUTATE_AUDIO_PAGE_TREE,
      setGroup: types.MUTATE_GROUP
    })
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
    line-height: 50px;
    &:hover {
      background-color: $hover-color;
      cursor: pointer;
    }
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