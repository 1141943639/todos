<template>
  <div>
    <todos-item v-for="item in onlyActiveList"
                :key="item.id"
                :item="item" />
  </div>
</template>

<script>
import TodosItem from '@/components/TodosItem.vue'
import { mapGetters } from 'vuex'

export default {
  created() {
    this.$emit('list', 'onlyActiveList')
  },
  computed: {
    ...mapGetters(['onlyActiveList']),
  },
  components: {
    TodosItem,
  },
}
</script>

<style scoped>
</style>
