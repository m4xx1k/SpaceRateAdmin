import {useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {zonedTimeToUtc} from "date-fns-tz";

export function convertToMs(dateStr, timeStr) {
    const dateTimeStr = `${dateStr}T${timeStr}`;
    const utcDate = zonedTimeToUtc(dateTimeStr, 'Asia/Tashkent');
    return utcDate.getTime();
}
    export function infosHasDuplicates(infos){
        const names = infos.map(obj => obj.name);
        const infosHasEmptyNames = infos.some(info=>info.name==='')
        console.log({infosHasEmptyNames})
        return new Set(names).size !== names.length || infosHasEmptyNames;
    }
export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue(initialValue);
    };

    return [value, handleChange, reset, setValue];
}


export const useAuth = () => {
    return useSelector((state) => state.user)
}
export const loadingToast = (text='Загрузка', data = {}) => {
    return toast.loading(text, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...data
    })
}

export const successToast = (id, text='Успех', time = 3000, data = {}) =>
    toast.update(id, {
        render: text,
        type: 'success',
        position: "top-right",
        hideProgressBar: false,
        autoClose: time,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        isLoading: false,
        ...data
    })

export const errorToast = (id, text='Ошибка', time = 3000, data = {}) =>
    toast.update(id, {
        render: text,
        type: 'error',
        position: "top-right",
        hideProgressBar: false,
        autoClose: time,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        isLoading: false,
        ...data
    })
export const isValidDates = (dates)=>{
    return dates.some((value, index, self) =>
        self.filter(x => x.day === value.day).length > 1)
}
export function formatDates(dates) {
    const res = dates.map(dateObj => {
        const date = new Date(dateObj.date);
        const day = date.toLocaleDateString('fr-CA');
        const times = dateObj.times.map(timeStr => {
            const time = new Date(timeStr);
            return time.toLocaleTimeString('it-IT').slice(0,5);
        });
        return { day, times };
    })
    console.log(res)
    return res;
}
