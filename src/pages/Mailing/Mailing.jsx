import React, {useRef, useState} from 'react';
import axios from 'axios';
import s from './Mailing.module.scss';
import trash from '../../assets/trash.svg'
import replace from '../../assets/replace.svg'
import {useNotificationCenter} from "react-toastify/addons/use-notification-center";
import {toast} from "react-toastify";

const Mailing = () => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null)
    const { clear } = useNotificationCenter();

    const handleAddFile = (e) => {
        setFiles([...files, ...Array.from(e.target.files)]);
    }
    const handleFileChange = (event, indexToReplace) => {
        let newFiles = [...files];
        newFiles[indexToReplace] = event.target.files[0];
        setFiles(newFiles);
    }
    const handleTextChange = (e) => {
        setMessage(e.target.value);
    }

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    }

    const handleSubmit = async (e) => {
        const id = toast.loading('Отправка...',{
            position: "top-right",
            autoClose:false,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        e.preventDefault();
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('text', message);
        try {
            await axios.post('https://bot.goodjoy.uz/broadcast', formData);
            setFiles([])
            setMessage('')
            clear()
            toast.update(id,{
                render:'Отправлено',
                type:'success',
                position: "top-right",
                hideProgressBar: false,
                autoClose:3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading:false
            })
        } catch (error) {
            console.log(error)
            toast.update(id,{
                render:'Ошибка',
                type:'error',
                position: "top-right",
                hideProgressBar: false,
                autoClose:3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

                isLoading:false
            })
        }


    }

    return (
        <div className={'container'}>
            <h2 className={'title'}>Рассылка</h2>
            <form className={s.form} onSubmit={handleSubmit}>
                <label className={s.label}>
                    Сообщение:
                    <textarea className={s.textArea} value={message} onChange={handleTextChange}/>
                </label>
                <label className={s.label}>
                    <input ref={fileInputRef} className={s.fileInput} type="file" multiple accept=".jpg,.jpeg,.png,.mp4"
                           onChange={handleAddFile}/>
                    {/*<div onClick={()=>fileInputRef.current.click()} className={s.addFile}>Прикрепить файлы</div>*/}

                </label>
                {files.map((file, index) => (
                    <div className={s.fileRow} key={index}>
                        <span className={s.fileName}>{file.name}</span>
                        <button className={s.removeButton} onClick={() => removeFile(index)}>
                            <img className={s.buttonImg} src={trash} alt="delete"/>
                        </button>
                        <input type="file" id={`fileChange${index}`} onChange={(e) => handleFileChange(e, index)}
                               style={{display: 'none'}}/>
                        <label htmlFor={`fileChange${index}`} className={s.changeButton}>
                            <img className={s.buttonImg} src={replace} alt="replace"/>
                        </label>
                    </div>
                ))}
                <button type="submit" className={s.submitButton}>Send</button>
            </form>

        </div>
    );
}

export default Mailing;
