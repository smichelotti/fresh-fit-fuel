import { useState, useRef, useEffect } from 'react';
// import { GetConfiguration } from './ConfigurationService';


//export default function useFetch(url) {
export const useFetch = <T>(url: string) => {
  const isMounted = useRef(false);
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}

export const useWebApi = <T>(action: Promise<Response>) => {
  
  const isMounted = useRef(false);
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await action;
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();

    return () => {
      isMounted.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
}
