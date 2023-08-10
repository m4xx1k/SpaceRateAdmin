import s from './NewEventType.module.css';
import success from '../../assets/success.svg'
import {useInput} from "../../utils.js";
import {
    useCreateEventTypeMutation
} from '../../redux/event/event.api'
import {loadingToast, successToast, errorToast} from "../../utils";

const NewEventType = () => {
    const [name, onChangeName, resetName] = useInput('')
    const [nameUz, onChangeNameUz, resetNameUz] = useInput('')
    const [create] = useCreateEventTypeMutation()

    const handleCreate = async () => {
        let id
        try {
            if (name && nameUz) {
                id = loadingToast('Создание...')

                await create({name, nameUz})
                resetName()
                resetNameUz()
                successToast(id)
            } else {
                if (id) errorToast(id)
                alert('заполните названия')
            }


        } catch (e) {
            console.log(e)
        }
    }
    return (<div className={s.container}>
            <div className={s.form}>
                <div className="column">
                    <h2 className={s.title}>Создать Событие</h2>
                    <div className="row" style={{gap:16}}>
                        <div className="column">
                            <input value={name}  onChange={onChangeName} placeholder={'RU Название...'} className={s.input}
                                   type="text"/>
                        </div>
                        <div className="column">
                            <input value={nameUz}  onChange={onChangeNameUz} placeholder={'UZ Название...'} className={s.input}
                                   type="text"/>
                        </div>
                    </div>


                </div>

                <button onClick={handleCreate} className={s.btn}><img src={success} alt=""/>
                </button>
            </div>
        </div>

    );
};

export default NewEventType;
