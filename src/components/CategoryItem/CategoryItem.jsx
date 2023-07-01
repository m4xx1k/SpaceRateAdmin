import React, {useState} from 'react';
import s from './CategoryItem.module.css'
import success from '../../assets/success.svg'
import deleteIcon from '../../assets/delete.svg'
import {useRemoveMutation, useUpdateMutation} from "../../redux/category/category.api.js";
import {useInput} from "../../utils.js";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectOneCategory} from "../../redux/place/place.slice.js";

const CategoryItem = ({data}) => {
    const [imageUrl, setImageUrl] = useState(`${import.meta.env.VITE__API}/categories/${data.photo}`)
    const [isNewData, setIsNewData] = useState(false)
    const [image, setImage] = useState(null)
    const [name, changeName] = useInput(data.name)
    const [update] = useUpdateMutation()
    const [remove] = useRemoveMutation()
    const handleChangeName = e => {
        setIsNewData(true)
        changeName(e)
    }
    const handleImageChange = (e) => {
        setIsNewData(true)
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleChange = async () => {
        try {
            if (isNewData && !!name) {
                const formdata = new FormData()
                formdata.append('name', name)
                formdata.append('photo', image)
                await update({id: data._id, body: formdata})
            }
        } catch (e) {
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
    const dispatch = useDispatch()
    const handleSelectCategory = () => dispatch(selectOneCategory(data._id))
    return (
        <div className={s.container}>
            <div className={s["info"]}>
                {/*<img className={s.photo} src={`http://localhost:5001/categories/${data.photo}`} alt=""/>*/}
                <label className={s["custom-file-upload"]}>
                    <input className={s.input} onChange={handleImageChange} type="file"
                           accept="image/*"
                           id="photo" name="photo"/>
                    <img className={s.img} src={imageUrl} alt="+"/>

                </label>
                <div className={'column'}>
                    <input value={name} onChange={handleChangeName} className={s.name}/>
                    <Link onClick={handleSelectCategory} className={s.category} to={'/places'}>Посмотреть места</Link>
                </div>
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
    );
};

export default CategoryItem;
