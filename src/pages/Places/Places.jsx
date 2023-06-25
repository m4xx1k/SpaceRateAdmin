import React, {useEffect} from 'react';
import {useFetchAllPlacesQuery} from "../../redux/place/place.api.js";
import NewPlace from "../../components/NewPlace/NewPlace.jsx";
import PlaceItem from "../../components/PlaceItem/PlaceItem.jsx";

const Places = () => {
    const {data} = useFetchAllPlacesQuery()
    return (
        <div className={'container'}>
            <NewPlace/>
            <ul>
                {
                    data?.map(data => <PlaceItem key={data.place._id} data={data}/>)
                }
            </ul>
        </div>
    );
};

export default Places;
