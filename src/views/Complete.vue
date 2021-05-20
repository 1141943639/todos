<template>
  <div>
    <todos-item v-for="item in onlyCompleteList"
                :key="item.id"
                :item="item" />
  </div>
</template>

<script>
import TodosItem from '@/components/TodosItem.vue'
import { mapGetters } from 'vuex'

export default {
  created() {
    this.$emit('list', 'onlyCompleteList')
  },
  computed: {
    ...mapGetters(['onlyCompleteList']),
  },
  components: {
    TodosItem,
  },
}
</script>

<style scoped>
</style>