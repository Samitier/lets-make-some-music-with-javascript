export default class Oscillator {

	oscillator!: OscillatorNode
	gainNode!: GainNode

	attack: number = 0.3
	release: number = 0.3

	constructor(
		private context: AudioContext,
		frequency: number,
		private gainAmount: number = 1,
		type: OscillatorType = "sine",
	) {
		this.oscillator = context.createOscillator()
		this.oscillator.type = type
		this.gainNode = context.createGain()
		this.oscillator.connect(this.gainNode)
		this.gainNode.connect(context.destination)
		this.oscillator.frequency.value = frequency
	}

	start() {
		this.gainNode.gain.value = 0
		this.gainNode.gain.linearRampToValueAtTime(this.gainAmount, this.context.currentTime + this.attack)
		this.oscillator.start()
	}

	stop() {
		this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + this.release)
		this.oscillator.stop(this.context.currentTime + this.release)
	}

	setGain(gain: number) {
		this.gainNode.gain.value = gain
	}
}
