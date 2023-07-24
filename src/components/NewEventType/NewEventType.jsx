import s from './NewEventType.module.css';
import success from '../../assets/success.svg'
import {useInput} from "../../utils.js";
import {
	useCreateEventTypeMutation
} from '../../redux/event/event.api'
import {loadingToast, successToast, errorToast} from "../../utils";

const NewEventType = () => {
    const [name, onChangeName,resetName] = useInput('')
    const [create] = useCreateEventTypeMutation()
   
    const handleCreate = async () => {
        let id
        try {
            if(name){
                 id = loadingToast('Создание...')

                await create({name})
                resetName()
                successToast(id)
            }else{
                if(id)errorToast(id)
                alert('fill name & photo')
            }



        } catch (e) {
            console.log(e)
        }
    }
    return (<div className={s.container}>
            <div className={s.form}>
                <div className="column">
					            <h2 className={s.title}>Создать Событие</h2>
<input value={name} onChange={onChangeName} placeholder={'Название...'} className={s.input}
                       type="text"/>
				</div>
                
                <button onClick={handleCreate} className={s.btn}>                    <img src={success} alt=""/>
                </button>
            </div>
        </div>

    );
};

export default NewEventType;
