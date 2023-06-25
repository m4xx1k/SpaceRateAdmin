import React, {useState, useRef} from 'react';
import s from './NewPlace.module.css';
import {useInput} from '../../utils.js';
import {useCreatePlaceMutation} from "../../redux/place/place.api.js";
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import upload from '../../assets/upload.svg'
import AdditionalItem from "./AdditionalItem.jsx";

const NewPlace = () => {
    const [name, handleNameChange, resetName] = useInput('');
    const [description, handleDescriptionChange, resetDescription] = useInput('');
    const {data: categories} = useFetchAllQuery()
    const [categoryId, changeCategoryId, resetCategoryId] = useInput('')

    const [images, setImages] = useState([]);
    const fileInput = useRef(null);
    const [create] = useCreatePlaceMutation()
    const [additionalData, setAdditionalData] = useState({})
    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name);
            formData.append('categoryId', categoryId);
            formData.append('description', description);
            console.log(additionalData)
            Object.keys(additionalData).forEach(elem=>{
                console.log(elem, additionalData.elem)
                formData.append(elem,additionalData[elem])
            })
            images.forEach((image) => {
                formData.append(`photos`, image);
            });

            // send request
            const res = await create(formData);
            resetName()
            resetCategoryId()
            resetDescription()
            setAdditionalData({})
        } catch (e) {
            console.error(e)
        }

    };

    const handleImageUpload = event => {
        let imagesArray = [...images];
        for (let i = 0; i < event.target.files.length; i++) {
            if (imagesArray.length >= 8) break; // Restrict to 8 images
            imagesArray.push(event.target.files[i]); // Save the File objects
        }
        setImages(imagesArray);
    };


    const handleImageRemove = index => {
        setImages(images.filter((image, i) => i !== index));
    };


    return (
        <div className={s.container}>
            <div className={s.form}>

                <div className={s.photos}>
                    <input
                        type='file'
                        ref={fileInput}
                        accept='image/*'
                        multiple
                        onChange={handleImageUpload}
                        className={s.fileInput}
                    />
                    <button onClick={() => fileInput.current.click()} className={s.uploadButton}>
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
                        <div className={s.left}>
                            <div className={s["form_group"]}>
                                <label htmlFor="">Название</label>
                                <input value={name} onChange={handleNameChange} type="text" className={s.input}/>
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
                            <label htmlFor="">Описание</label>
                            <textarea value={description} onChange={handleDescriptionChange} className={s.textarea}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.additional}>
                <div className={'row-wrap'}>
                    {
                        ['price', 'changeDate','time', 'location', 'telephone', 'type'].map(elem => <AdditionalItem
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
                        ['site', 'tg','email', 'inst'].map(elem => <AdditionalItem
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

