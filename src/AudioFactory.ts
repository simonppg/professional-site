type OscillatorType = 'custom' | 'sawtooth' | 'sine' | 'square' | 'triangle'

export default class AudioFactory {
  private audioContext: AudioContext
  private oscilatorTypes: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth']

  constructor (audioContext: AudioContext) {
    this.audioContext = audioContext
  }

  public swatoothOscillator (frequency: number, detune: number = 0) {
    const osc = this.newOscillator(frequency, detune)
    osc.type = 'sawtooth'
    return osc
  }

  private newOscillator (frequency: number, detune: number) {
    const osc = this.audioContext.createOscillator()
    osc.frequency.value = frequency
    osc.detune.value = detune
    return osc
  }

  public randomOscilator () {
    const oscilator = this.newOscillator(440, 0)
    const randomIndex = this.randomIndex(this.oscilatorTypes)
    oscilator.type = this.oscilatorTypes[randomIndex]
    return oscilator
  }

  private randomIndex (arr: any[]) {
    return Math.floor(Math.random() * arr.length)
  }
}
