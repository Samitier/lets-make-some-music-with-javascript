<template>
	<div class="sound-viewer row" :style="cssStyle">
		<img :class="cssClass" src="/img/banana.gif">
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import randomcolor from "randomcolor"

@Component
export default class SoundViewer extends Vue {

	get cssStyle() { return { backgroundColor: this.color } }
	get cssClass() { return this.isVisible && "visible" }

	private isVisible = false
	private color = randomcolor()
	private timeout!: number

	show() {
		if (this.timeout) clearTimeout(this.timeout)
		this.isVisible = true
		this.color = randomcolor()
		this.timeout = setTimeout(() => this.isVisible = false, 400)
	}
}
</script>

<style scoped lang="stylus">
.sound-viewer
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
	>*
		opacity 0
		transition opacity 0.3s
.visible
	opacity 1
</style>