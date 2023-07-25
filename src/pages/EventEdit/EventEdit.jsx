import s from './EventEdit.module.css'
import {useParams} from "react-router";
import {
    useFindAllEventTypesQuery,
    useGetEventFullInfoByIdQuery,
    useUpdateEventDatesMutation
} from "../../redux/event/event.api.js";
import React, {useEffect, useRef, useState} from "react";
import PlacePhoto from "../../components/PlacePhoto/PlacePhoto.jsx";
import {
    convertToMs,
    errorToast,
    formatDates,
    infosHasDuplicates,
    isValidDates,
    loadingToast,
    successToast
} from "../../utils.js";
import Infos from "../EventCreate/Infos.jsx";
import {format, parseISO} from 'date-fns';

import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import {
    useCreateEventPhotoMutation,
    useDeleteEventPhotoMutation, useDeleteEventMutation, useUpdateEventInfoMutation, useUpdateEventMutation,
    useUpdateEventPhotoMutation
} from "../../redux/event/event.api.js";



const EventEdit = () => {
    const {id} = useParams()
    const {data, isError, isSuccess, isLoading} = useGetEventFullInfoByIdQuery(id)


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [typeId, setTypeId] = useState('')
    const {data: types} = useFindAllEventTypesQuery()
    const [infos, setInfos] = useState([])
    const [selectedDates, setSelectedDates] = useState([]);
    const [photos, setPhotos] = useState({})

    const [datesError, setDatesError] = useState('')
    const [error, setError] = useState('')
    const [infosError, setInfosError] = useState('')
    const imageInput = useRef(null)

    useEffect(() => {
        const init = () => {
            console.log(data)
            const initialPhotos = {}
            data.event.photos.forEach(e => {
                initialPhotos[e._id] = {
                    src: `${import.meta.env.VITE__API}/events/${e.photo}`,
                    photo: `${import.meta.env.VITE__API}/events/${e.photo}`,
                    isNew: false
                }
            })

            setPhotos(initialPhotos)
            setName(data.event.name)
            setDescription(data.event.description)
            setTypeId(data.event.type._id)
            setInfos(data.event.info)
            const formatedDates = data.datesList.map(dateObj => {
                const date = new Date(dateObj.date);
                const times = dateObj.times.split(' | ').filter(timeStr=>timeStr).map(timeStr => {
                        const [hours, minutes] = timeStr.split(':').map(Number);
                        const time = new Date(date);
                        time.setHours(hours, minutes);
                        return time;
                });
                return {date, times};
            })
            console.log({formatedDates})
            setSelectedDates(formatedDates)
        }

        if (isSuccess) init()
    }, [isSuccess])

    const [sendPhoto] = useUpdateEventPhotoMutation()
    const [deletePhoto] = useDeleteEventPhotoMutation()
    const [createPhoto] = useCreateEventPhotoMutation()

    const [removeEvent] = useDeleteEventMutation()
    const [updateInfo] = useUpdateEventInfoMutation()
    const [updateDates] = useUpdateEventDatesMutation()
    const [updateEvent] = useUpdateEventMutation()

    const changePhoto = (id, photo) => {
        const newPhotos = {...photos}
        newPhotos[id] = {
            src: URL.createObjectURL(photo),
            photo,
            isNew: true,
            isCreate: !!newPhotos[id]?.isCreate
        }
        setPhotos(newPhotos)
    }
    const handleAddPhoto = (e) => {
        if (Object.keys(photos).length < 8) {
            const photo = e.target.files[0]
            const url = URL.createObjectURL(photo)
            const newPhotos = {...photos}
            newPhotos[url] = {
                src: URL.createObjectURL(photo),
                photo,
                isNew: true,
                isCreate: true
            }
            setPhotos(newPhotos)
        }

    }
    const handleChangePhoto = async () => {

        for (const photoId of Object.keys(photos)) {
            if (!!photos[photoId].isCreate) {
                const formData = new FormData()
                const photo = photos[photoId].photo
                formData.append('photo', photo)

                const res = await createPhoto({id: data.event._id, body: formData})
            } else if (typeof photos[photoId].photo !== "string" && photos[photoId].isNew) {
                const formData = new FormData()
                const photo = photos[photoId].photo
                formData.append('photo', photo)

                await sendPhoto({id: photoId, body: formData})
            }
        }
    }
    const handleDeletePhoto = async id => {
        if (Object.keys(photos).length !== 1) {
            const newPhotos = {...photos}
            if (!photos[id].isCreate) {
                await deletePhoto(id)
            }
            delete newPhotos[id]
            setPhotos(newPhotos)
        }


    }
    const handleDelete = async () => {
        await removeEvent(id)
    }
    const handleSaveAll = async () => {
        let toastId
        const isDatesError = isValidDates(formatDates(selectedDates))
        const isInfosError = infosHasDuplicates(infos)
        if (isDatesError && data.event.type.name!=='movie') {
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
        if ((isDatesError && data.event.type.name!=='movie') || isInfosError || !name || !description) {
            return
        }
        try {

            toastId = loadingToast('Сохранение...')

            const id = data.event._id

            await updateEvent({id, body: {description, name, type: typeId}})

            await updateInfo({id, infos})
            if(data.event.type.name!=='movie'){
                const dates = formatDates(selectedDates).map(date => ({
                    ...date,
                    times: [...new Set(date.times)]
                }))
                await updateDates({id, dates})
            }


            await handleChangePhoto()

            successToast(toastId)

        } catch (e) {
            if (toastId) errorToast(toastId)

            console.log(e)
        }
    }


    if (isLoading) return <p className="center">загрузка</p>
    if (isError) return <p className="center">ошибка</p>
    return (
        <div className={'container'}>
            <h2 className={'title'}>{name}</h2>

            <div>
                <div className={s.main}>
                    <div className={s.top}>
                        <div className={s["form_group"]}>
                            <label htmlFor="">Название</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text"
                                   className={s.input}/>
                        </div>
                        <div className={s["form_group"]}>
                            <label htmlFor="">Тип</label>
                            {
                                data.event.type.name !=='movie' ?
                                    <select value={typeId} className={s.input} onChange={e => setTypeId(e.target.value)}>
                                        {types?.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>

                                    : 'КИНО'
                            }

                        </div>
                    </div>
                    <div className={`${s["form_group-desc"]}`}>
                        <label htmlFor="">Описание</label>
                        <textarea rows={6} value={description} onChange={e => setDescription(e.target.value)}
                                  className={s.textarea}/>
                    </div>
                </div>
                <span className={'error'}>{error}</span>
                <div>
                    <div className={s.infos_top}>
                        <h4 className={s["subtitle"]}>
                            Фото
                        </h4>
                        <button onClick={() => imageInput.current.click()} className={s.uploadButton}>
                            Добавить
                        </button>
                    </div>
                    <div className={s.photos}>
                        {Object.keys(photos).map((id, i) => <PlacePhoto deletePhoto={handleDeletePhoto} key={id}
                                                                        i={i + 1} id={id}
                                                                        data={photos[id]}
                                                                        changePhoto={changePhoto}/>)}
                        <input
                            type='file'
                            ref={imageInput}
                            accept='image/*'
                            multiple
                            onChange={handleAddPhoto}
                            className={`${s.imageInput} imageInput`}
                        />


                    </div>


                </div>

                {
                    data.event.type.name !== 'movie' &&
                    <DatePicker error={datesError} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                }
                <Infos error={infosError}  infos={infos} setInfos={setInfos}/>
                <div className={s["controls"]}>
                    <button className={s.save} onClick={handleSaveAll}>
                        Сохранить
                    </button>
                    <button className={s.delete} onClick={handleDelete}>

                        Удалить

                    </button>

                </div>

            </div>

        </div>
    );
};

export default EventEdit;
