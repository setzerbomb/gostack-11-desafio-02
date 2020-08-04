import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const proccess = async () => {
      const { data } = await api.post("/repositories", {
        title: title,
        url: "",
        techs: [],
      });
      setRepositories([...repositories, data]);
    };

    proccess();
  }

  async function handleRemoveRepository(id) {
    const proccess = async () => {
      await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    };

    proccess();
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={({ target: { value } }) => {
            setTitle(value);
          }}
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }, key) => (
          <li key={key}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
