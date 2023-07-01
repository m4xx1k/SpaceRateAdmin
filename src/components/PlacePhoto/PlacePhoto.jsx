import React, {useRef, useState} from 'react';
import s from "../PlaceItem/PlaceItem.module.scss";

const PlacePhoto = ({id, data, changePhoto, i, deletePhoto}) => {

    const fileInput = useRef(null);
    const onChange = (e) => changePhoto(id, e.target.files[0])
    if (!data || !id) return null
    return (
        <div className={s.photo_container}>
            <input
                type='file'
                ref={fileInput}
                accept='image/*'
                multiple
                onChange={onChange}
                className={`${s.imageInput}`}
            />
            <img data-index={i} className={s.photo} src={data.src} alt="" onClick={() => fileInput.current.click()}/>
            <span className={s.photoI}>{i}</span>
            {!!deletePhoto ?
                <span onClick={() => deletePhoto(id)} className={s.deletePhoto}>+</span>


                :

                <></>}
        </div>

    );
};

export default PlacePhoto;
