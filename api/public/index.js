var drilldown = {
  template: `
  <div class="drilldownSelect">
    <div class="drilldown-pulldown">
      <input
        type="text"
        @input="isShow = true"
        @click="isShow = true"
        placeholder="クリックして閲覧するfolderとfileを選択してください。"
        class="form-search"
      >
    </div>
    <div class="drilldownList" :class="[isShow ? 'show' : '']">
      <div
				class="drilldownList-column"
				v-for="(selectedListItem, windowIndex) in currentTree"
				:key="windowIndex"
			>
        <ul class="drilldownList-list">
          <li
						class="drilldownList-list-item"
						v-for="(data, listIndex) in computeCurrentList(windowIndex)"
						:key="data + listIndex"
            :class="[currentTree[windowIndex + 1] === data.name ? 'selected' : '']"
            @click="onClickLastItem($event, data, windowIndex)"
					>{{ data.name }}</li>
        </ul>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return {
      dataArray: this.shownData.concat(),
      currentTree: [""],
      inputValue: "",
      isShow: false
    };
  },
  props: {
    shownData: {
      type: Array,
      required: true
    }
  },
  methods: {
    computeCurrentList: function(windowIndex) {
      let nextArray = [];
      for (var i = 0; i < windowIndex + 1; i++) {
        var newArray = [];
        if (!i) {
          nextArray = this.dataArray;
        }
        const currentArray = nextArray.concat();
        var selectedName = this.currentTree[i + 1];
        currentArray.map(data => {
          if (data.name === selectedName) {
            nextArray = data.children;
          }
          if (i === windowIndex) {
            let object = {};
            object.isLast = !data.children || !data.children.length;
            object.name = data.name;
            newArray.push(object);
          }
        });
        if (windowIndex) {
          if (!nextArray || !nextArray.length) {
            break;
          }
        }
      }
      return newArray;
    },
    onKeydownInput: function(event) {
      this.isShow = true;
      console.log("aaa")
    },
    onClickLastItem: function(event, data, windowIndex) {
      const treeArray = this.currentTree.concat();
      var finalSearchData;
      var tmp = treeArray.slice(0, windowIndex + 1);
      tmp.push(data.name);
      this.currentTree = tmp;
      if (data.isLast) {
        var tmp2 = tmp.concat();
        tmp2.shift();
        var tmp3 = tmp2.join(" ＞ ");
        this.inputValue = tmp3;
        finalSearchData = tmp2;
        this.isShow = false;
      } else {
        finalSearchData = this.currentTree.concat();
        finalSearchData.shift();
      }
      this.$emit("click", event, data, windowIndex, finalSearchData);
    }
  }
};




























new Vue({
  el: "#app",
  components: {
    drilldown: drilldown
  },
  template: `
    <drilldown
      :shownData="shownData"
    />
  `,
  data: function() {
    return {
      shownData: [
        {
          name: "資料請求1",
          children: [
            {
              name: "資料請求1-1"
            },
            {
              name: "資料請求1-2"
            }
          ]
        },
        {
          name: "資料請求2",
          children: [

          ]
        }
      ]
    };
  },
  created() {
    
  }
});
