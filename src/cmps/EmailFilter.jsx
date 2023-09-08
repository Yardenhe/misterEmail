import { useEffect, useState } from "react";

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
    }
    setFilterByToEdit((prevUser) => ({ ...prevUser, [field]: value }));
  }
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  return (
    <form className="email-filter">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="txt"
        placeholder="Search in mail"
        onChange={handleChange}
      />
      <label htmlFor="isRead">isRead</label>
      <input
        type="checkbox"
        id="isRead"
        name="isRead"
        placeholder="isRead"
        onChange={handleChange}
      />
      <button onClick={onSubmitFilter}>Filter</button>
      <button onClick={onClickClearFilter}>Clear Filter</button>
    </form>
  );
}
