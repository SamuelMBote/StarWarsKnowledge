import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import APIStorage from './providers/APIStorage';
import Search from './components/Search';

import Resource from './components/Resource';

const root = {
  people: 'https://swapi.dev/api/people/',
  planets: 'https://swapi.dev/api/planets/',
  films: 'https://swapi.dev/api/films/',
  species: 'https://swapi.dev/api/species/',
  vehicles: 'https://swapi.dev/api/vehicles/',
  starships: 'https://swapi.dev/api/starships/',
};

function App() {
  return (
    <BrowserRouter>
      <APIStorage>
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.keys(root).map((resource) => (
            <Route
              key={resource}
              path={`${resource}`}
              element={<Search resource={resource} />}
            />
          ))}
          {Object.keys(root).map((resource) => (
            <Route
              key={resource}
              path={`/${resource}/:id`}
              element={<Resource resource_url={resource} />}
            />
          ))}{' '}
          {Object.keys(root).map((resource) => (
            <Route
              key={resource}
              path={`/${resource}/page/:idpage`}
              element={<Search resource={resource} />}
            />
          ))}
        </Routes>
      </APIStorage>
    </BrowserRouter>
  );
}

export default App;

