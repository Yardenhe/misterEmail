import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faStar, faClock, faPaperPlane, faTrashCan } from '@fortawesome/free-regular-svg-icons'


export function EmailFolderList({ onSetFilter, filterBy, openMenu, unreadCount }) {
    const sidebarItems = [
        { icon: faInbox, label: 'Inbox' },
        { icon: faStar, label: 'Star' },
        { icon: faClock, label: 'Snoozed' },
        { icon: faPaperPlane, label: 'Sent' },
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
        <section className={"email-sidebar" + (openMenu ? " slide-in" : " slide-out")}>
            {sidebarItems.map((item) => (
                <section className={"sidebar-item" + (clicked == item.label ? " clicked" : " ")} key={item.label}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon={item.icon} />
                    <input
                        type="button"
                        value={item.label}
                        name="status"
                        onClick={(target) => { setClicked(item.label), handleChange(target) }}
                    />
                    {item.label === 'Inbox' && unreadCount}
                </section>
            ))
            }
        </section >

    )
}
