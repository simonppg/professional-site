<template>
  <div>
    <div class="flex p-10">
      <span class="m-auto">
        Audio page
      </span>
    </div>

    <div class="p-10 grid grid-cols-4 gap-4">
      <WhiteButton label="Play" @clicked="play" />
      <WhiteButton label="Stop" @clicked="stop" />
      <WhiteButton label="changeOscilator" @clicked="changeOscilator" />
      <WhiteButton label="changePitch" @clicked="changePitch" />
    </div>

    <div class="p-10 grid gap-4">
      frequency: <span>{{ frequency }}</span>
      <input
        v-model="frequency"
        type="range"
        min="600"
        max="800"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WhiteButton from '@/components/WhiteButton.vue'

export default Vue.extend({
  components: { WhiteButton },
  data () {
    return {
      frequency: 800
    }
  },
  watch: {
    frequency (frequency: number) {
      this.$audioApp.setFrequency(frequency)
    }
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    play () {
      this.$audioApp.play()
    },
    stop () {
      this.$audioApp.stop()
    },
    changeOscilator () {
      this.$audioApp.randomOscilator()
    },
    changePitch () {
      this.$audioApp.randomPitch()
    }
  }
})
</script>
