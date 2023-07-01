import {createSlice} from '@reduxjs/toolkit';


const initialState = { selectedCategories:[] };

const place = createSlice({
    name: 'place',
    initialState,
    reducers: {
        toggleCategories(state, action) {
            const categoryId = action.payload;

            if(state.selectedCategories.includes(categoryId)) {
                state.selectedCategories = state.selectedCategories.filter(category=>category!==categoryId)
            }else{
                state.selectedCategories.push(categoryId)
            }
        },
        selectAllCategories(state){
            state.selectedCategories = []
        },
        selectOneCategory(state,action){
            const id = action.payload
            state.selectedCategories = [id]
        }

    },
});

export const { toggleCategories,selectAllCategories,selectOneCategory } = place.actions;




export default place.reducer;
