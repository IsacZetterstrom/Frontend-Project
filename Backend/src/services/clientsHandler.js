import screeningModel from "../models/screeningModel.js";

let clients = [];

/**
* @Author: Oliver Andersson
*@Description: Sends screening data to all clients listening to provided screeningId
*/
function broadcastTo(screeningId) {
  clients.forEach(async client => {
    if (client.screeningId == screeningId) {
      const screening = await screeningModel.getScreening(screeningId);
      client.res.write("data: " + JSON.stringify(screening[0]) + "\n\n");
    }
  })
}

/**
* @Author: Oliver Andersson
*@Description: Removes a connection from clients array
*/
function closeConnection(res) {
  clients = clients.filter(client => client.res !== res);
}


export default {clients, broadcastTo, closeConnection}