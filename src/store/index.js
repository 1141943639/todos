import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let id = 0;

export default new Vuex.Store({
	state: {
		list: [
			{
				value: '1',
				id: ++id,
				isComplete: false,
			},
		],
	},
	mutations: {
		addList(state, value) {
			state.list.push({
				value,
				id: ++id,
				isComplete: false,
			});
		},
		changeList({ list }, { value, id }) {
			const { index } = this.getters.findList(id);
			list[index].value = value;
		},
		removeList({ list }, id) {
			const { index } = this.getters.findList(id);
			list.splice(index, 1);
		},
		clearList(state) {
			state.list = [];
		},

		changeComplete({ list }, id) {
			const { item } = this.getters.findList(id);
			item.isComplete = !item.isComplete;
		},
		setAllComplete({ list }) {
			for (const item of list) {
				if (!item.isComplete) item.isComplete = true;
			}
		},
		cancelAllComplete({ list }) {
			for (const item of list) {
				if (item.isComplete) item.isComplete = false;
			}
		},
	},
	actions: {
		clearComplete({ commit, getters: { onlyCompleteList } }) {
			for (const { id } of onlyCompleteList) {
				commit('removeList', id);
			}
		},
	},
	getters: {
		findList: ({ list }) => (id) => {
			for (const index in list) {
				const item = list[index];
				if (item.id === id) {
					return { item, index };
				}
			}
		},

		hasComplete({ list }) {
			for (const { isComplete } of list) {
				if (isComplete) {
					return true;
				}
			}
			return false;
		},

		hasAllComplete({ list }) {
			for (const { isComplete } of list) {
				if (!isComplete) return false;
			}

			return true;
		},

		onlyActiveList({ list }) {
			return list.filter(({ isComplete }) => !isComplete);
		},
		onlyCompleteList({ list }) {
			return list.filter(({ isComplete }) => isComplete);
		},
	},
	modules: {},
});
