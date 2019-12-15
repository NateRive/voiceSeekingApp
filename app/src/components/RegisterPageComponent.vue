<template>
  <div>
    <label>
      フォルダ
      <input name="folder" v-model="isFile" type="radio" value="1" />
    </label>
    <label>
      ファイル
      <input type="radio" v-model="isFile" value="0" />
    </label>

    <input type="text" v-model="newName" placeholder="名前入力" />
    <div>
      <button
        style="height: 50px; width: 100px;"
        @click="$emit('submit', {isfile: isFile, name: newName})"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isFile: 0,
      newName: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>