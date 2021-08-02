import moment from 'moment'
export const strict = false;
export const state = () => ({
    filters: {
        dates: "",
        maxGuests: null,
        address: null,
        price: [0,0],
        stars: ""
    }
})

export const mutations = {
    SET_FILTERS(state, filters) {
        var range = !!filters.dates && !!filters.dates.startDate && !!filters.dates.endDate ? moment(filters.dates.startDate).format('YYYY-MM-DD') + ' - ' + moment(filters.dates.endDate).format('YYYY-MM-DD') : '';
        filters.dates = range;
        state.filters = filters;
    }
}

export const actions = {
    fillFilters({ commit }, { filters }) {
        commit("SET_FILTERS", filters);
    }
}