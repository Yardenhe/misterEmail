import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export function Dropdown({ handleChange, onClickClearFilter }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <section className="custom-dropdown">
            <section className="dropdown-header" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
            </section>
            {isOpen && (
                <section className="dropdown-options">
                    <input type="button" name='All' value='All' placeholder='All' onClick={() => { onClickClearFilter(), handleOptionSelect() }} />
                    <input type="button" name='None' value='None' onClick={() => handleOptionSelect('None')} />
                    <input type="button" name='isRead' value='Read' onClick={(target) => { handleChange(target), handleOptionSelect('Read') }} />
                    <input type="button" name='Unread' value='Unread' onClick={(target) => { handleChange(target), handleOptionSelect('Unread') }} />
                    <input type="button" name='isStarred' value='Starred' onClick={() => handleOptionSelect(' Starred')} />
                    <input type="button" name='isstarred' value='Unstarred' onClick={() => handleOptionSelect(' Unstarred')} />
                </section>
            )}
        </section>
    );
}


