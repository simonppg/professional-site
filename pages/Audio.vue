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
      <WhiteButton label="C Mayor scale" @clicked="playCMayorScale" />
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
    <div class="p-10 grid gap-4">
      <span>Notes:</span>
      frequency: <span>{{ note }}</span>
      <div v-for="item in notes" :key="item">
        <input v-model="note" type="radio" label="item" :value="item">
        <label for="html">{{ item }}</label><br>
      </div>
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
      note: 'A4',
      frequency: 440.00,
      notes: [
        'C4',
        'G4',
        'A4',
        'E4',
        'F4'
      ]
    }
  },
  watch: {
    frequency (frequency: number) {
      this.$audioApp.setFrequency(frequency)
    },
    note (note: string) {
      this.$audioApp.setNote(note)
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
    },
    playCMayorScale () {
      this.$audioApp.playCMayorScale()
    }
  }
})
</script>
