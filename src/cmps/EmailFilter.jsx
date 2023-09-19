import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRotateRight, faEllipsisV, faInbox, faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from "./Dropdown";


export function EmailFilter({ onSetFilter, filterBy, onClickClearFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    var { value, name: field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value || 0;
        break;
      case "checkbox":
        value = target.checked;
        break;
      case "button":
        if (target.name === "isRead") {
          value = true;
        } else if (target.name === "Unread") {
          {
            field = "isRead"
            value = false;
          }
        }
        break;
    }
    setFilterByToEdit((prevUser) => ({ ...prevUser, [field]: value }));
  }
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }
  return (
    <form className="email-filter">
      <section className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          id="search"
          name="txt"
          placeholder="Search mail"
          onChange={handleChange}
        />

      </section>
      <section className="read-filter">

        <input
          type="checkbox"
          id="isRead"
          name="isRead"
          placeholder="isRead"
        // onChange={handleChange}
        />

        <Dropdown handleChange={handleChange} onClickClearFilter={onClickClearFilter} />
        <FontAwesomeIcon className="filter-icon" icon={faArrowRotateRight} />
        <FontAwesomeIcon className="filter-icon" icon={faEllipsisV} />
      </section>
      <section className="under-filter">
        <section className="tags-under-filter">
          <FontAwesomeIcon className="filter-icon-under" icon={faInbox} />
          <h3>Primary</h3>
        </section>
        <section className="tags-under-filter">
          <FontAwesomeIcon className="filter-icon-under" icon={faTag} />
          <h3>Promotions</h3>
        </section>
        <section className="tags-under-filter">
          <FontAwesomeIcon className="filter-icon-under" icon={faUsers} />
          <h3>Social</h3>
        </section>
      </section>


    </form>
  );
}
