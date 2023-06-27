import React, {useEffect, useRef, useState} from 'react';
import s from './PlaceItem.module.css'
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

const PlaceItem = ({data}) => {
    const [photos, setPhotos] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState(data.place.name)

    const [description, setDescription] = useState(data.place.description)

    const [additionalData, setAdditionalData] = useState({})

    const [categoryId, setCategoryId] = useState(data.place.categoryId)

    const {data: categories, isLoading} = useFetchAllQuery()
    const fileInput = useRef(null)
    useEffect(() => {
        const initialPhotos = {}
        data.photos.forEach(e => {
            initialPhotos[e._id] = {
                src: `http://localhost:5001/places/${e.photo}`,
                photo: `http://localhost:5001/places/${e.photo}`,
                isNew: false
            }
        })
        setPhotos(initialPhotos)


    }, [])

    const [sendPhoto] = useUpdatePlacePhotoMutation()
    const [removePlace] = useRemovePlaceMutation()
    const [updateInfo] = useUpdatePlaceInfoMutation()
    const [updatePlace] = useUpdatePlaceMutation()
    const [deletePhoto] = useDeletePhotoMutation()
    const handleDeletePhoto = async id => {
        if(Object.keys(photos)!==1){
            const newPhotos = {...photos}
            if (!photos[id].isCreate)
                await deletePhoto(id)
            delete newPhotos[id]
            setPhotos(newPhotos)
        }


    }
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
        if(Object.keys(photos)<8){
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
    const [createPhoto] = useCreatePlacePhotoMutation()
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

    const handleDelete = async () => {
        await removePlace(data.place._id)
    }
    const handleSaveAll = async () => {
        try {
            if (description && name && categoryId) {
                const id = data.place._id

                const main = await updatePlace({id, body: {description, name, categoryId}})

                handleChangePhoto()

                const info = Object.keys(data.info).map(e => {

                    const elem = data.info[e]
                    return {
                        _id: elem._id, name: elem.name, value: additionalData[elem.name].value
                    }
                })
                await updateInfo({id, body: {data: info}})

            } else {
                alert('Поле не может бьіть пустьім')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={s.container}>
            <div className={s.photos}>
                {
                    isOpen ?
                        <>
                            {Object.keys(photos).map((id, i) => <PlacePhoto deletePhoto={handleDeletePhoto} key={id} i={i + 1} id={id}
                                                                            data={photos[id]}
                                                                            changePhoto={changePhoto}/>)}
                            <div className={s.photos}>
                                <input
                                    type='file'
                                    ref={fileInput}
                                    accept='image/*'
                                    multiple
                                    onChange={handleAddPhoto}
                                    className={s.fileInput}
                                />
                                <button onClick={() => fileInput.current.click()} className={s.uploadButton}>
                                    <img src={upload} alt=""/>
                                </button>
                            </div>

                        </>

                        : <PlacePhoto deletePhoto={handleDeletePhoto} i={1} id={Object.keys(photos)[0]} data={photos[Object.keys(photos)[0]]}
                                      changePhoto={changePhoto}/>

                }
            </div>
            {/*<img alt={''} src={`http://localhost:5001/places/${data.photos[0].photo}`} className={s.photo}></img>*/}
            <div className={s["info"]}>
                <input value={name} onChange={e => setName(e.target.value)} className={s["name"]}/>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
                        name="" id="">
                    {
                        categories?.map(elem => (
                            <option key={elem._id} value={elem._id}>{elem.name}</option>
                        ))
                    }
                </select>
                <textarea value={description} rows={4} onChange={e => setDescription(e.target.value)}
                          className={s["desc"]}/>
                <div className="row-wrap">
                    <button className={s.save} onClick={handleSaveAll}>Сохранить</button>
                    <button className={s.delete} onClick={handleDelete}>Удалить</button>
                </div>
            </div>
            <ul className={s["additional"]}>
                {
                    Object.keys(data.info).slice(isOpen ? 0 : 4).map(name => {
                        const value = data.info[name].value
                        console.log(name, data.info[name])
                        return <AdditionalItem value={value} name={name} key={name}
                                               handleChange={setAdditionalData}/>


                    })
                }
            </ul>
            <button onClick={() => setIsOpen(prev => !prev)}>
                {
                    isOpen ? '▲' : ' ▼ '
                }
            </button>
        </div>
    );
};

export default PlaceItem;
