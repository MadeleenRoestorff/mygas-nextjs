import axios from "axios";
import { TokenContextInterface } from "./TokenContext";
import { Dispatch, SetStateAction } from "react";
import { StatusCodes } from "http-status-codes";

interface Payload {
  units?: number;
  topup?: number;
}

const apiRequest = async ({
  urlPathName = "",
  method = "get",
  context = {} as TokenContextInterface,
  setError = {} as Dispatch<SetStateAction<Partial<string>>>,
  payload = {}
}: {
  urlPathName: string;
  method: string;
  context: TokenContextInterface;
  setError: Dispatch<SetStateAction<Partial<string>>>;
  payload?: Partial<Payload>;
}) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${urlPathName}`;
  const { token, updateToken } = context;
  const headers = { Authorization: `Bearer ${token}` };

  const requestFunction = () => {
    if (method === "get") {
      return axios.get(url, { headers });
    } else if (method === "post") {
      return axios.post(url, payload, { headers });
    } else if (method === "patch") {
      return axios.patch(url, payload, { headers });
    }
    throw Error("No method specified");
  };

  await requestFunction()
    .then((response) => {
      console.log("reponse", response);
      console.log("reponse.data", response?.data);
      if (response.status === StatusCodes.UNAUTHORIZED) {
        updateToken({ destroyToken: true });
        throw Error("UNAUTHORIZED");
      }
    })
    .catch((axiosErr: Error) => {
      setError(axiosErr.toString());
      console.error("axiosErr", axiosErr);
      if (axiosErr?.message === "Network Error") {
        updateToken({ destroyToken: true });
      }
    });
};

export default apiRequest;
