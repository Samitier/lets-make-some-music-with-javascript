export default class Oscillator {

	oscillator!: OscillatorNode

	constructor(
		context: AudioContext,
		frequency: number,
		type: OscillatorType = "triangle"
	) {
		this.oscillator = context.createOscillator()
		this.oscillator.type = type
		this.oscillator.connect(context.destination)
		this.oscillator.frequency.value = frequency
	}

	start() {
		this.oscillator.start()
	}

	stop() {
		this.oscillator.stop()
	}
}
