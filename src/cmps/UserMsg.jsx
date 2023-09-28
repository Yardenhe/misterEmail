import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, } from "@fortawesome/free-solid-svg-icons"
import { eventBusService } from "../services/event-bus.service"



export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => {
                onCloseMsg()
            }, 3000)
        })

    }, [])
    function onCloseMsg() {
        setMsg(null)
    }
    if (!msg) return <></>
    return (
        <div className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <FontAwesomeIcon onClick={onCloseMsg} icon={faX} className="header-icon" />
        </div>
    )
}
