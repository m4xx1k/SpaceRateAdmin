import {useState} from "react";

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
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

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
