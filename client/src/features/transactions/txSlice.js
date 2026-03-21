import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    txs: [],
    loading: false
}

export const txSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setLoading: (state, action) =>{
            state.loading = action.payload
        },
        setTxs: (state, action) => {
            state.txs = action.payload.map(tx => {
                const { _id, ...rest } = tx
                return { ...rest, id: _id }
            })
        },
        addTx: (state, action) => {
            const newTx = { ...action.payload }
            state.txs.push(newTx)
        },
        removeTx: (state, action) => {
            const id = action.payload
            state.txs = state.txs.filter(x => String(x.id) !== String(id))
        },
        updateTx: (state, action) => {
            const newTx = action.payload
            state.txs = state.txs.map(x => String(x.id) === String(newTx.id) ? newTx : x)
        }
    }
})

export const { setLoading, setTxs, addTx, removeTx, updateTx } = txSlice.actions
export default txSlice.reducer