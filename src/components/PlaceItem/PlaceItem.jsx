import React, {useEffect, useState} from 'react';
import s from './PlaceItem.module.css'
import AdditionalItem from "../NewPlace/AdditionalItem.jsx";
import PlacePhoto from "../PlacePhoto/PlacePhoto.jsx";
import {
    useRemovePlaceMutation,
    useUpdatePlaceInfoMutation, useUpdatePlaceMutation,
    useUpdatePlacePhotoMutation
} from "../../redux/place/place.api.js";
import {useFetchAllQuery} from "../../redux/category/category.api.js";

const PlaceItem = ({data}) => {
    const [photos, setPhotos] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState(data.place.name)

    const [description, setDescription] = useState(data.place.description)

    const [additionalData, setAdditionalData] = useState({})

    const [categoryId, setCategoryId] = useState(data.place.categoryId)

    const {data: categories, isLoading} = useFetchAllQuery()

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
    const changePhoto = (id, photo) => {
        const newPhotos = {...photos}
        newPhotos[id] = {
            src: URL.createObjectURL(photo),
            photo,
            isNew: true
        }
        setPhotos(newPhotos)
    }

    const handleChangePhoto = async () => {
        for (const photoId of Object.keys(photos)) {
            if (typeof photos[photoId].photo !== "string" && photos[photoId].isNew) {
                const formData = new FormData()
                const photo = photos[photoId].photo
                formData.append('photo', photo)

                const res = await sendPhoto({id: photoId, body: formData})
                console.log(res)
            }
        }
    }
    const handleChangeInfos = async () => {
        console.log(additionalData)
    }
    const handleDelete = async () => {
        console.log( data.place._id)
        const res = await removePlace(data.place._id)
        console.log(res)
    }
    const handleSaveAll = async () => {
        try {
            if (description && name && categoryId) {
                const id = data.place._id

                const main = await updatePlace({id, body: {description, name, categoryId}})

                handleChangePhoto()

                const info = data.info.map(elem=>({_id:elem._id, name:elem.name, value:additionalData[elem.name]}))
                await updateInfo({id, body:{data:info}})

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
                        Object.keys(photos).map((id, i) => <PlacePhoto key={id} i={i + 1} id={id} data={photos[id]}
                                                                       changePhoto={changePhoto}/>)
                        : <PlacePhoto i={1} id={Object.keys(photos)[0]} data={photos[Object.keys(photos)[0]]}
                                      changePhoto={changePhoto}/>

                }
            </div>
            {/*<img alt={''} src={`http://localhost:5001/places/${data.photos[0].photo}`} className={s.photo}></img>*/}
            <div className={s["info"]}>
                <input value={name} onChange={e => setName(e.target.value)} className={s["name"]}/>
                <select defaultValue={categoryId} value={categoryId} onChange={e => setCategoryId(e.target.value)}
                        name="" id="">
                    {
                        categories?.map(elem => (
                            <option value={elem._id}>{elem.name}</option>
                        ))
                    }
                </select>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className={s["desc"]}/>
                <div className="row-wrap">
                    <button className={s.save} onClick={handleSaveAll}>Сохранить</button>
                    <button className={s.delete}  onClick={handleDelete}>Удалить</button>
                </div>
            </div>
            <ul className={s["additional"]}>
                {
                    data.info.slice(isOpen ? 0 : 4).map(elem => (
                        <AdditionalItem value={elem.value} name={elem.name} key={elem.name}
                                        handleChange={setAdditionalData}/>

                    ))
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
