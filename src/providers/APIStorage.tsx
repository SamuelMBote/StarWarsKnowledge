import React from 'react';
import useFetch from '../hooks/useFetch';
import {IAPIContext} from '../interfaces/IAPIContext';

export const APIContext = React.createContext<IAPIContext>({
  API_ROOT_URL: 'https://swapi.dev/api/',
  ROOT_RESOURCES: {
    loading: false,
    error: null,
    data: null,
    request: null,
  },
  FETCH_RESOURCE_LIST: (
    slug_resource: string,
    page?: string,
  ): {
    url: string;
    options: {
      method: string;
      headers: {
        'Content-Type': string;
      };
    };
  } => {
    return {
      url: '',
      options: {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    };
  },
  FETCH_RESOURCE: (
    url: string,
  ): {
    url: string;
    options: {
      method: string;
      headers: {
        'Content-Type': string;
      };
    };
  } => {
    return {
      url: '',
      options: {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    };
  },
});

const APIStorage = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const API_ROOT_URL: string = 'https://swapi.dev/api/';

  function FETCH_ROOT(): {
    url: string;
    options: {
      method: string;
      headers: {'Content-Type': string};
    };
  } {
    const url = API_ROOT_URL;
    const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return {url, options};
  }

  function FETCH_RESOURCE_LIST(
    slug_resource: string,
    page?: string,
  ): {
    url: string;
    options: {
      method: string;
      headers: {'Content-Type': string};
    };
  } {
    let url: string;
    if (page) {
      url = `${API_ROOT_URL}${slug_resource}/?page=${page}`;
    } else {
      url = `${API_ROOT_URL}${slug_resource}`;
    }

    const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return {url, options};
  }

  function FETCH_RESOURCE(url: string): {
    url: string;
    options: {
      method: string;
      headers: {'Content-Type': string};
    };
  } {
    const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return {url, options};
  }

  const ROOT_RESOURCES = useFetch();

  React.useEffect(() => {
    const {options} = FETCH_ROOT();
    ROOT_RESOURCES.request(API_ROOT_URL, options);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('root', JSON.stringify(ROOT_RESOURCES.data));
  }, [ROOT_RESOURCES.data]);

  return (
    <React.Fragment>
      <APIContext.Provider
        value={{
          API_ROOT_URL,
          ROOT_RESOURCES,
          FETCH_RESOURCE_LIST,
          FETCH_RESOURCE,
        }}
      >
        {children}
      </APIContext.Provider>
    </React.Fragment>
  );
};

export default APIStorage;
