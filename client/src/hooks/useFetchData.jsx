import { useState } from "react";
import FetchService from "../service/FetchService";

/**
 * @author Niklas Nguyen
 * @description this hook takes in a url and everytime the url changes and sends into this hook it re fetches with a GET request from the url
 * @param url is the path from the server
 * @returns loading, err, data
 */

function useFetchData(url) {
  const [loading, setloading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    (async function () {
      try {
        setloading(true);
        const response = await FetchService.fetchJson(url, "GET");
        setData(response);
      } catch (err) {
        setErr(true);
      } finally {
        setloading(false);
      }
    })();
  }, [url]);
  return { loading, err, data };
}
export default useFetchData;
