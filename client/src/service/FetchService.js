/**
 * @author niklas Nguyen
 * @description this service exports a finnish fetch build for json or a server response
 */

async function fetchOptions (url, method, data) {

    // "authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`,
    
    const options = {
        method: method,
        headers: {
        "Content-Type": "application/json",
        },
        };
        
    if (method !== "GET") {
        fetchOptions.body = JSON.stringify(data);
    }
      
    return await fetch(url, options);
};

async function fetchJson(url,method,data){
    return await (await fetchOptions(url,method,data)).json()
}

async function fetchRes(url,method,data){
    return await fetchOptions(url,method,data)
}

const FetchService = {fetchJson,fetchRes}
  export default FetchService