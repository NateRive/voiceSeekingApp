<template>
  <div class="page">
    <div @click.capture.prevent.stop="$router.go(-1)">
      <a href>戻る</a>
    </div>
    <div class="top-area">
      <div class="sidebar">
        <div class="sidebar-group" v-for="(group, groupIndex) in shownData" :key="groupKey(group)">
          <ModalComponent v-if="showRegisterModal === group.id" @close="showRegisterModal = -1">
            <RegisterPageComponent
              @submit="onSubmitCreatePageHandler($event, group.id, groupIndex)"
            />
          </ModalComponent>
          <HidingIcon
            @click="onClickPageAddHandler(group.id)"
            type="add"
            :isFloat="true"
            right="10px"
            top="10px"
          >
            <div class="sidebar-group__name">{{ group.name }}</div>
          </HidingIcon>

          <div class="sidebar-column">
            <treeComponent
              v-if="group.page && group.page.length"
              :groupId="group.id"
              :datas="group.page"
              @pageDetailLoad="onPageDetailLoad($event, group)"
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
import Vue from "vue";
import { mapMutations } from "vuex";
import * as types from "../store/types";
import ModalComponent from "../UIParts/Lv1/Modal";
import RegisterPageComponent from "../components/RegisterPageComponent";
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
    treeComponent,
    ModalComponent,
    RegisterPageComponent
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
      showRegisterModal: -1,
      isShow: false,
      isFile: 0,
      newName: "",
      shownData: [{}, {}]
    };
  },
  props: {},
  async created() {
    this.shownData = await workspaceModel.getById(
      this.$route.params.workspaceId
    );
  },
  updated() {
    console.log("workspace updated");
  },
  methods: {
    groupKey: function(group) {
      if (group.page) {
        return group.id + group.name + group.page.length;
      } else {
        group.id + group.name;
      }
    },
    onSubmitCreatePageHandler: async function(event, groupId, groupIndex) {
      const payload = {
        isFile: event.isfile,
        name: event.name,
        group_id: groupId,
        parent_id: null
      };
      const res = await pageModel.createPage(payload);
      console.log("res", res);
      let temp = JSON.parse(JSON.stringify(this.shownData));
      temp[groupIndex].page.unshift(res);
      this.shownData = temp;
    },
    onClickPageAddHandler: function(groupId) {
      this.showRegisterModal = groupId;
    },
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
.sidebar-group {
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