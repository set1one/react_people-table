import React from 'react';
import './App.scss';
import { PeopleTable } from './components/PeopleTable';
import peopleFromServer from './api/people.json';

type State = {
  query: string;
  sortBy: keyof Person | '';
  people: Person[];
  isReversed: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    query: '',
    sortBy: '',
    isReversed: false,
    people: [...peopleFromServer as Person[]],
  };

  reverse = () => {
    this.setState((currentState) => ({
      isReversed: !currentState.isReversed,
    }));
  };

  getVisiblePeople = () => {
    const {
      query, people, sortBy, isReversed,
    } = this.state;

    let visiblePeople = people;

    if (query) {
      const lowerQuery = query.toLowerCase();

      visiblePeople = people
        .filter(person => person.name.toLowerCase().includes(lowerQuery));
    }

    if (sortBy) {
      visiblePeople = [...visiblePeople]
        .sort((a: Person, b: Person) => (
          a[sortBy] > b[sortBy] ? 1 : -1
        ));
    }

    if (isReversed) {
      visiblePeople = [...visiblePeople].reverse();
    }

    return visiblePeople;
  };

  sortByField = (field: keyof Person) => {
    this.setState({
      sortBy: field,
    });
  };

  addRandomPerson = () => {
    const newPerson = {
      name: 'Eugene Gnedenko',
      sex: 'm',
      born: 1998,
      died: Infinity,
      fatherName: 'Yuri Gnedenko',
      motherName: 'Natalia Gnedenko',
      slug: 'eugene-gnedenko-1998',
    };

    this.setState(currentState => ({
      people: [newPerson, ...currentState.people],
    }));
  };

  render() {
    const { query } = this.state;

    const visiblePeople = this.getVisiblePeople();

    return (
      <div className="App">
        <h1>{`People table ${query}`}</h1>

        <button
          type="button"
          onClick={this.addRandomPerson}
        >
          add person
        </button>

        <button
          type="button"
          onClick={this.reverse}
        >
          reverse
        </button>

        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ query: e.target.value });
          }}
        />

        <button
          type="button"
          onClick={() => this.sortByField('born')}
        >
          sort by born
        </button>

        <button
          type="button"
          onClick={() => this.sortByField('died')}
        >
          sort by died
        </button>

        <button
          type="button"
          onClick={() => this.sortByField('name')}
        >
          sort by name
        </button>

        {visiblePeople.length !== 0 && (
          <PeopleTable people={visiblePeople} />
        )}
      </div>
    );
  }
}

export default App;
