export default class MidiPianoController {

	readonly noteNames: string[] = ["G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"]

	constructor(public callback: (e: MidiEvent) => void) {}

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
		const key = data[1]
		const velocity = data[2]
		const event: MidiEvent = {
			type,
			key,
			velocity,
			frequency: this.getFrequency(key),
			noteName: this.getNoteName(key)
		}
		this.callback(event)
	}

	// Key to frequency from https://en.wikipedia.org/wiki/Piano_key_frequencies
	private getFrequency(key: number) {
		return 2 ** ((key - 49) / 12) * 440
	}

	// Name + octave from https://en.wikipedia.org/wiki/Piano_key_frequencies
	private getNoteName(key: number) {
		return this.noteNames[key % 12] + Math.trunc(key / 12)
	}

	private onAccessFailure() {
		// tslint:disable-next-line:no-console
		console.error("Can't connect to the midi device.")
	}
}

export interface MidiEvent {
	type: MidiEventType
	key: number
	frequency: number
	velocity: number,
	noteName: string
}

export enum MidiEventType {
	press = 144,
	release = 128,
	turn = 176
}
