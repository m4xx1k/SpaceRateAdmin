import s from './EventCreate.module.css'
import {useCreateFullEventMutation, useFindAllEventTypesQuery} from "../../redux/event/event.api.js";
import React, {useEffect, useRef, useState} from "react";
import {
    errorToast, formatDates, infosHasDuplicates, isValidDates, loadingToast, successToast, useInput
} from "../../utils.js";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import Infos from "./Infos.jsx";


const EventCreate = () => {
    const {data: types, isSuccess} = useFindAllEventTypesQuery()

    const [name, handleNameChange, resetName] = useInput('');
    const [nameUz, handleNameChangeUz, resetNameUz] = useInput('');
    const [description, handleDescriptionChange, resetDescription] = useInput('');
    const [descriptionUz, handleDescriptionChangeUz, resetDescriptionUz] = useInput('');
    const [typeId, changeTypeId, resetTypeId, setTypeId] = useInput('')
    const [selectedDates, setSelectedDates] = useState([]);
    const [datesError, setDatesError] = useState('')
    const [error, setError] = useState('')
    const [infos, setInfos] = useState([])
    const [infosError, setInfosError] = useState('')
    const [create] = useCreateFullEventMutation()


    const [images, setImages] = useState([]);

    const imageInput = useRef(null);

    const handleImageRemove = index => {
        setImages(images.filter((_, i) => i !== index));
    };
    const handleImageUpload = event => {
        let imagesArray = [...images];
        for (let i = 0; i < event.target.files.length; i++) {
            if (imagesArray.length >= 8) break; // Restrict to 8 images
            imagesArray.push(event.target.files[i]); // Save the File objects
        }
        setImages(imagesArray);
    };
    const handleCreateEvent = async () => {
        let id
        const isDatesError = isValidDates(formatDates(selectedDates))
        const isInfosError = infosHasDuplicates(infos)
        if (isDatesError) {
            setDatesError('Ошибка, не может быть одинаковых дат')
        } else {
            setDatesError('')
        }
        if (isInfosError) {
            setInfosError('Ошибка, не может быть одинаковых и/или пустых названий')
        } else {
            setInfosError('')
        }
        if (!name || !description) {
            setError('Ошибка, описание и название не могут быть пустыми')
        } else {
            setError('')
        }
        // if(isDatesError )
        if (isDatesError || isInfosError || !name || !description) {
            return
        }
        try {
            id = loadingToast('Создание...')
            const formData = new FormData()
            const dates = JSON.stringify(formatDates(selectedDates).map(date => ({
                ...date,
                times: [...new Set(date.times)]
            })))
            formData.append('name', name);
            formData.append('translation[uz][name]', nameUz)
            formData.append('description', description);
            formData.append('translation[uz][description]', descriptionUz)
            formData.append('dates',dates)
            formData.append('type', typeId);
            formData.append('infos', JSON.stringify({infos}))
            images.forEach((image) => {
                formData.append(`photos`, image);

            });

            // send request
            const res = await create(formData);
            console.log({res})
            resetName()
            resetDescription()
            successToast(id)
            // window.location.reload()
        } catch (e) {
            errorToast(id)
            console.error(e)
        }


    };
    useEffect(() => {
        if (isSuccess && types?.length) {
            setTypeId(types[0]._id)
        }
    }, [types, isSuccess])
    return (<div className={'container'}>
        <h2 className="title">Создать Событие</h2>
        <div className={s.main}>
            <div className={s.top}>
                <div className="column">
                    <label htmlFor="" className="label">RU Название</label>
                    <input value={name} onChange={handleNameChange} className={s["name"]}/>
                </div>
                <div className="column">
                    <label htmlFor="" className="label">UZ Название</label>
                    <input value={nameUz} onChange={handleNameChangeUz} className={s["name"]}/>
                </div>

                <div className={s["form_group"]}>
                    <label htmlFor="">Тип</label>
                    <select value={typeId} className={s.input} onChange={changeTypeId}>
                        {types?.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                    </select>
                </div>
            </div>
            <div className={`${s["form_group-desc"]}`}>
                <label htmlFor="">RU Описание</label>
                <textarea rows={6} value={description} onChange={handleDescriptionChange} className={s.textarea}/>
            </div>
            <div className={`${s["form_group-desc"]}`}>
                <label htmlFor="">UZ Описание</label>
                <textarea rows={6} value={descriptionUz} onChange={handleDescriptionChangeUz} className={s.textarea}/>
            </div>
        </div>
        <span className={'error'}>{error}</span>
        <div>
            <input
                type='file'
                ref={imageInput}
                accept='image/*'
                multiple
                onChange={handleImageUpload}
                className={s.imageInput}
            />
            <div className={s.infos_top}>
                <h4 className={s["subtitle"]}>
                    Фото
                </h4>
                <button onClick={() => imageInput.current.click()} className={s.uploadButton}>
                    Добавить
                </button>
            </div>

            <div className={s.imagesContainer}>
                {images.map((image, index) => (<div className={s.imageWrapper} key={index}>
                    <img src={URL.createObjectURL(image)} alt=''/>
                    <button className={s.removeButton} onClick={() => handleImageRemove(index)}>X</button>
                </div>))}
            </div>
        </div>
        <DatePicker error={datesError} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
        <Infos error={infosError} infos={infos} setInfos={setInfos}/>
        <button onClick={handleCreateEvent} className={s.create}>Создать</button>
    </div>);
};

export default EventCreate;
