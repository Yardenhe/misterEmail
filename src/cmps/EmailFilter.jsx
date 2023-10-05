import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowRotateRight, faEllipsisV, faInbox, faTag, faUsers, faQuestion, faTrashCan, faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from "./Dropdown"
import { useForm } from "../customHooks/useForm"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useToggle } from "../customHooks/useToggle"


export function EmailFilter({ onSetFilter, filterBy, onClickClearFilter, toggleSelectAll }) {
  const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)
  const [isOpen, onToggle] = useToggle(false);


  useEffectUpdate(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])


  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
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
          id="selectAll"
          name="selectAll"
          placeholder="selectAll"
          onChange={toggleSelectAll}
          onClick={onToggle}
        />

        <Dropdown handleChange={handleChange} onClickClearFilter={onClickClearFilter} />
        <FontAwesomeIcon className="filter-icon" icon={faArrowRotateRight} />
        <FontAwesomeIcon className="filter-icon" icon={faEllipsisV} />
        <FontAwesomeIcon className="filter-icon" icon={faQuestion} />
        {isOpen && <FontAwesomeIcon className="filter-icon" icon={faTrashCan} />}
        {isOpen && <FontAwesomeIcon className="filter-icon" icon={faStar} />}
        {isOpen && <FontAwesomeIcon className="filter-icon" icon={faEnvelope} />}

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
  )
}
