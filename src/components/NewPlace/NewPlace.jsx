import React, {useState, useRef, useEffect} from 'react';
import s from './NewPlace.module.css';
import {useInput} from '../../utils.js';
import {useCreatePlaceMutation} from "../../redux/place/place.api.js";
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import upload from '../../assets/upload.svg'
import AdditionalItem from "./AdditionalItem.jsx";
import {loadingToast, successToast, errorToast} from "../../utils";

const VITE__API = import.meta.env.VITE__API

const NewPlace = () => {
    const [name, handleNameChange, resetName] = useInput('');
    const [nameUz, handleNameChangeUz, resetNameUz] = useInput('');
    const [description, handleDescriptionChange, resetDescription] = useInput('');
    const [descriptionUz, handleDescriptionChangeUz, resetDescriptionUz] = useInput('');
    const [categoryId, changeCategoryId, resetCategoryId, setCategoryId] = useInput('')
    const [images, setImages] = useState([]);
    const [additionalData, setAdditionalData] = useState({})

    const {data: categories, isSuccess} = useFetchAllQuery()
    const imageInput = useRef(null);
    const [create] = useCreatePlaceMutation()

    const handleImageRemove = index => {
        setImages(images.filter((image, i) => i !== index));
    };
    const handleImageUpload = event => {
        let imagesArray = [...images];
        for (let i = 0; i < event.target.files.length; i++) {
            if (imagesArray.length >= 8) break; // Restrict to 8 images
            imagesArray.push(event.target.files[i]); // Save the File objects
        }
        setImages(imagesArray);
    };

    const handleSubmit = async () => {
        let id
        try {
            id = loadingToast('Создание...')
            const formData = new FormData()
            formData.append('name', name);
            formData.append('translation[uz][name]', nameUz)
            formData.append('description', description);
            formData.append('translation[uz][description]', descriptionUz)
            formData.append('categoryId', categoryId);
            Object.keys(additionalData).forEach(elem => {
                formData.append(elem, JSON.stringify(additionalData[elem]))
            })
            images.forEach((image) => {
                formData.append(`photos`, image);
            });

            // send request
            await create(formData);
            resetName()
            resetDescription()
            setAdditionalData({})
            successToast(id)
            // window.location.reload()
        } catch (e) {
            errorToast(id)
            console.error(e)
        }

    };

    useEffect(() => {
        if (isSuccess && categories?.length) {
            setCategoryId(categories[0]._id)
        }
    }, [categories, isSuccess])

    return (
        <div className={s.container}>
            <div className={s.form}>

                <div className={s.photos}>
                    <input
                        type='file'
                        ref={imageInput}
                        accept='image/*'
                        multiple
                        onChange={handleImageUpload}
                        className={s.imageInput}
                    />
                    <button onClick={() => imageInput.current.click()} className={s.uploadButton}>
                        <img src={upload} alt=""/>
                    </button>
                    <div className={s.imagesContainer}>
                        {images.map((image, index) => (
                            <div className={s.imageWrapper} key={index}>
                                <img src={URL.createObjectURL(image)} alt=''/>
                                <button className={s.removeButton} onClick={() => handleImageRemove(index)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.text_info}>
                    <div className={s.main}>
                        <div className={s.main_top}>
                            <div className={s["form_group"]}>
                                <label htmlFor="">RU Название</label>
                                <input value={name} onChange={handleNameChange} type="text" className={s.input}/>
                            </div>
                            <div className={s["form_group"]}>
                                <label htmlFor="">UZ Название</label>
                                <input value={nameUz} onChange={handleNameChangeUz} type="text" className={s.input}/>
                            </div>
                            <div className={s["form_group"]}>
                                <label htmlFor="">Категория</label>
                                <select value={categoryId} className={s.input} onChange={changeCategoryId}>
                                    {categories?.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={`${s["form_group-desc"]}`}>
                            <label htmlFor="">RU Описание</label>
                            <textarea value={description} onChange={handleDescriptionChange} className={s.textarea}/>
                        </div>
                        <div className={`${s["form_group-desc"]}`}>
                            <label htmlFor="">UZ Описание</label>
                            <textarea value={descriptionUz} onChange={handleDescriptionChangeUz}
                                      className={s.textarea}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.additional}>
                <div className={'row-wrap'}>
                    {
                        ['price', 'time', 'location', 'telephone', 'type', 'site', 'yandex_maps', 'google_maps'].map(elem =>
                            <AdditionalItem
                                name={elem} handleChange={setAdditionalData} key={elem}/>)
                    }
                    {/* '   <div className={s["form_group"]}>*/}
                    {/*        <label htmlFor="">Цена</label>*/}
                    {/*        <input value={price} onChange={changePrice} type="text" className={s.input}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s["form_group"]}>*/}
                    {/*        <label htmlFor="">Адрес</label>*/}
                    {/*        <input value={location} onChange={changeLocation} type="text" className={s.input}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s["form_group"]}>*/}
                    {/*        <label htmlFor="">Время</label>*/}
                    {/*        <input value={date} onChange={changeDate} type="text" className={s.input}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s["form_group"]}>*/}
                    {/*        <label htmlFor="">Сайт</label></div>*/}
                    {/*    <div className={s["form_group"]}>*/}
                    {/*        <label htmlFor="">Телефон</label>*/}
                    {/*        <input value={telephone} onChange={changeTelephone} type="text" className={s.input}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s["form_group"]}>*/}
                    {/*        <label htmlFor="">Тип</label>*/}
                    {/*        <input value={type} onChange={changeType} type="text" className={s.input}/>*/}
                    {/*    </div>*/}
                </div>
                <div className="row-wrap">
                    {
                        ['fb', 'tg', 'email', 'inst'].map(elem => <AdditionalItem
                            name={elem} key={elem} handleChange={setAdditionalData}/>)
                    }
                    {/*<div className={s["form_group"]}>*/}
                    {/*    <label htmlFor="">Почта</label>*/}
                    {/*    <input value={email} onChange={changeEmail} type="text" className={s.input}/>*/}
                    {/*</div>*/}
                    {/*<div className={s["form_group"]}>*/}
                    {/*    <label htmlFor="">Телеграм</label>*/}
                    {/*    <input value={tg} onChange={changeTg} type="text" className={s.input}/>*/}
                    {/*</div>*/}
                    {/*<div className={s["form_group"]}>*/}
                    {/*    <label htmlFor="">Фейсбук</label>*/}
                    {/*    <input value={fb} onChange={changeFb} type="text" className={s.input}/>*/}
                    {/*</div>*/}
                    {/*<div className={s["form_group"]}>*/}
                    {/*    <label htmlFor="">Инстаграм</label>*/}
                    {/*    <input value={inst} onChange={changeInst} type="text" className={s.input}/>*/}
                    {/*</div>*/}
                </div>
            </div>
            <button onClick={handleSubmit} type='submit' className={s.submitButton}>Создать</button>

        </div>

    );
};
export default NewPlace

