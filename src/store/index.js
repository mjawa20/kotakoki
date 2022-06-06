import { session } from "$app/stores";
import axios from "axios";

export const restReqeust = async (/** @type {import('axios').AxiosRequestConfig} */config) => {
  const res = await axios(config);
  if (res.data.session) {
    session.set(res.data.session)
    delete res.data.session
  }
  return { status: res.status, body: res.data }
}