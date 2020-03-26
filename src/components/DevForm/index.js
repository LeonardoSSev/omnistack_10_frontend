import React, { useState, useEffect } from 'react';

function DevForm({ saveDev }) {
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error(error)
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await saveDev(githubUsername, techs, longitude, latitude);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-form">
        <label htmlFor="github_username">Usuário do Github:</label>
        <input type="text" name="github_username" value={githubUsername} onChange={e => setGithubUsername(e.target.value)}/>
      </div>

      <div className="input-form">
        <label htmlFor="techs">Tecnologias:</label>
        <input type="text" name="techs" value={techs} onChange={e => setTechs(e.target.value)}/>
      </div>

      <div className="input-group">
        <div className="input-form">
          <label htmlFor="longitude">Longitude:</label>
          <input type="number" name="longitude" value={longitude} onChange={e => setLongitude(e.target.value)}/>
        </div>

        <div className="input-form">
          <label htmlFor="latitude">Latitude:</label>
          <input type="number" name="latitude" value={latitude} onChange={e => setLatitude(e.target.value)}/>
        </div>
      </div>
      <button>Salvar</button>
    </form>
  )
}

export default DevForm;