import {useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {zonedTimeToUtc} from "date-fns-tz";
export const months = [
    'январь',   'февраль',
    'март',     'апрель',
    'май',      'июнь',
    'июль',     'август',
    'сентябрь', 'октябрь',
    'ноябрь',   'декабрь'
]
export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    return date.toLocaleDateString('ru-RU', options);
}

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
export function useAnalitics(data){
    const uniqueUsernames = new Set();
    const uniqueUsers = []
    data.forEach(user=>{
        if(!uniqueUsers.includes(user.telegramId)) uniqueUsers.push(user)
    })
    const usersData = data.reduce((acc, item) => {
        const dateKey = item.date.split('T')[0];
        acc[dateKey] = acc[dateKey] || { totalUsers: 0, newUsers: 0 };

        acc[dateKey].totalUsers += 1;

        // Якщо registeredSameDay дорівнює true і користувач ще не був зареєстрований раніше, він вважається новим користувачем
        if (item.registeredSameDay && !uniqueUsernames.has(item.username)) {
            acc[dateKey].newUsers += 1;
            uniqueUsernames.add(item.username);
        }

        return acc;
    }, {});
    const usersArray = Object.keys(usersData)
        .map(key => ({
            date: key,
            totalUsers: usersData[key].totalUsers,
            newUsers: usersData[key].newUsers,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const userEntriesData = data.reduce((acc, item) => {
        acc[item.username] = (acc[item.username] || 0) + 1;
        return acc;
    }, {});
    const userEntriesArray = Object.keys(userEntriesData).map(key => ({ username: key, count: userEntriesData[key] }));
    console.log({uniqueUsernames:[...uniqueUsernames]})
    return{userEntriesArray,usersArray, newCount:uniqueUsers.filter(user=>user.registeredSameDay).length,allCount:uniqueUsers.length}
}
