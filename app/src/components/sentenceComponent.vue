<template>
  <div class="sentence-inner">
    <template v-for="(block, index) in formatSentenceData()">
      <div class="sentence-block" :key="`${block.speaker}` + index">
        <div class="sentence-block__speaker">{{ block.speaker }}</div>
        <div class="sentence-block__words">
          <span
            class="sentence-block-word"
            v-for="(wordObject, index) in block.words"
            :key="wordObject.word + index"
            @click="$emit('click', wordObject.starttime)"
          >{{ wordObject.word }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "sentenceComponent",
  components: {},
  props: {
    sentenceData: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      // sentenceFormattedData: []
    };
  },
  updated() {
    console.log("updated");
  },
  methods: {
    formatSentenceData: function() {
      let newSentenceData = [];
      let prevSpeaker;
      this.sentenceData.forEach(wordObject => {
        if (wordObject.speaker_tag !== prevSpeaker) {
          prevSpeaker = wordObject.speaker_tag;
          newSentenceData.push({
            speaker: wordObject.speaker_tag,
            words: [wordObject]
          });
        } else {
          newSentenceData[newSentenceData.length - 1].words.push(wordObject);
        }
      });
      return newSentenceData;
    }
  }
};
</script>

<style scoped lang="scss">
.sentence-inner {
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

.sentence-block {
  display: flex;
  margin-bottom: 40px;
  &__speaker {
    margin-right: 20px;
  }
}

.sentence-block-word {
  &:hover {
    cursor: pointer;
    background-color: rgba(204, 236, 255, 0.3);
  }
}
</style>