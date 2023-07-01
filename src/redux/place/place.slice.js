import {createSlice} from '@reduxjs/toolkit';


const initialState = { selectedCategories:[], selectedPlaces:[] };

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
        },
        togglePlaces(state, action) {
            const placeId = action.payload;

            if(state.selectedPlaces.includes(placeId)) {
                state.selectedPlaces = state.selectedPlaces.filter(place=>place!==placeId)
            }else{
                state.selectedPlaces.push(placeId)
            }
        },
        selectAllPlaces(state){
            state.selectedPlaces = []
        },
        selectOnePlace(state,action){
            const id = action.payload
            state.selectedPlaces = [id]
        }

    },
});

export const { toggleCategories,selectAllCategories,selectOneCategory,
    togglePlaces,selectAllPlaces,selectOnePlace} = place.actions;




export default place.reducer;
