import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

export function useForm(initialState, callBack) {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        if (callBack) callBack(fields)
    }, [fields])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
                value = (+value || '')
                break;
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            case "button":
                    if (target.name === "isRead") {
                    value = true
                    } else if (target.name === "Unread") {
                    {
                        field = "isRead"
                        value = false
                    }
                    }
        break
            default:
                break;
        }
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    return [fields, handleChange, setFields]
    
}