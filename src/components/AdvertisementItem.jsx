import React, { useState} from 'react';
import s from './CategoryAdvertisement/CategoryAdvertisementItem.module.css'
import success from '../assets/success.svg'
import deleteIcon from '../assets/delete.svg'
import {
   useRemoveAdvertisementMutation,useUpdateAdvertisementMutation
} from "../redux/advertisement/advertisement.api";
import {useInput} from "../utils.js";
import {loadingToast, successToast, errorToast} from "../utils";

const AdvertisementItem = ({data}) => {
    const [photoUrl, setPhotoUrl] = useState(`${import.meta.env.VITE__API}/categories/${data.photo}`)
    const [photo, setPhoto] = useState(null)
    const [link, changeLink] = useInput(data.link)


    const [update] = useUpdateAdvertisementMutation()
    const [remove] = useRemoveAdvertisementMutation()
    const handleChangeLink = e => {
        changeLink(e)
    }
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPhotoUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleChange = async () => {
        let id
        try {
            if (!!link) {
                const id = loadingToast('Сохранение...')
                const formdata = new FormData()
                formdata.append('link', link)
                formdata.append('photo', photo)
                await update({id: data._id, body: formdata})
                successToast(id)
            }
        } catch (e) {
            if(id) errorToast(id)
            console.log(e)
        }
    }
    const handleDelete = async () => {
        try {
            const r = await remove({id: data._id})
            console.log(r)

        } catch (e) {

            console.log(e)
        }
    }
    return (
        <div className={s.container}>
            <div className={s["info"]}>
                <label className={s["custom-file-upload"]}>
                    <input className={s.input} onChange={handleImageChange} type="file"
                           accept="photo/*"
                           id="photo" name="photo"/>
                    <picture>
                        {/*<source className={s.img} srcSet={photoUrl.split('.')[0] + '.webp'} type="photo/webp"/>*/}
                        <img className={s.img} src={photoUrl} alt="+"/>

                    </picture>

                </label>

            </div>
            <div className="row-wrap">
                <div className={s["form_group"]}>

                    <input value={link} onChange={handleChangeLink} className={s.name}/>
                </div>

                <div className={s.controls}>
                    <button className={s.save} onClick={handleChange}>
                        <img src={success} alt=""/>
                    </button>
                    <button className={s.delete} onClick={handleDelete}>
                        <img src={deleteIcon} alt=""/>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AdvertisementItem;
