export default class AudioFactory {
  private audioContext: AudioContext

  constructor (audioContext: AudioContext) {
    this.audioContext = audioContext
  }

  public swatoothOscillator (frequency: number, detune: number) {
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
}
