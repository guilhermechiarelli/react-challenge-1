import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `Repositório ${repositories.length + 1}`,
      url: `Repositório ${repositories.length + 1}`,
      techs: ['teste2', 'teste2']
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id, index) {
    await api.delete(`repositories/${id}`);

    let array = repositories;

    array.splice(index, 1);

    setRepositories([...array]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((el, i) => (
          <li key={el.id}>
            {el.title}

            <button onClick={() => handleRemoveRepository(el.id, i)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
