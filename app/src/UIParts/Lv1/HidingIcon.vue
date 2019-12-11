<template>
  <Icon v-bind="$attrs" class="hiding-icon" @click="$emit('click')" />
</template>


<script>
import Icon from "../Lv1/Icon";
export default {
  name: "HidingIcon",
  components: {
    Icon
  },
  inheritAttrs: false
};
</script>

<style lang="scss" scoped>
.hiding-icon {
  display: none;
}
</style>