import React, {useEffect, useRef, useState} from 'react';
import s from './Place.module.scss'
import AdditionalItem from "../../components/NewPlace/AdditionalItem.jsx";
import PlacePhoto from "../../components/PlacePhoto/PlacePhoto";
import {
    useCreatePlacePhotoMutation,
    useRemovePlaceMutation,
    useUpdatePlaceInfoMutation, useUpdatePlaceMutation,
    useUpdatePlacePhotoMutation,
    useDeletePhotoMutation, useFindByIdQuery
} from "../../redux/place/place.api.js";
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import upload from '../../assets/upload.svg'
import saveIcon from '../../assets/save_icon.svg'
import deleteIcon from '../../assets/trash.svg'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectOnePlace} from "../../redux/place/place.slice.js";
import {errorToast, loadingToast, successToast} from "../../utils.js";
import {useParams} from "react-router";

const Place = () => {
    const {id} = useParams()
    const {data, isSuccess,isError,error} = useFindByIdQuery(id)
    const [photos, setPhotos] = useState({})


    const [name, setName] = useState('')
    const [nameUz, setNameUz] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionUz, setDescriptionUz] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const {data: categories} = useFetchAllQuery()
    const [additionalData, setAdditionalData] = useState({})


    const imageInput = useRef(null)

    const [sendPhoto] = useUpdatePlacePhotoMutation()
    const [deletePhoto] = useDeletePhotoMutation()
    const [createPhoto] = useCreatePlacePhotoMutation()

    const [removePlace] = useRemovePlaceMutation()
    const [updateInfo] = useUpdatePlaceInfoMutation()
    const [updatePlace] = useUpdatePlaceMutation()
    useEffect(() => {
        if (isSuccess) {
            const initialPhotos = {}
            data.photos.forEach(e => {
                initialPhotos[e._id] = {
                    src: `${import.meta.env.VITE__API}/places/${e.photo}`,
                    photo: `${import.meta.env.VITE__API}/places/${e.photo}`,
                    isNew: false
                }
            })
            console.log(data.info)
            setPhotos(initialPhotos)
            setName(data.place.name)
            setDescription(data.place.description)
            setNameUz(data.place.translation.uz.name)
            setDescriptionUz(data.place.translation.uz.description)
            setCategoryId(data.place.categoryId)

        }
    }, [isSuccess])

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

                const res = await createPhoto({id: data.place._id, body: formData})
                console.log(res)
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
            if (!photos[id].isCreate)
                await deletePhoto(id)
            delete newPhotos[id]
            setPhotos(newPhotos)
        }


    }
    const handleDelete = async () => {
        await removePlace(data.place._id)
    }
    const handleSaveAll = async () => {
        let toastId
        try {
            if (description && name && categoryId) {
                toastId = loadingToast('Сохранение...')
                const id = data.place._id
                const info = Object.keys(data.info).map(e => {
                    const elem = data.info[e]
                    return {
                        _id: elem._id, name: elem.name, value: additionalData[elem.name]
                    }
                })
                const translation = {uz:{name:nameUz, description:descriptionUz}}
                await updatePlace({id, body: {description, name, categoryId,translation}})

                 await updateInfo({id, body: {data: info}})

                await handleChangePhoto()
                successToast(toastId)
            } else {
                if (toastId) errorToast(toastId)
                alert('Поле не может бьіть пустьім')
            }
        } catch (e) {
            console.log(e)
        }
    }
    const dispatch = useDispatch()
    const handleSelectPlace = () => dispatch(selectOnePlace(data.place._id))
    if(!isSuccess) return <></>
    if(isError || error) {
        console.log({error})
        return <>Ошибка</>
    }
    return (
        <div className={`${s.container} ${ s.open}`}>
            <h4 className={s["title"]}>
                {name}
            </h4>
            <div className={s["info"]}>
                <div className="row-wrap">
                    <div className="column">
                        <label htmlFor="" className="label">RU Название</label>
                        <input value={name} onChange={e => setName(e.target.value)} className={s["name"]}/>
                    </div>
                    <div className="column">
                        <label htmlFor="" className="label">UZ Название</label>
                                        <input value={nameUz} onChange={e => setNameUz(e.target.value)} className={s["name"]}/>
                    </div>

                    <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
                            name="" id="">
                        {
                            categories?.map(elem => (
                                <option key={elem._id} value={elem._id}>{elem.name}</option>
                            ))
                        }
                    </select>
                    <Link onClick={handleSelectPlace} className={s.ratings} to={'/ratings'}>Отзывы</Link>

                </div>
                <div className="column" style={{marginTop:16}}>
                    <label htmlFor="" className="label">RU Описание</label>

                    <textarea value={description} rows={8} onChange={e => setDescription(e.target.value)}
                              className={s["desc"]}/>

                </div>
                <div className="column">
                    <label htmlFor="" className="label">UZ Описание</label>
                    <textarea value={descriptionUz} rows={8} onChange={e => setDescriptionUz(e.target.value)}
                                   className={s["desc"]}/>

                </div>



            </div>
            <div>
                <h4 className={s["subtitle"]}>
                    Фото
                </h4>
                <div className={s.photos}>

                    {Object.keys(photos).map((id, i) => <PlacePhoto deletePhoto={handleDeletePhoto} key={id}
                                                                    i={i + 1} id={id}
                                                                    data={photos[id]}
                                                                    changePhoto={changePhoto}/>)}
                    <div className={s.photo}>
                        <input
                            type='file'
                            ref={imageInput}
                            accept='image/*'
                            multiple
                            onChange={handleAddPhoto}
                            className={`${s.imageInput} imageInput`}
                        />
                        <button onClick={() => imageInput.current.click()} className={s.uploadButton}>
                            <img src={upload} alt=""/>
                        </button>
                    </div>



                </div>
            </div>
            <div>
                <h4 className={s["subtitle"]}>
                    Доп. информация
                </h4>
                <ul className={s["additional"]}>
                    {
                        Object.keys(data.info).map(name => {
                            const elem = data.info[name]
                            const value = {ru:elem.value,uz:elem.translation.uz.value}
                            return <AdditionalItem value={value} name={name} key={name}
                                                   handleChange={setAdditionalData}/>


                        })
                    }
                </ul>
            </div>

            <div className={s["controls"]}>
                <button className={s.save} onClick={handleSaveAll}>
                   Сохранить
                </button>
                <button className={s.delete} onClick={handleDelete}>

                    Удалить

                </button>

            </div>

        </div>
    );
};

export default Place;
