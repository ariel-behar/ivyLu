import { useState } from "react"

const useLocalStorage = (key: string, initialValue: object) => {
    const [state, setState] = useState(() => {
        try {
            let item = localStorage.getItem(key);

            return item 
                ? JSON.parse(item)
                : initialValue
        } catch (err) {
            console.log(err);
            return initialValue;
        }
    });

    const setItem = (value: object) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));

            setState(value);
        } catch (err) {
            console.log(err);
        }
    }

    return [ state, setItem ]
}

export default useLocalStorage;