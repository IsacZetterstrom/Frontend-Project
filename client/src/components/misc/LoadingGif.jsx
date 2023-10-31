import React from "react";
import loading from "../../assets/loading.gif";
function LoadingGif() {
  try {
    return <img src={loading} className="loading-pic" />;
  } catch (error) {
    console.log(error);
  }
}

export default LoadingGif;
