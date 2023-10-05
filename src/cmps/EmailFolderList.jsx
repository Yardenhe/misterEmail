import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faStar, faClock, faPaperPlane, faTrashCan, faFile } from '@fortawesome/free-regular-svg-icons'
import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"


export function EmailFolderList({ onSetFilter, filterBy, openMenu, unreadCount }) {

    const sidebarItems = [
        { icon: faInbox, label: 'Inbox' },
        { icon: faStar, label: 'Star' },
        { icon: faPaperPlane, label: 'Sent' },
        { icon: faFile, label: 'Drafts' },
        { icon: faTrashCan, label: 'Trash' },
    ]
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [clicked, setClicked] = useState('Inbox')

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className={"email-sidebar" + (openMenu ? " " : " slide-out-phone")}>
            {sidebarItems.map((item) => (
                <section className={"sidebar-item" + (clicked == item.label ? " clicked" : " ")
                    + (openMenu ? " slide-in" : " slide-out")}
                    key={item.label}>

                    <label>
                        <FontAwesomeIcon className="FontAwesomeIcon" icon={item.icon} />
                        <input
                            type="button"
                            className={"input-item" + (openMenu ? " " : " hide-input")}
                            value={item.label}
                            name="status"
                            onClick={(target) => {
                                setClicked(item.label);
                                handleChange(target);
                            }}
                        />
                    </label>

                    {item.label === 'Inbox' && openMenu ? unreadCount : null}
                </section>
            ))
            }
        </section >

    )
}
