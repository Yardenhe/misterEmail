import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faStar, faClock, faPaperPlane, faFile, faTrash } from '@fortawesome/free-solid-svg-icons';

export function EmailSideBar() {
    return (
        <div className="email-sidebar">
            <div className="sidebar-item">
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faInbox} /> Inbox
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faStar} /> Starred
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faClock} /> Snoozed
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faPaperPlane} /> Sent
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faFile} /> Draft
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faTrash} /> Trash
            </div>


        </div>
    )
}
