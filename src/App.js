import React, { useEffect, useState } from 'react';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
import api from './services/api';

import './global.css';
import './App.css';
import './Aside.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const { data } = await api.get('/devs');

      setDevs(data);
    }

    loadDevs();
  }
  , []);

  async function saveDev(github_username, techs, longitude, latitude) {
    const { data } = await api.post('/devs', {
      github_username,
      techs,
      longitude,
      latitude
    });

    setDevs([...devs, data]);
  }

  return (
    <>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm saveDev={saveDev}></DevForm>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}></DevItem>
          ))
          }
        </ul>
      </main>
    </>
  );
}

export default App;
