import s from './EventTypes.module.css'
import {
    useFindAllEventTypesQuery,
} from '../../redux/event/event.api'
import EventTypeItem from '../../components/EventTypeItem/EventTypeItem'
import NewEventType from '../../components/NewEventType/NewEventType'

// const NewEventType = ()=>{
// 	const [create] = useCreateEventTypeMutation()
// 	const handleCreateEventType = async ()=>{
// 		try{
// 			const res = await create()
// 		}catch(e){
// 			console.log(e)
// 		}
// 	}
// 	return (
// 		<>
// 			<h2 className="title">Создать Событие</h2>
// 		</>
// 	)
// }

const EventTypes = () => {
    const {data: types, isSuccess} = useFindAllEventTypesQuery()

    return (
        <div className={'container'}>
            <h2 className={'title'}>Типы Событий</h2>
            <NewEventType/>

            <div className={s.list}>
                {isSuccess && types.map(type =>
                    type.name !== 'movie' && <EventTypeItem key={type.name} data={type}/>
                )}

            </div>
        </div>
    )
}

export default EventTypes
