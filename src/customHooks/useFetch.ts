import { useEffect, useReducer, useRef, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants";
// Hook
// State & hook output

interface State<T> {
  currentStatus: "init" | "fetching" | "error" | "fetched";
  data?: T | any;
  error?: string;
}

interface Cache<T> {
  [url: string]: T;
}
// discriminated union type

type Action<T> =
  | { type: "request" }
  | { type: "success"; payload: T }
  | { type: "failure"; payload: string };

const useFetchCharacters = <T = unknown>(
  url?: string,
  list?: [string],
  options?: AxiosRequestConfig
): State<T> => {
  const cache = useRef<Cache<T>>({});
  let cancelRequest = false;

  const initialState: State<T> = {
    currentStatus: "init",
    error: undefined,
    data: undefined
  };

  // Keep state logic separated

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "request":
        return { ...initialState, currentStatus: "fetching" };
      case "success":
        return {
          ...initialState,
          currentStatus: "fetched",
          data: action.payload
        };
      case "failure":
        return {
          ...initialState,
          currentStatus: "error",
          error: action.payload
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const fetchUrl = `${BASE_URL}${url}`;
  const fetchData = useCallback(
    async (url: string) => {
      dispatch({ type: "request" });
      if (cache.current[url]) {
        dispatch({ type: "success", payload: cache.current[url] });
      } else {
        try {
          let result: any = [];
          if (list) {
            await Promise.all(
              list.map((obj) =>
                axios.get(fetchUrl + obj).then((response) => {
                  result.push(response.data);
                })
              )
            );
            cache.current[url] = result;
            if (cancelRequest) return;
            dispatch({ type: "success", payload: result });
          } else {
            const response = await axios(fetchUrl, options);
            cache.current[url] = response.data;
            if (cancelRequest) return;
            dispatch({ type: "success", payload: response.data });
          }
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "failure", payload: error.message });
        }
      }
    },
    [fetchUrl, options, cancelRequest]
  );

  useEffect(() => {
    if (!url) return;
    fetchData(url);
    return () => {
      cancelRequest = true;
    };
  }, [url]);
  return state;
};

export default useFetchCharacters;
