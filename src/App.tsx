import React, { useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { Person } from './types/Person';
import { Autocomplete } from './Autocomplete/Autocomplete';

export const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // const handlePersonSelected = (person: Person | null) => {
  //   setSelectedPerson(person);
  // };

  const handlePersonSelected = (person: Person) => {
    setSelectedPerson(person);
  };

  const resetSelectedPerson = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        {/* {selectedPerson && (
          <h1 className="title" data-cy="title">
            No selected person
          </h1>
        )}

        {selectedPerson && (
          <h1 className="title" data-cy="title">
            {`${selectedPerson.name} (${selectedPerson.born} - ${selectedPerson.died})`}
          </h1>
        )} */}

        <h1 className="title" data-cy="title">
          {selectedPerson
            ? `${selectedPerson.name} (${selectedPerson.born} - ${selectedPerson.died})`
            : 'No selected person'}
        </h1>

        <div className="dropdown is-active">
          <Autocomplete
            people={peopleFromServer}
            onSelected={handlePersonSelected}
            onResetSelected={resetSelectedPerson}
            delay={300}
          />
        </div>
      </main>
    </div>
  );
};
