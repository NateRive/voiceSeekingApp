<template>
  <ul class="tree">
    <li class="tree-item" v-for="(row, index) in datas" :key="`${row.name}` + index">
      <span
        class="tree-item__label"
        :style="{ paddingLeft: treeNest * 40 + 'px' }"
        @click="$emit('click', {row: row, idTree: parentIdTree})"
      >
        <span>{{ row.name }}</span>
        <span v-if="row.isfile">(音声)</span>
      </span>
      <treeComponent
        v-if="row.children"
        :parentIdTree="computeCurrentParentIdTree(row.id)"
        :datas="row.children"
        :treeNest="treeNest + 1"
        @click="$emit('click', $event)"
      />
    </li>
  </ul>
</template>

<script>
import treeComponent from "../components/treeComponent";

export default {
  name: "treeComponent",
  components: {
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
    return {};
  },
  methods: {
    computeCurrentParentIdTree: function(id) {
      let newArray = this.parentIdTree.concat();
      newArray.push(id);
      return newArray;
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
      background-color: rgba(204, 236, 255, 0.3);
      cursor: pointer;
    }
  }
}
</style>

<style>
* {
  box-sizing: border-box;
}
</style>