<template>
    <router-view/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class App extends Vue {}
</script>

<style lang="stylus">
html, body
	width 100%
	height 100%
	overflow hidden
	margin 0
a
	display inline-block
	padding .5em 1em
	margin 1em
	background-color #83c99a
	color white
	border 1px solid darken(#c1c1c1, 20%)
	border-radius 3px
	font-size 13px
	font-weight bold
	cursor pointer
	user-select none
.row
	display flex
</style>
