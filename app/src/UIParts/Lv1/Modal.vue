<template>
  <div>
    <div id="overlay" @click="$emit('close')">
      <div id="content" @click.stop :style="{width: width, height: height}">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["width", "height"]
};
</script>

<style lang="scss" scoped>
#overlay {
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 100;
  padding: 1em;
  background: #fff;
  position: relative;
}
</style>