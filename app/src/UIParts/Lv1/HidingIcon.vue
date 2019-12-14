<template>
  <div class="hiding-icon-wrapper">
    <slot></slot>
    <Icon
      class="hiding-icon"
      v-bind="$attrs"
      :style="{top: top, bottom: bottom, left: left, right: right}"
      @click="$emit('click')"
    />
  </div>
</template>


<script>
import Icon from "../Lv1/Icon";
export default {
  name: "HidingIcon",
  components: {
    Icon
  },
  props: {
    right: {
      type: String,
      default: "",
      required: false
    },
    top: {
      type: String,
      default: "",
      required: false
    },
    bottom: {
      type: String,
      default: "",
      required: false
    },
    left: {
      type: String,
      default: "",
      required: false
    }
  },
  inheritAttrs: false
};
</script>

<style lang="scss" scoped>
.hiding-icon-wrapper {
  position: relative;
  &:hover {
    .hiding-icon {
      display: inline-flex;
    }
  }
}
.hiding-icon {
  display: none;
}
</style>