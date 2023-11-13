import { useEffect, useState } from "react";

function useEventSource(url) {
  const [err, setErr] = useState(false);
  const [screeningData, setScreeningData] = useState();
  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
      setScreeningData(JSON.parse(event.data));
    };

    eventSource.onerror = (e) => {
      setErr(true);
    };

    return () => eventSource.close();
  }, [url]);
  return { err, screeningData };
}
export default useEventSource;
