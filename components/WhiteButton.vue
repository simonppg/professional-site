<template>
  <button class="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100" @click="click">
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    click () {
      this.$emit('clicked')
    }
  }
})
</script>
