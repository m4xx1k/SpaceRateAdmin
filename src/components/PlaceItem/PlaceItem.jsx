import React, {useEffect, useRef, useState} from 'react';
import s from './PlaceItem.module.scss'
import AdditionalItem from "../NewPlace/AdditionalItem.jsx";
import PlacePhoto from "../PlacePhoto/PlacePhoto.jsx";
import {
    useCreatePlacePhotoMutation,
    useRemovePlaceMutation,
    useUpdatePlaceInfoMutation, useUpdatePlaceMutation,
    useUpdatePlacePhotoMutation,
    useDeletePhotoMutation
} from "../../redux/place/place.api.js";
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import upload from '../../assets/upload.svg'
import saveIcon from '../../assets/save_icon.svg'
import deleteIcon from '../../assets/trash.svg'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectOnePlace} from "../../redux/place/place.slice.js";
import {errorToast, loadingToast, successToast} from "../../utils.js";
const PlaceItem = ({data}) => {
    const [photos, setPhotos] = useState({})
    useEffect(() => {
        const initialPhotos = {}
        data.photos.forEach(e => {
            initialPhotos[e._id] = {
                src: `${import.meta.env.VITE__API}/places/${e.photo}`,
                photo: `${import.meta.env.VITE__API}/places/${e.photo}`,
                isNew: false
            }
        })
        setPhotos(initialPhotos)


    }, [])

    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState(data.place.name)
    const [description, setDescription] = useState(data.place.description)
    const [categoryId, setCategoryId] = useState(data.place.categoryId)
    const {data: categories} = useFetchAllQuery()
    const [additionalData, setAdditionalData] = useState({})


    const imageInput = useRef(null)

    const [sendPhoto] = useUpdatePlacePhotoMutation()
    const [deletePhoto] = useDeletePhotoMutation()
    const [createPhoto] = useCreatePlacePhotoMutation()

    const [removePlace] = useRemovePlaceMutation()
    const [updateInfo] = useUpdatePlaceInfoMutation()
    const [updatePlace] = useUpdatePlaceMutation()

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
                await updatePlace({id, body: {description, name, categoryId}})

                await updateInfo({id, body: {data: info}})

                await handleChangePhoto()
                successToast(toastId)
            } else {
                if(toastId) errorToast(toastId)
                alert('Поле не может бьіть пустьім')
            }
        } catch (e) {
            console.log(e)
        }
    }
    const dispatch = useDispatch()
    const handleSelectPlace = ()=>dispatch(selectOnePlace(data.place._id))
    return (
        <div className={`${s.container} ${isOpen ? s.open : ''}`}>
            <div className={s.photos}>
                {
                    isOpen ?
                        <>
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

                        </>

                        : <PlacePhoto deletePhoto={handleDeletePhoto} i={1} id={Object.keys(photos)[0]}
                                      data={photos[Object.keys(photos)[0]]}
                                      changePhoto={changePhoto}/>

                }
            </div>
            {/*<img alt={''} src={`https://api.goodjoy.uz/places/${data.photos[0].photo}`} className={s.photo}></img>*/}
            <div className={s["info"]}>
                <div className="row-wrap">
                    <input value={name} onChange={e => setName(e.target.value)} className={s["name"]}/>
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

                <textarea value={description} rows={8} onChange={e => setDescription(e.target.value)}
                          className={s["desc"]}/>

            </div>
            <ul className={s["additional"]}>
                {
                    Object.keys(data.info).slice(isOpen ? 0 : 4).map(name => {
                        const value = data.info[name].value
                        // console.log(name, data.info[name])
                        return <AdditionalItem value={value} name={name} key={name}
                                               handleChange={setAdditionalData}/>


                    })
                }
            </ul>
            <div className={s["controls"]}>
                    <button className={s.save} onClick={handleSaveAll}>
                        <img src={saveIcon} className={s.icon} alt=""/>
                    </button>
                    <button className={s.delete} onClick={handleDelete}>

                        <img src={deleteIcon} className={s.icon} alt=""/>

                    </button>
                    <button onClick={() => setIsOpen(prev => !prev)}>
                        {
                            isOpen ? '▲' : ' ▼ '
                        }
                    </button>
            </div>

        </div>
    );
};

export default PlaceItem;
