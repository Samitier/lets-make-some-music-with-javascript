<template>
	<NoteViewer :note="noteNames" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Oscillator from "./oscillator"
import Filter from "./filter"
import MidiPianoController, { MidiKey, MidiEventType } from "./midi-piano-controller"
import NoteViewer from "./note-viewer.vue"

@Component({
	components: { NoteViewer }
})
export default class Example extends Vue {

	context = new AudioContext()
	midiController = new MidiPianoController(
		this.onMidiPress,
		this.onMidiRelease,
		this.onMidiTurn
	)

	filter: Filter = new Filter(this.context)
	pressedKeys: PressedKey[] = []

	private readonly maxPressedKeys = 5

	private readonly maxAttack = 2
	private readonly attackKey = 1
	private attack = 0.3

	private readonly maxRelease = 2
	private readonly releaseKey = 2
	private release = 0.3

	private readonly oscillatorTypeKey = 3
	private oscillatorType: OscillatorType = "triangle"

	private readonly qFilterKey = 5

	private readonly frequencyFilterKey = 6

	get noteNames() { return this.pressedKeys.map(k => k.key.name).join(" + ") || "-" }

	mounted() {
		this.midiController.requestAccess()
	}

	onMidiPress(key: MidiKey) {
		if (this.pressedKeys.length >= this.maxPressedKeys) return
		const oscillator = new Oscillator(
			this.context,
			this.filter,
			key.frequency,
			1 / this.maxPressedKeys,
			this.attack,
			this.release,
			this.oscillatorType
		)
		this.pressedKeys.push({ key, oscillator })
		oscillator.start()
	}

	onMidiRelease(key: MidiKey) {
		const i = this.pressedKeys.findIndex(k => k.key.number === key.number)
		if (i < 0) return
		this.pressedKeys[i].oscillator.stop()
		this.pressedKeys.splice(i, 1)
	}

	onMidiTurn({ velocity, number }: MidiKey) {
		switch (number) {
			case this.attackKey:
				this.attack = this.maxAttack * velocity
				break
			case this.releaseKey:
				this.release = this.maxRelease * velocity
				break
			case this.oscillatorTypeKey:
				this.oscillatorType = this.getOscillatorType(velocity)
				break
			case this.qFilterKey:
				this.filter.setQ(velocity * 12)
				break
			case this.frequencyFilterKey:
				this.filter.setFrequency(velocity * 6000)
				break
		}
	}

	private getOscillatorType(value: number) {
		if (value < 0.25) return "triangle"
		else if (value < 0.5) return "square"
		else if (value < 0.75) return "sine"
		else return "sawtooth"
	}
}

interface PressedKey {
	key: MidiKey
	oscillator: Oscillator
}
</script>

<style scoped lang="stylus">

</style>