import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyC1FgAgWDO_kBEUQkDBu9sQ0CTyrm8DCqs",
  }
});

export default request;