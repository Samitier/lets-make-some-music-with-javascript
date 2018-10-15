import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home.vue"

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/example1",
			name: "example1",
			component: () => import(/* webpackChunkName: "ex1" */ "./views/example1/example1.vue"),
		},
		{
			path: "/example2",
			name: "example2",
			component: () => import(/* webpackChunkName: "ex2" */ "./views/example2/example2.vue"),
		},
		{
			path: "/example3",
			name: "example3",
			component: () => import(/* webpackChunkName: "ex3" */ "./views/example3/example3.vue"),
		},
		{
			path: "/example4",
			name: "example4",
			component: () => import(/* webpackChunkName: "ex4" */ "./views/example4/example4.vue"),
		},
		{
			path: "/example5",
			name: "example5",
			component: () => import(/* webpackChunkName: "ex5" */ "./views/example5/example5.vue"),
		},
		{
			path: "/example6",
			name: "example6",
			component: () => import(/* webpackChunkName: "ex5" */ "./views/example6/example6.vue"),
		},
		{
			path: "/example7",
			name: "example7",
			component: () => import(/* webpackChunkName: "ex5" */ "./views/example7/example7.vue"),
		},
	]
})
