import axios from "axios";
import { TokenContextInterface } from "./TokenContext";
import { Dispatch, SetStateAction } from "react";
import { StatusCodes } from "http-status-codes";
import gasTypeResponse from "../gas/gasTypeResponse";
import elecTypeResponse from "../electricity/elecTypeResponse";

interface Payload {
  units?: number;
  topup?: number;
}

/**
 * It's an async function that makes an API request to the server, and then sets the data in the state
 * @param  - urlPathName - urlPathName - the pathname of the API endpoint you want to hit
 * @param  - tokenContext - tokenStateContext object.
 * @param  - setError - set error state if axious request fails.
 * @param  - method - post patch or get axios method.
 * @param  - payload - data to post or patch on the server.
 */
const apiRequest = async ({
  urlPathName = "",
  tokenContext,
  setError,
  setData,
  method = "get",
  payload = {}
}: {
  urlPathName: string;

  tokenContext: TokenContextInterface;
  setError: Dispatch<SetStateAction<Partial<string>>>;
  setData: Dispatch<SetStateAction<GasDataInterface[] | ElecDataInterface[]>>;
  method?: string;
  payload?: Partial<Payload>;
}) => {
  const url = `${process.env.PUBLIC_SERVER_URL}/${urlPathName}`;
  const { token, updateToken } = tokenContext;
  const headers = { Authorization: `Bearer ${token}` };

  /**
   * If the method is "get", "post" or patch" then return an axios get, post or patch request,
   * otherwise throw an error
   * @returns A function that returns a promise.
   */
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
      // Creating a new array of GasDataInterface objects.
      // Checking if the response data is an array, and if it is, then it is looping
      // through the array and creating a new array of GasDataInterface objects.
      if (
        response.data &&
        Array.isArray(response.data) &&
        urlPathName.includes("gas")
      ) {
        setData(gasTypeResponse(response));
      } else if (urlPathName.includes("electricity")) {
        setData(elecTypeResponse(response));
      } else {
        console.error("No Data to set");
      }

      // If the response status is 401, then destroy the token and throw an error.
      if (response.status === StatusCodes.UNAUTHORIZED) {
        updateToken({ destroyToken: true });
        throw Error("UNAUTHORIZED");
      }
    })
    // Catching any errors that are thrown by the axios request.
    .catch((axiosErr: Error) => {
      setError(axiosErr.toString());
      console.error("axiosErr", axiosErr);
      updateToken({ destroyToken: true });
    });
};

export default apiRequest;
