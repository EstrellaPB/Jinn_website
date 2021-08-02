export const state = () => ({
    all: [],
    popular: [],
    prices: []
})

export const mutations = {
    FETCH_PROPERTIES(state, all) {
        state.all = all
    },
    FETCH_POPULAR(state, popular) {
        state.popular = popular;
    },
    FETCH_PRICES(state, prices) {
        state.prices = prices;
    }
}

export const actions = {
    async fetchProperties({ commit, rootState })  {
        console.log('RootState Filters: ', rootState.filters);
        await this.$axios.get(`${this.$axios.defaults.baseURL}/property`, { params: rootState.filters })
        .then((response) => {
            commit("FETCH_PROPERTIES", response.data.properties);
        })
        .catch((error => {
            console.log('error: ', error)
        }))
    },
    async fetchPopular({ commit }) {
        await this.$axios.get(`${this.$axios.defaults.baseURL}/property?popular=true`)
        .then((response) => {
            commit("FETCH_POPULAR", response.data.properties);
        })
        .catch((error => {
            console.log('error: ', error)
        }))
    },
    async nuxtServerInit ({ commit }, { req }) {
        await this.$axios.get(`${this.$axios.defaults.baseURL}/property/get-prices-range`).then(function (res) {
            commit("FETCH_PRICES", [res.data.priceMin, res.data.priceMax]);
        });
    }
}