<template>
  <div>
    <todos-item v-for="item in list"
                :key="item.id"
                :item="item" />
  </div>
</template>

<script>
import TodosItem from '@/components/TodosItem.vue'
import { mapState } from 'vuex'

export default {
  created() {
    this.$emit('list', 'list')
  },
  computed: {
    ...mapState(['list']),
  },
  components: {
    TodosItem,
  },
}
</script>

<style scoped>
</style>