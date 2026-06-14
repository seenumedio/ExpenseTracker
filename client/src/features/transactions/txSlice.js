import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    txs: [],
    loading: false,
    filters: {
        search: '',
        type: 'all',
        recurring: 'all',
        startDate: '',
        endDate: '',
    },
}

export const txSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            };
        },
        setTxs: (state, action) => {
            state.txs = action.payload.map(tx => {
                const { _id, ...rest } = tx
                return { ...rest, id: _id, rawDate: tx.date, date: new Date(tx.date).toLocaleDateString('en-GB') }
            })
        },
        addTx: (state, action) => {
            const { date, _id } = action.payload
            const newTx = {
                ...action.payload,
                id: _id,
                rawDate: date,
                date: new Date(date).toLocaleDateString('en-GB'),
            }
            state.txs.push(newTx)
        },
        removeTx: (state, action) => {
            const id = action.payload
            state.txs = state.txs.filter(x => String(x.id) !== String(id))
        },
        updateTx: (state, action) => {
            const { date, _id } = action.payload
            const newTx = {
                ...action.payload,
                id: _id,
                rawDate: date,
                date: new Date(date).toLocaleDateString('en-GB'),
            }
            state.txs = state.txs.map(x => String(x.id) === String(newTx.id) ? newTx : x)
        }
    }
})

export const { setLoading, setFilters, setTxs, addTx, removeTx, updateTx } = txSlice.actions
export default txSlice.reducer