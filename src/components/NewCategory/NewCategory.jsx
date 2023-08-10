import React, {useState} from 'react';
import s from './NewCategory.module.css';
import {useCreateMutation} from "../../redux/category/category.api.js";
import success from '../../assets/success.svg'
import upload from '../../assets/upload.svg'
import {useInput} from "../../utils.js";
import {loadingToast, successToast, errorToast} from "../../utils";

const NewCategory = () => {
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [name, onChangeName,resetName] = useInput('')
    const [nameUz, onChangeNameUz,resetNameUz] = useInput('')
    const [createCategory] = useCreateMutation()
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleCreateCategory = async () => {
        let id
        try {
            if(!!image && !!name){
                 id = loadingToast('Создание...')

                let formdata = new FormData()
                formdata.append('photo', image)
                formdata.append('name', name)
                formdata.append('translation[uz][name]', nameUz)
                await createCategory(formdata)
                resetName()
                setImage(null)
                successToast(id)
            }else{
                if(id)errorToast(id)
                alert('fill name & photo')
            }



        } catch (e) {
            console.log(e)
        }
    }
    return (<div className={s.container}>
            <h2 className={s.title}>Новая категория</h2>
            <div className={s.form}>
                <div className={s["form-group"]}>
                    <label className={s["custom-file-upload"]}>
                        <input className={s.input} onChange={handleImageChange} type="file"
                               accept="image/*"
                               id="photo" name="photo"/>
                        {imageUrl ? <img className={s.img} src={imageUrl} alt="+"/> : <div className={s.upload_btn}>
                            <img src={upload} alt="upload"/>
                        </div>}

                    </label>
                </div>
                <input value={name} onChange={onChangeName} placeholder={'RU Название...'} className={s.input} type="text"/>
                <input value={nameUz} onChange={onChangeNameUz} placeholder={'UZ Название...'} className={s.input} type="text"/>
                <button onClick={handleCreateCategory} className={s.btn}>                    <img src={success} alt=""/>
                </button>
            </div>
        </div>

    );
};

export default NewCategory;
