import React, {useState} from 'react';
import dayjs from "dayjs";
import s from './RatingItem.module.scss'
import {useFetchUserQuery} from "../../redux/auth/authApiSlice.js";
import deleteIcon from './../../assets/trash.svg'
import {useDeleteRatingMutation, useCreateRatingAnswerMutation,
    useUpdateRatingAnswerMutation,
    useDeleteRatingAnswerMutation,} from "../../redux/place/place.api.js";
import {useInput} from "../../utils.js";
const VITE__API = import.meta.env.VITE__API
const AnswerCreate = ({id, onClose})=>{
    const [text, setText] = useInput('')
    const [create] = useCreateRatingAnswerMutation()
    const handleCreate = async ()=>{
        try {
            const res =await create({id,text})
            onClose()
            console.log({res})
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <div>
                <textarea className={s.item__answer_text} value={text} onChange={setText}/>
            </div>
            <div >
                <button className={'btn-blue'} onClick={handleCreate}>Создать Ответ</button>
            </div>
        </div>
    )
}
const AnswerItem = ({data,ratingId})=>{
    const [text, setText] = useInput(data.text)
    const [update] = useUpdateRatingAnswerMutation()
    const [remove] = useDeleteRatingAnswerMutation()

    const handleSave = async ()=>{
        try{
            const res = await update({id:data._id,text})
            console.log(res)
        }catch (e) {
            console.log(e)
        }
    }
    const handleDelete = async ()=>{
        try{
            const res =await remove({ratingId, answerId:data._id})
            console.log(res)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={s.item__answer_item}>
            <div>
                <textarea  className={s.item__answer_text} value={text} onChange={setText}/>
                <div className={s.item__date}>{dayjs(data.date).format("DD.MM.YYYY HH:mm")}</div>
            </div>
            <div className={s.item__answer_controls}>
                <button className={'btn-blue'} onClick={handleSave}>Сохранить</button>
                <button className={'btn-red'} onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    )
}
const RatingItem = ({data}) => {

    const {data:user} = useFetchUserQuery({telegramId: data.telegramId})
    const [isShowAnswer, setIsShowAnswer] = useState(false)
    const [isShowCreateAnswer, setIsShowCreateAnswer] = useState(false)
    const [deleteRating] = useDeleteRatingMutation()
    const handleDelete = async id =>{
        try{
            await deleteRating(data._id)
        }catch (e) {
            console.log(e)
        }
    }

    return (
            <li className={s.item}>
                {
                    user &&  <div className={s.item__top}>
                        <img className={s.item__img} src={user.picture} alt=""/>
                        <div className={s.item__user}>
                            <span>{user.name}</span>
                            <a className={s.item__username} target={'_blank'} rel={'noreferrer'} href={`https://t.me/${user.username}`}>@{user.username}</a>
                        </div>
                        <span className={s.item__rating}>{data.value}/5</span>
                    </div>
                }

                <p className={s.item__text}>{data.text}</p>
                <div className={'rewievs__photos'}>
                    {data?.photos?.map((photo,i)=>(
                        <picture  key={photo._id}>
                            <img className={'rewievs__photo'}
                                 src={`${VITE__API}/places/${photo.photo}`}
                                 alt={`${VITE__API}/places/${photo.photo}`}/>
                            {/*<img loading="lazy"  src="https://via.placeholder.com/374" alt=""/>*/}
                        </picture>
                    ))}
                </div>
                <div className={s.item__bottom}>
                    <span className={s.item__date}>{dayjs(data.date).format("DD.MM.YYYY HH:mm")}</span>
                    {data.answers?.length ? <button className={s.item__answer_show} onClick={() => setIsShowAnswer(prev => !prev)}>
                        показать ответы</button>:<></>
                    }
                    <button  className={s.item__answer_create} onClick={()=>setIsShowCreateAnswer(prev=>!prev)}>
                       ответить
                    </button>
                    <button className={s.item__delete} onClick={handleDelete}>
                        <img src={deleteIcon} alt=""/>
                    </button>
                </div>
                {
                    isShowCreateAnswer && <AnswerCreate onClose={()=>setIsShowCreateAnswer(false)} id={data._id}/>
                }
                {
                    isShowAnswer &&
                    <ul>
                        {data.answers.map(el=>(
                           <AnswerItem ratingId={data._id} key={el._id} data={el}/>
                        ))}
                    </ul>
                }
            </li>


    );
};

export default RatingItem;
