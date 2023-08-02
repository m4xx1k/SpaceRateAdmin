import React, { useState} from 'react';
import s from '../NewCategoryAdvertisement/NewCategoryAdvertisement.module.css';
import {
    useCreateAdvertisementMutation,

} from "../../redux/advertisement/advertisement.api.js";
import success from '../../assets/success.svg'
import upload from '../../assets/upload.svg'
import {useInput} from "../../utils.js";
import {loadingToast, successToast, errorToast} from "../../utils";

const NewAdvertisement = () => {
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const [link, onChangeLink, resetLink] = useInput('https://')
    const [createAdvertisement] = useCreateAdvertisementMutation()

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleCreateCategoryAdvertisement = async () => {
        let id
        try {
            if (!!image && !!link) {
                id = loadingToast('Создание...')

                let formdata = new FormData()
                formdata.append('photo', image)
                formdata.append('link', link)
                await createAdvertisement(formdata)
                resetLink()

                setImage(null)
                setImageUrl(null)
                successToast(id)
            } else {
                if (id) errorToast(id)
                alert('fill name & photo')
            }


        } catch (e) {
            console.log(e)
        }
    }
    return (<div className={s.container}>
            <h2 className={s.title}>Новый баннер</h2>
            <div className={s.form}>
                <div className={s["form-group"]}>
                    <label className={s["custom-file-upload"]}>
                        <input className={s.input} onChange={handleImageChange} type="file"
                               accept="image/*"
                               id="photo" name="photo"/>
                        {imageUrl ? <img className={s.img} src={imageUrl} alt="+"/> :
                            <div className={s.upload_btn}>
                                <img src={upload} alt="upload"/>
                            </div>}

                    </label>
                </div>
                <div className="row-wrap">
                    <input value={link} onChange={onChangeLink} placeholder={'Ссылка...'} className={s.input}
                           type="text"/>

                    <button onClick={handleCreateCategoryAdvertisement} className={s.btn}>
                        <img src={success} alt=""/>
                    </button>
                </div>

            </div>
        </div>

    );
};

export default NewAdvertisement;
