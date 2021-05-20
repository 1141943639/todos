import Vue from 'vue';
import VueRouter from 'vue-router';

import All from '../views/All.vue';
import Active from '../views/Active.vue';
import Complete from '../views/Complete.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Default',
		component: All,
	},
	{
		path: '/all',
		name: 'All',
		component: All,
		props: true,
	},
	{
		path: '/active',
		name: 'Active',
		component: Active,
		props: true,
	},
	{
		path: '/complete',
		name: 'Complete',
		component: Complete,
		props: true,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
