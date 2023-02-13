import { Note } from 'music-core'

type OscillatorType = 'custom' | 'sawtooth' | 'sine' | 'square' | 'triangle'

export default class AudioApp {
  private context: AudioContext | undefined
  private gainNode: GainNode | undefined
  private oscilatorNode: OscillatorNode | undefined
  private oscilatorTypes: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth']
  private pitches = [830, 174]
  private STAGE_MAX_TIME = 1
  private ADSR = { attack: 0.9, decay: 10, sustain: 10, release: 0.9 }
  // private ADSR = { attack: 0.2, decay: 0, sustain: 1, release: 0.3 }

  playExample () {
    this.context = new AudioContext()
    this.gainNode = this.context.createGain()
    // this.context = new AudioContext()
    // if (!this.context) { throw new Error('Not supported :(') }
    this.gainNode.connect(this.context.destination)

    // this.basicExample()
    // this.thickerTone()
    this.onOffNote()
  }

  private onOffNote () {
    this.noteOn(440)
    this.noteOff()
  }

  private thickerTone () {
    if (typeof this.context === 'undefined') { return }

    const oscList = new Array(3)
    const frequency = 440
    const unisonWidth = 10
    oscList[0] = this.newOscillator(frequency, 0)
    oscList[1] = this.newOscillator(frequency, -unisonWidth)
    oscList[2] = this.newOscillator(frequency, unisonWidth)

    oscList[0].stop(this.context.currentTime + 2)
    oscList[1].stop(this.context.currentTime + 2)
    oscList[2].stop(this.context.currentTime + 2)
  }

  private basicExample () {
    if (typeof this.context === 'undefined') { return }

    const osc = this.context.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = 440
    osc.connect(this.context.destination)
    osc.start()
    osc.stop(this.context.currentTime + 2)
  }

  private newOscillator (frequency : number, detune: number): OscillatorNode {
    if (typeof this.context === 'undefined') { throw new TypeError('No AudioContext') }

    const osc = this.context.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = frequency
    osc.detune.value = detune
    osc.start()
    return osc
  }

  private noteOn (frequency: number) {
    if (typeof this.context === 'undefined') { return }
    if (typeof this.gainNode === 'undefined') { return }

    this.gainNode?.gain.cancelScheduledValues(this.context?.currentTime)
    const osc = this.newOscillator(frequency, 0)
    osc.connect(this.gainNode)

    const now = this.context.currentTime
    const attackDuration = this.ADSR.attack * this.STAGE_MAX_TIME
    const attackEndTime = now + attackDuration
    const decayDuration = this.ADSR.decay * this.STAGE_MAX_TIME

    this.gainNode?.gain.setValueAtTime(0, this.context?.currentTime)
    this.gainNode?.gain.linearRampToValueAtTime(1, attackEndTime)
    this.gainNode?.gain.setTargetAtTime(this.ADSR.sustain, attackEndTime, decayDuration)
  }

  private noteOff () {
    if (typeof this.context === 'undefined') { return }

    this.gainNode?.gain.cancelScheduledValues(this.context?.currentTime)

    const now = this.context?.currentTime
    const releaseDuration = this.ADSR.release * this.STAGE_MAX_TIME
    const releaseEndTime = now + releaseDuration
    this.gainNode?.gain.setValueAtTime(this.gainNode.gain.value, now)
    this.gainNode?.gain.linearRampToValueAtTime(0, releaseEndTime)
  }

  play () {
    this.context = new AudioContext()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.context.destination)
    this.oscilatorNode = this.context.createOscillator()
    this.oscilatorNode.type = 'triangle'
    this.oscilatorNode.connect(this.gainNode)
    this.oscilatorNode.start(0)
  }

  randomOscilator () {
    if (!this.oscilatorNode) { return }

    const randomIndex = this.randomIndex(this.oscilatorTypes)
    this.oscilatorNode.type = this.oscilatorTypes[randomIndex]
  }

  private randomIndex (arr: any[]) {
    return Math.floor(Math.random() * arr.length)
  }

  setFrequency (frequency: number) {
    if (!this.oscilatorNode) { return }

    this.oscilatorNode.frequency.value = frequency
  }

  setNote (noteName: string) {
    const note = new Note(noteName)
    console.log(note.sciName())
    console.log(note.frequency())
    this.setFrequency(parseFloat(note.frequency()))
  }

  playCMayorScale () {
    const INTERVAL = 1000
    const notes = [
      'C4',
      'D4',
      'E4',
      'F4',
      'G4',
      'A4',
      'B4',
      'C5',
      'B4',
      'A4',
      'G4',
      'F4',
      'E4',
      'D4',
      'C4',
      'stop'
    ]

    this.play()

    notes.forEach((item, index) => {
      setTimeout(() => {
        if (item === 'stop') { this.stop() } else { this.setNote(item) }
      }, INTERVAL * index)
    })
  }

  randomPitch () {
    if (!this.oscilatorNode) { return }

    const randomIndex = this.randomIndex(this.pitches)
    this.oscilatorNode.frequency.value = this.pitches[randomIndex]
  }

  private stopOcilator () {
    if (!this.oscilatorNode) { return }

    this.oscilatorNode.stop()
  }

  stop () {
    this.stopOcilator()
  }
}