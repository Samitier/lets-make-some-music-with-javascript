<template>
	<NoteViewer :note="noteNames" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Oscillator from "./oscillator"
import MidiPianoController, { MidiKey, MidiEventType } from "./midi-piano-controller"
import NoteViewer from "./note-viewer.vue"

@Component({
	components: { NoteViewer }
})
export default class Example extends Vue {

	context = new AudioContext()
	midiController = new MidiPianoController(this.onMidiPress, this.onMidiRelease)

	pressedKeys: PressedKey[] = []

	private readonly maxPressedKeys = 5

	get noteNames() { return this.pressedKeys.map(k => k.key.name).join(" + ") || "-" }

	mounted() {
		this.midiController.requestAccess()
	}

	onMidiPress(key: MidiKey) {
		if (this.pressedKeys.length >= this.maxPressedKeys) return
		const oscillator = new Oscillator(this.context, key.frequency, 1 / this.maxPressedKeys)
		this.pressedKeys.push({ key, oscillator })
		oscillator.start()
	}

	onMidiRelease(key: MidiKey) {
		const i = this.pressedKeys.findIndex(k => k.key.number === key.number)
		if (i < 0) return
		this.pressedKeys[i].oscillator.stop()
		this.pressedKeys.splice(i, 1)
	}
}

interface PressedKey {
	key: MidiKey
	oscillator: Oscillator
}
</script>

<style scoped lang="stylus">

</style>