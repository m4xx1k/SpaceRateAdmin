import  {useState} from 'react';
import s from './EventTypeItem.module.css'
import success from '../../assets/success.svg'
import deleteIcon from '../../assets/delete.svg'
import {useInput} from "../../utils.js";
import {loadingToast, successToast, errorToast} from "../../utils";
import {
	useUpdateEventTypeMutation,
	useDeleteEventTypeMutation,
} from '../../redux/event/event.api'
const CategoryItem = ({data}) => {

    const [name, changeName] = useInput(data.name)
    const [update] = useUpdateEventTypeMutation()
    const [remove] = useDeleteEventTypeMutation()
	const [isNewData, setIsNewData] = useState(false)

    const handleChangeName = e => {
        setIsNewData(true)
        changeName(e)
    }

    const handleChange = async () => {
        let id
        try {
            if (isNewData && !!name) {
                const id =  loadingToast('Сохранение...')
                await update({id: data._id, name})
                successToast(id)
            }
        } catch (e) {
            errorToast(id)
            console.log(e)
        }
    }
    const handleDelete = async () => {
        try {
            const r = await remove({id: data._id})
            console.log(r)

        } catch (e) {

            console.log(e)
        }
    }
   return (
       <div key={data.name} className={s.type}>
			<div className={s.name}>
				<input value={name} onChange={handleChangeName} className={s.name}/>
			</div>
			<div className={s.controls}>
				<button className={s.save} onClick={handleChange}>
					<img src={success} alt=""/>
				</button>
				<button className={s.delete} onClick={handleDelete}>
					<img src={deleteIcon} alt=""/>
				</button>
			</div>
		</div>
    );
};

export default CategoryItem;
