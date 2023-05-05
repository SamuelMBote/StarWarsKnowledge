import React from 'react';

const useFetch = () => {
  const [data, setData]: [any, React.Dispatch<React.SetStateAction<any>>] =
    React.useState<any>(null);

  const [error, setError]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = React.useState<string | null>(null);

  const [loading, setLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(false);

  const request: (
    url: string,
    options: {
      [key: string]: any;
    },
  ) => Promise<{
    response: Response | undefined;
    json: any;
  }> = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);

      json = await response.json();

      if (response.ok === false) {
        if ('message' in json) {
          throw new Error(json.message);
        } else {
          throw new Error('Erro ao fazer fetch');
        }
      }
    } catch (error) {
      json = null;
      if (error instanceof Error) setError(error.message);
    } finally {
      setData(json);
      setLoading(false);
      return {response, json};
    }
  }, []);
  return {data, loading, error, request};
};

export default useFetch;
