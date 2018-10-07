export default class MidiPianoController {

	readonly noteNames: string[] = ["G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"]

	constructor(
		public onKeyPress: (e: MidiKey) => void,
		public onKeyRelease: (e: MidiKey) => void,
		public onKeyTurn: (e: MidiKey) => void
	) {}

	requestAccess() {
		navigator.requestMIDIAccess()
			.then(this.onAccessSuccess.bind(this), this.onAccessFailure)
	}

	private onAccessSuccess(access: WebMidi.MIDIAccess) {
		const firstInput = access.inputs.values().next().value
		if (!firstInput) return
		firstInput.onmidimessage = this.handleMidiMessage.bind(this)
	}

	private handleMidiMessage({ data }: WebMidi.MIDIMessageEvent) {
		const type = data[0]
		const number = data[1]
		const velocity = data[2]
		const key: MidiKey = {
			number,
			velocity: this.getVelocityPercentage(velocity),
			frequency: this.getKeyFrequency(number),
			name: this.getKeyName(number)
		}
		if (type === MidiEventType.press) this.onKeyPress(key)
		else if (type === MidiEventType.release) this.onKeyRelease(key)
		else if (type === MidiEventType.turn) this.onKeyTurn(key)
	}

	// Key to frequency from https://en.wikipedia.org/wiki/Piano_key_frequencies
	private getKeyFrequency(key: number) {
		return 2 ** ((key - 49) / 12) * 440
	}

	// Name + octave from https://en.wikipedia.org/wiki/Piano_key_frequencies
	private getKeyName(key: number) {
		return this.noteNames[key % 12] + Math.trunc(key / 12)
	}

	// Velocity max value is 127. To simplify calculus with the velocity we will set it in a range
	// from 0 to 1
	private getVelocityPercentage(velocity: number) {
		return velocity / 127
	}

	private onAccessFailure() {
		// tslint:disable-next-line:no-console
		console.error("Can't connect to the midi device.")
	}
}

export interface MidiKey {
	number: number
	frequency: number
	velocity: number,
	name: string
}

export enum MidiEventType {
	press = 144,
	release = 128,
	turn = 176
}
