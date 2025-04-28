import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
  onSelected: (person: Person) => void;
  onResetSelected: () => void;
  delay?: number;
  // setTitle: (title: string) => void;
}

export const Autocomplete: React.FC<Props> = ({
  people,
  onSelected,
  onResetSelected,
  delay = 300,
  // setTitle,
}) => {
  const [inputText, setInputText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(inputText);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputText, delay]);

  const normalizedText = debouncedText.toLowerCase();

  let filteredPeople: Person[];

  if (debouncedText.trim() === '') {
    filteredPeople = people;
  } else {
    filteredPeople = people.filter(person =>
      person.name.toLowerCase().includes(normalizedText),
    );
  }

  const handleSelect = (person: Person) => {
    onSelected(person);
    setInputText(person.name);
    setIsDropdownOpen(false);
    // setTitle(`${person.name} (${person.born} - ${person.died})`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    onResetSelected(); // Скидаємо обраного користувача при зміні інпута
  };

  return (
    <div className={`dropdown ${isDropdownOpen ? 'is-active' : ''}`}>
      <input
        type="text"
        value={inputText}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsDropdownOpen(false), 1000);
        }}
        onChange={handleChange}
        className="input"
        placeholder="Enter a part of the name"
        data-cy="search-input"
      />

      <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
        <div className="dropdown-content">
          {filteredPeople.length > 0 ? (
            filteredPeople.map(person => (
              <div
                key={person.slug}
                className="dropdown-item"
                data-cy="suggestion-item"
                onClick={() => handleSelect(person)}
              >
                <p className="has-text-link">{person.name}</p>
              </div>
            ))
          ) : (
            <div
              className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
              role="alert"
              data-cy="no-suggestions-message"
            >
              <p className="has-text-danger">No matching suggestions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
