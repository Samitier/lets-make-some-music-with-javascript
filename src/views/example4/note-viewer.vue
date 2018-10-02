<template>
	<div class="note-viewer row" :style="cssStyle">
		<div>{{ note }}</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import randomcolor from "randomcolor"
import invert from "invert-color"

@Component
export default class NoteViewer extends Vue {

	@Prop() note!: string

	get cssStyle() {
		const backgroundColor = randomcolor({ seed: this.note })
		const color = invert(backgroundColor, true)
		return {
			backgroundColor,
			color
		}
	}
}
</script>

<style scoped lang="stylus">
.note-viewer
	top 0
	bottom 0
	left 0
	right 0
	position fixed
	text-align center
	font-size 180px
	font-weight bold
	transition all .3s
	display flex
	align-items center
	justify-content center
	>div
		opacity 0.6
</style>