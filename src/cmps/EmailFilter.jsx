import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
  console.log(filterByToEdit);
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
      </section>
      {/* <button onClick={onSubmitFilter}>Filter</button> */}

    </form>
  );
}
