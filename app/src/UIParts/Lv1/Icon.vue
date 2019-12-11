<template>
  <i
    class="material-icons icon"
    :class="[isFloat ? 'icon--float' : '']"
    @click="$emit('click')"
  >{{ type }}</i>
</template>


<script>
export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true
    },
    isFloat: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
  border: 1px solid #ededed;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  &--float {
    position: absolute;
  }
}
</style>