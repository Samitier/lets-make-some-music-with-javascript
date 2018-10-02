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

	get noteNames() { return this.pressedKeys.map(k => k.key.name).join(" + ") || "-" }

	mounted() {
		this.midiController.requestAccess()
	}

	onMidiPress(key: MidiKey) {
		const oscillator = new Oscillator(this.context, key.frequency)
		oscillator.start()
		this.pressedKeys.push({ key, oscillator })
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