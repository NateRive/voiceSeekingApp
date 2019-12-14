<template>
  <ul class="tree">
    <li class="tree-item" v-for="(page, index) in pageData" :key="`${page.name}` + index">
      <HidingIcon type="add" :isFloat="true" top="10px" right="10px">
        <span
          class="tree-item__label"
          :style="{ paddingLeft: treeNest * 40 + 'px' }"
          @click="onClickItemHandler(page, index)"
        >
          <span>{{ page.name }}</span>
          <span v-if="page.isfile">(page)</span>
        </span>
      </HidingIcon>

      <treeComponent
        v-if="page.showChild"
        @pageDetailLoad="$emit('pageDetailLoad', $event)"
        :parentIdTree="computeCurrentParentIdTree(page.id)"
        :datas="page.children"
        :treeNest="treeNest + 1"
        @click="$emit('click', $event)"
      />
    </li>
  </ul>
</template>

<script>
import treeComponent from "../components/treeComponent";
import HidingIcon from "../UIParts/Lv1/HidingIcon";
import modelFactory from "../model/index";
const pageModel = modelFactory.get("page");

export default {
  name: "treeComponent",
  components: {
    HidingIcon,
    treeComponent
  },
  props: {
    datas: {
      type: Array,
      required: true
    },
    treeNest: {
      type: Number,
      required: 0
    },
    parentIdTree: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      pageData: this.datas.concat()
    };
  },
  methods: {
    computeCurrentParentIdTree: function(id) {
      let newArray = this.parentIdTree.concat();
      newArray.push(id);
      return newArray;
    },
    onClickItemHandler: async function(page, index) {
      if (page.isfile) {
        this.$emit("pageDetailLoad", { page: page, idTree: this.parentIdTree });
      } else {
        // 既に子供データを取得できている場合
        if (page.children && page.children.length) {
          if (page.showChild) {
            page.showChild = false;
          } else {
            page.showChild = true;
          }
        } else {
          // 子供データがない場合、子供データをREST APIでの取得
          const res = await pageModel.getByParentId(page.id);
          const newPage = { ...this.pageData[index] };
          newPage.children = res;
          newPage.showChild = true;
          this.$set(this.pageData, index, newPage);
        }
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.tree {
  text-align: left;
  padding: 0;
  margin: 0;
}
.tree-item {
  list-style: none;
  &__label {
    display: inline-block;
    line-height: 50px;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    &:hover {
      background-color: $hover-color;
      cursor: pointer;
      .tree-item-icon {
        display: inline-flex;
      }
    }
  }
}
</style>

<style>
* {
  box-sizing: border-box;
}
</style>