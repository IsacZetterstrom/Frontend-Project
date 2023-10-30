import { useEffect, useState } from "react";
import fetchService from "../service/FetchService";

/**
 * @author Niklas Nguyen
 * @description this hook takes in a url and everytime the url changes and sends into this hook it re fetches with a GET request from the url
 * @param url is the path from the server
 * @returns loading, err, data
 */

function useFetchData(url) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    (async function () {
      try {
        setErr(false);
        setLoading(true);
        const response = await fetchService.fetchJson(url, "GET");
        if (response.error !== undefined) setErr(true);
        setData(response);
      } catch (err) {
        setErr(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { loading, err, data };
}
export default useFetchData;
