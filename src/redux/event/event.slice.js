import {createSlice} from '@reduxjs/toolkit';


const initialState = { selectedEventTypes:[], selectedPlaces:[] };

const event = createSlice({
    name: 'event',
    initialState,
    reducers: {
        toggleEventTypes(state, action) {
            const typeId = action.payload;

            if(state.selectedEventTypes.includes(typeId)) {
                state.selectedEventTypes = state.selectedEventTypes.filter(type=>type!==typeId)
            }else{
                state.selectedEventTypes.push(typeId)
            }
        },
        selectAllEventTypes(state){
            state.selectedEventTypes = []
        },
        togglePlaces(state, action) {
            const eventId = action.payload;

            if(state.selectedPlaces.includes(eventId)) {
                state.selectedPlaces = state.selectedPlaces.filter(event=>event!==eventId)
            }else{
                state.selectedPlaces.push(eventId)
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

export const { toggleEventTypes,selectAllEventTypes} = event.actions;




export default event.reducer;
