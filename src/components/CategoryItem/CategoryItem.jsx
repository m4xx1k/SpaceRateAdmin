import {useState} from 'react';
import s from './CategoryItem.module.css'
import success from '../../assets/success.svg'
import deleteIcon from '../../assets/delete.svg'
import {useRemoveMutation, useUpdateMutation} from "../../redux/category/category.api.js";
import {useInput} from "../../utils.js";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectOneCategory} from "../../redux/place/place.slice.js";
import {loadingToast, successToast, errorToast} from "../../utils";

const CategoryItem = ({data}) => {
    const [imageUrl, setImageUrl] = useState(`${import.meta.env.VITE__API}/categories/${data.photo}`)
    const [isNewData, setIsNewData] = useState(false)
    const [image, setImage] = useState(null)
    const [name, changeName] = useInput(data.name)
    const [nameUz, changeNameUz] = useInput(data.translation?.uz?.name || "")
    const [update] = useUpdateMutation()
    const [remove] = useRemoveMutation()
    const handleChangeName = e => {
        setIsNewData(true)
        changeName(e)
    }
    const handleChangeNameUz = e => {
        setIsNewData(true)
        changeNameUz(e)
    }
    const handleImageChange = (e) => {
        setIsNewData(true)
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleChange = async () => {
        let id
        try {
            if (isNewData && !!name) {
                 id =  loadingToast('Сохранение...')
                const formdata = new FormData()
                formdata.append('name', name)
                formdata.append('photo', image)
                formdata.append('translation[uz][name]', nameUz)
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
            await remove({id: data._id})

        } catch (e) {

            console.log(e)
        }
    }
    const dispatch = useDispatch()
    const handleSelectCategory = () => dispatch(selectOneCategory(data._id))
    return (
        <div className={s.container}>
            <div className={s["info"]}>
                {/*<img className={s.photo} src={`https://api.goodjoy.uz/categories/${data.photo}`} alt=""/>*/}
                <label className={s["custom-file-upload"]}>
                    <input className={s.input} onChange={handleImageChange} type="file"
                           accept="image/*"
                           id="photo" name="photo"/>
                    <picture>
                        {/*<source className={s.img} srcSet={imageUrl.split('.')[0] + '.webp'} type="image/webp"/>*/}
                        <img className={s.img} src={imageUrl} alt="+"/>

                    </picture>

                </label>
                <div className={'column'}>
                    <div className={s.inputs}>
                        <div className="column">
                            <label htmlFor="" className="label">RU</label>
                            <input value={name} onChange={handleChangeName} className={s.name}/>

                        </div>
                        <div className="column">
                            <label htmlFor="" className="label">UZ</label>
                            <input value={nameUz} onChange={handleChangeNameUz} className={s.name}/>

                        </div>

                    </div>
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
