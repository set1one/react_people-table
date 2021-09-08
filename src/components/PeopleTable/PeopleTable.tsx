import React from 'react';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { people } = props;

  const tableHead: string[] = Object.keys(people[0]);

  return (
    <table>
      <thead>
        <tr>
          {tableHead.map(item => (
            <th key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.name}>
            {Object.values(person).map(personItem => (
              <td key={personItem}>
                {personItem}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
