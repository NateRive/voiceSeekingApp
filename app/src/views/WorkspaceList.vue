<template>
  <div class="workspace-list">
    <div
      class="workspace-list__item"
      v-for="(workspace, index) in workspaceList"
      :key="workspace + index"
    >
      <router-link :to="`/workspace/${workspace.id}`">{{ workspace.name }}</router-link>
    </div>
  </div>
</template>

<script>
import modelFactory from "../model/index";
const workspaceModel = modelFactory.get("workspace");
export default {
  name: "WorkspaceList",
  data: function() {
    return {
      workspaceList: []
    };
  },
  async created() {
    this.workspaceList = await workspaceModel.get();
  }
};
</script>

<style lang="scss" scoped>
.workspace-list {
  display: flex;
  width: 900px;
  margin: 0 auto;
  &__item {
    border: 1px solid #ededed;
    width: 300px;
    height: 300px;
    padding: 20px;
    text-align: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    a {
      text-decoration: none;
      display: inline-block;
      height: 100%;
      width: 100%;
    }
  }
}
</style>