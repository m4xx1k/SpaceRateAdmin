import React from 'react';
import s from './EventCreate.module.css'

const Infos = ({error,infos, setInfos}) => {
    console.log(infos)
    const handleChangeName = async (index, e) => {
        const {value} = e.target
        const newInfos = [...infos]
        newInfos[index] = {...infos[index], name:value}
        setInfos(newInfos)
    }
    const handleChangeNameUz = async (index, e) => {
        const {value} = e.target
        const newInfos = [...infos]
        newInfos[index] = {...infos[index], nameUz:value}
        setInfos(newInfos)
    }
    const handleChangeValue = async (index, e) => {
        const {value} = e.target
        const newInfos = [...infos]
        newInfos[index] = {...infos[index], value}
        setInfos(newInfos)
    }
    const handleChangeValueUz = async (index, e) => {
        const {value} = e.target
        const newInfos = [...infos]
        newInfos[index] = {...infos[index], valueUz:value}
        setInfos(newInfos)
    }
    const addInfo = () => {
        setInfos(prev => [...prev, {name:'', nameUz:'', value:'', valueUz:''}])
    }
    return (
        <div>
            <div className={s.infos_top}>
                <h4 style={{fontSize: 20, fontWeight: 500}}>Доп. Инфо</h4>
                <button onClick={addInfo} className={s.uploadButton}>Добавить</button>
            </div>
            {
                infos.map((info,index)=>
                    <div key={index} className={s.info}>
                        <div style={{marginTop:16}} className={'row'}>
                            <div className={s["form_group"]}>
                                <label htmlFor="" style={{textTransform: 'capitalize'}}>RU Название</label>
                                <input value={info.name} onChange={(e)=>handleChangeName(index,e)} type="text" className={s.input}/>
                            </div>
                            _
                            <div className={s["form_group"]}>
                                <label htmlFor="" style={{textTransform: 'capitalize'}}>RU Значение</label>
                                <input value={info.value} onChange={e=>handleChangeValue(index,e)} type="text" className={s.input}/>
                            </div>
                        </div>
                        <div style={{marginTop:16}} className={'row'}>
                            <div className={s["form_group"]}>
                                <label htmlFor="" style={{textTransform: 'capitalize'}}>UZ Название</label>
                                <input value={info.nameUz} onChange={(e)=>handleChangeNameUz(index,e)} type="text" className={s.input}/>
                            </div>
                            _
                            <div className={s["form_group"]}>
                                <label htmlFor="" style={{textTransform: 'capitalize'}}>UZ Значение</label>
                                <input value={info.valueUz} onChange={e=>handleChangeValueUz(index,e)} type="text" className={s.input}/>
                            </div>
                        </div>
                    </div>


                )
            }
            <div className={s.error}>{error}</div>
        </div>
    );
};

export default Infos;
