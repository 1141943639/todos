<template>
  <div class="wrapper clear-fix"
       @mouseenter="wrapperMouseEnter"
       @mouseleave="wrapperMouseLeave">
    <div class="complete"
         @click="completeClick">
      <svg class="complete-icon"
           :class="{'show-complete-icon': item.isComplete}">
        <circle r="10"
                cx="20"
                cy="25"
                fill="transparent"
                stroke="rgba(93, 194, 175, 0.3)"
                stroke-width="2px"
                class="complete-icon-circle"></circle>
        <path d="M14,25 l5,5 l6,-10"
              stroke="rgba(93, 194, 175)"
              stroke-width="3px"
              fill="transparent"
              class="complete-icon-inset"></path>
      </svg>
    </div>
    <div class="content"
         @dblclick="inputClick">

      <input class="text"
             :value="item.value"
             @input="inputValue"
             @keydown.enter="inputEnter"
             @blur="inputBlur"
             :class="{'text-focus': isWrite}"
             v-show="isWrite"
             ref="textWrite" />
      <p class="text-read"
         :class="{'text-complete': item.isComplete}"
         v-show="!isWrite">{{item.value}}</p>
      <div class="remove"
           :class="{'show-remove': isHover,'focus-remove': removeFocus }"
           @click="removeClick"
           @mouseenter="removeMouseEnter"
           @mouseleave="removeMouseLeave">
        <svg class="remove-icon">
          <path d="M3,3 L17,17"></path>
          <path d="M17,3 L3,17"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      requere: true,
    },
  },
  data() {
    return {
      id: this.item.id,
      readOnly: true,
      isHover: false,
      removeFocus: false,
      isWrite: false,
    }
  },
  methods: {
    ...mapMutations([
      'addList',
      'removeList',
      'changeList',
      'clearList',
      'changeComplete',
    ]),
    wrapperMouseEnter() {
      this.isHover = true
    },
    wrapperMouseLeave() {
      this.isHover = false
    },

    completeClick() {
      this.changeComplete(this.id)
    },

    inputClick() {
      this.isWrite = true
      this.$nextTick(() => {
        this.$refs.textWrite.focus()
        this.$refs.textWrite.select()
      })
    },
    inputValue({ target }) {
      this.changeList({
        value: target.value,
        id: this.id,
      })
    },
    inputEnter({ target }) {
      target.blur()
    },
    inputBlur({ target }) {
      this.isWrite = false
      window.getSelection().empty()
      if (!target.value.length) {
        this.removeList(this.id)
      }
    },

    removeClick() {
      this.removeList(this.id)
    },
    removeMouseEnter() {
      this.removeFocus = true
    },
    removeMouseLeave() {
      this.removeFocus = false
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.complete {
  float: left;
  width: 40px;
  height: 50px;
  cursor: pointer;
}

.complete-icon {
  width: 100%;
  height: 100%;
}

.show-complete-icon path,
.show-complete-icon circle {
  opacity: 1;
}

.complete-icon-circle {
  opacity: 0;
}

.complete-icon:hover .complete-icon-circle {
  opacity: 1;
}

.complete-icon-inset {
  opacity: 0;
}

.content {
  position: relative;
  width: calc(100% - 40px);
  height: 100%;
  float: left;
}

.text {
  position: relative;
  padding: 10px;
  width: 100%;
  height: 100%;
  font-size: 24px;
  border: none;
}

.text-focus {
  outline: rgba(0, 0, 0, 0.3) solid 1px;
  z-index: 1;
}

.text-complete {
  text-decoration: line-through;
  color: rgba(0, 0, 0, 0.2);
}

.text-read {
  padding: 10px;
  width: 100%;
  height: 100%;
  font-size: 24px;
  word-wrap: break-word;
  transition: color 0.2s;
}

.remove {
  width: 50px;
  height: 50px;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
}

.show-remove {
  opacity: 1;
}

.focus-remove svg {
  opacity: 1;
}

.remove-icon {
  width: 20px;
  height: 20px;
  transition: opacity 0.2s;
  opacity: 0.5;
}

.remove svg path {
  stroke: #af5b5e;
  stroke-width: 3px;
  stroke-linecap: round;
}
</style>
