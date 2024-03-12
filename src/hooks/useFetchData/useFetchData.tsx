import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface ServerData<T> {
  data: { list: T[]; stop_running: boolean };
  loading: boolean;
  error: AxiosError<any> | null;
  updateUrl: (newUrl: string) => void;
}

export const useServerData = <T,>(initialUrl: string): ServerData<T> => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState<{ list: T[]; stop_running: boolean }>({
    list: [],
    stop_running: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError<any, any> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ list: T[]; stop_running: boolean }>(
          url
        );
        const newData = [...data.list, ...response.data.list];

        setData({ list: newData, stop_running: response.data.stop_running });
        setLoading(false);
      } catch (error) {
        setError(error as AxiosError<any, any>);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // In a real-world environment, I'd add in logic here to cancel the request
    };
  }, [url]);

  const updateUrl = (newUrl: string) => {
    setUrl(newUrl);
  };

  return { data, loading, error, updateUrl };
};
