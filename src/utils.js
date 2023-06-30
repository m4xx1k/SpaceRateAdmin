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

export const useAuth = ()=>{
    return useSelector((state) => state.user)
}
