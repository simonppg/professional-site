import { Note } from 'music-core'

type OscillatorType = 'custom' | 'sawtooth' | 'sine' | 'square' | 'triangle'

export default class AudioApp {
  private context: AudioContext | undefined
  private gainNode: GainNode | undefined
  private oscilatorNode: OscillatorNode | undefined
  private oscilatorTypes: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth']
  private pitches = [830, 174]

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
