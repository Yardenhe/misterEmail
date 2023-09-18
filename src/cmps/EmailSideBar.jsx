import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar, faClock, faPaperPlane, faTrashCan } from '@fortawesome/free-regular-svg-icons';


export function EmailSideBar({ onSetFilter, filterBy }) {
    const sidebarItems = [
        { icon: faInbox, label: 'Inbox' },
        { icon: faStar, label: 'Star' },
        { icon: faClock, label: 'Snoozed' },
        { icon: faPaperPlane, label: 'Sent' },
        { icon: faTrashCan, label: 'Trash' },
    ];
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
    const [clicked, setClicked] = useState('Inbox');

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);


    function handleChange({ target }) {
        var { value, name: field } = target;
        setFilterByToEdit((prevUser) => ({ ...prevUser, [field]: value }));
    }


    return (
        <div className="email-sidebar">
            {sidebarItems.map((item, index) => (
                <div className={"sidebar-item" + (clicked == item.label ? " clicked" : " ")} key={index}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon={item.icon} />
                    <input
                        type="button"
                        value={item.label}
                        name="status"
                        onClick={(target) => { setClicked(item.label), handleChange(target) }}
                    />
                </div>
            ))
            }
        </div >

    );
}
