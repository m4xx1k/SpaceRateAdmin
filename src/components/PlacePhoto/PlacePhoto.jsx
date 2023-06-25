import React, {useRef, useState} from 'react';
import s from "../PlaceItem/PlaceItem.module.css";

const PlacePhoto = ({id,data, changePhoto,i}) => {

    const fileInput = useRef(null);
    const onChange = (e)=>changePhoto(id, e.target.files[0])
    if(!data || !id )return null
    return (
        <div className={s.photo_container}>
            <input
                type='file'
                ref={fileInput}
                accept='image/*'
                multiple
                onChange={onChange}
                className={s.fileInput}
            />
            <img data-index={i} className={s.photo} src={data.src} alt="" onClick={() => fileInput.current.click()} />
            <span className={s.photoI}>{i}</span>
        </div>

    );
};

export default PlacePhoto;
