<template>
  <div class="sentence-words">
    <span
      class="sentence-word"
      v-for="(wordObject, index) in sentenceData"
      :key="wordObject.word + index"
      @click="$emit('click', wordObject.starttime)"
    >{{ wordObject.word }}</span>
  </div>
</template>

<script>
export default {
  name: "sentenceComponent",
  props: {
    sentenceData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.sentence-words {
  text-align: left;
  height: 500px;
  overflow-y: auto;
}
.sentence-word {
  &:hover {
    cursor: pointer;
    background-color: rgba(204, 236, 255, 0.3);
  }
}
</style>