import { useEffect, useState } from "react";
import fetchService from "../service/FetchService";

/**
 * @author Niklas Nguyen
 * @description this hook fetches movie depending on quary and if the user havnt type or changed anything for a second it fetches
 */

function useQuaryMovie(search, sort, filter) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    if (search == undefined) search = "";
    if (sort == undefined) sort = "";
    if (filter == undefined) filter = "";
    const resultTimeoutId = setTimeout(async () => {
      try {
        setErr(false);
        setLoading(true);
        const response = await fetchService.fetchJson(`/api/movies?filter=${filter}&sort=${sort}&search=${search}`, "GET");
        if (response.error !== undefined) setErr(true);
        setData(response);
      } catch (err) {
        setErr(true);
      } finally {
        setLoading(false);
      }

      setLoading(false);
    }, 1000);

    return () => clearTimeout(resultTimeoutId);
  }, [search, sort, filter]);
  return { loading, err, data };
}
export default useQuaryMovie;
