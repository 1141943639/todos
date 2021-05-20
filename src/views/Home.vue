<template>
  <div class="wrapper">
    <h1 class="title">Todos</h1>

    <div class="content">
      <div class="content-head clear-fix">
        <div class="selectAll left"
             @click="selectAll">
          <svg class="selectAll-icon"
               :class="{'show-selectAll-icon': hasAllComplete}">
            <path d="M12,23 L20,30 L28,23"
                  stroke="rgb(0,0,0)"
                  stroke-width="3px"
                  fill="transparent"></path>
          </svg>
        </div>
        <input type="text"
               v-model="input"
               @keydown.enter="enter"
               class="input left">
      </div>

      <router-view @list="checkList"></router-view>

      <div class="content-foot">
        <div class="list-length">{{showListLength}} items</div>

        <div class="clear-complete"
             @click="clearIsComplete">Clear complete</div>

        <div class="change-class">
          <div @click="showClassClick($event)"
               v-for="item in showClassList"
               :key="item"
               :data-name="item"
               :class="{'class-active': showClass === item}">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodosItem from '@/components/TodosItem.vue'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      input: '',
      showClass: this.$route.name === 'Default' ? 'All' : this.$route.name,
      showClassList: ['All', 'Active', 'Complete'],
      nowListName: '',
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['addList', 'setAllComplete', 'cancelAllComplete', ,]),
    ...mapActions(['clearComplete']),
    enter() {
      if (!this.input.length) return
      this.addList(this.input)
      this.input = ''
    },

    showClassClick({ target: { dataset } }) {
      this.showClass = dataset.name
    },

    selectAll() {
      if (!this.hasAllComplete) {
        this.setAllComplete()
      } else {
        this.cancelAllComplete()
      }
    },

    clearIsComplete() {
      this.clearComplete()
    },

    checkList(list) {
      this.nowListName = list
    },
    click() {
      log(this.list, this.showList)
    },
  },
  computed: {
    ...mapState(['list']),
    ...mapGetters(['hasAllComplete', 'onlyActiveList', 'onlyCompleteList']),
    listLength() {
      return (list) => {
        if (!list.length) return ''
        return this[list].length
      }
    },
    showListLength() {
      return this.listLength(this.nowListName)
    },
  },
  watch: {
    showClass(value) {
      this.$router.push({
        name: value,
      })
    },
  },
  components: {
    TodosItem,
  },
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  width: 500px;
}

.title {
  font-size: 80px;
  line-height: 120px;
  text-align: center;
  color: #ead7d7;
}

.content {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  background: white;
}

.content-head {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.selectAll {
  width: 40px;
  height: 50px;
  cursor: pointer;
}

.selectAll-icon {
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.selectAll-icon:hover {
  opacity: 0.5;
}

.show-selectAll-icon {
  opacity: 1;
}

.input {
  width: calc(100% - 40px);
  height: 50px;
  padding: 10px;

  font-size: 24px;
  border: none;
}

.content-foot {
  position: relative;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 40px;
}

.list-length {
  position: absolute;
  left: 10px;
}

.change-class {
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
}

.change-class div {
  padding: 0px 5px;
  margin: 0px 5px;
  cursor: pointer;
}

.class-active {
  outline: 1px solid #efd5d5;
}

.clear-complete {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.clear-complete:hover {
  text-decoration: underline;
}
</style>
