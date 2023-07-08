import React, {useEffect, useState} from 'react';
import s from './CategoryAdvertisementItem.module.css'
import success from '../../assets/success.svg'
import deleteIcon from '../../assets/delete.svg'
import {
    useFetchAllQuery,
    useRemoveCategoryAdvertisementMutation,
    useRemoveMutation,
    useUpdateCategoryAdvertisementMutation,
    useUpdateMutation
} from "../../redux/category/category.api.js";
import {useInput} from "../../utils.js";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectOneCategory} from "../../redux/place/place.slice.js";
import {loadingToast, successToast, errorToast} from "../../utils";

const CategoryAdvertisementItem = ({data}) => {
    const [photoUrl, setPhotoUrl] = useState(`${import.meta.env.VITE__API}/categories/${data.photo}`)
    const [isNewData, setIsNewData] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [link, changeLink] = useInput(data.link)
    const {data: categories, isSuccess} = useFetchAllQuery()
    
    const [categoryId, changeCategoryId, resetCategoryId, setCategoryId] = useInput(data.categoryId)

    const [update] = useUpdateCategoryAdvertisementMutation()
    const [remove] = useRemoveCategoryAdvertisementMutation()
    const handleChangeLink = e => {
        setIsNewData(true)
        changeLink(e)
    }
    const handleImageChange = (e) => {
        setIsNewData(true)
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
                console.log(categoryId)
                formdata.append('categoryId', categoryId)
                formdata.append('photo', photo)
                await update({id: data._id, body: formdata})
                successToast(id)
            }
        } catch (e) {
            errorToast(id)
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
                {/*<img className={s.photo} src={`https://api.goodjoy.uz/categories/${data.photo}`} alt=""/>*/}
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
                <div className={s["form_group"]}>
                    <select value={categoryId} className={s.input} onChange={changeCategoryId}>
                        {categories?.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
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

export default CategoryAdvertisementItem;
