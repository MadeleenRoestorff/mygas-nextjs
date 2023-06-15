import axios from "axios";
import { TokenContextInterface } from "./TokenContext";
import { Dispatch, SetStateAction } from "react";
import { StatusCodes } from "http-status-codes";
import gasDataExtract from "../gas/gasTypeResponse";
import elecDataExtract from "../electricity/elecTypeResponse";

interface Payload {
  units?: number;
  topup?: number;
  electricity?: number;
  measuredAt?: string;
}

interface ApiRequestProps {
  urlPathName: string;
  tokenContext: TokenContextInterface;
  setError: Dispatch<SetStateAction<Partial<string>>>;
  setData?: Dispatch<SetStateAction<GasDataInterface[] | ElecDataInterface[]>>;
  method?: string;
  payload?: Partial<Payload>;
}

/**
 * apiRequest is an async function that makes an API request to the server, and then sets the data in the state
 * It takes in an object of type ApiRequestProps, and returns a function that returns a promise
 * @param {ApiRequestProps}  apiRequest
 * @param {string} apiRequest.urlPathName - the pathname of the API endpoint you want to hit
 * @param {TokenContextInterface} apiRequest.tokenContext - tokenStateContext object.
 * @param {Dispatch<SetStateAction<string>>} apiRequest.setError - set error state if axious request fails.
 * @param {Dispatch<SetStateAction<GasDataInterface[] | ElecDataInterface[]>>} apiRequest.setData - set data with axious data.
 * @param {string} apiRequest.method - post patch or get axios method.
 * @param {Payload} apiRequest.payload  - data to post or patch on the server.
 */
const apiRequest = async ({
  urlPathName = "",
  tokenContext,
  setError,
  setData,
  method = "get",
  payload = {}
}: ApiRequestProps) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${urlPathName}`;
  const { token, updateToken } = tokenContext;
  const headers = { Authorization: `Bearer ${token}` };
  // 20 seconde timeout = redirect to login page
  const timeout = 20000;
  const config = { headers, timeout };

  /**
   * If the method is "get", "post" or patch" then return an axios get, post or patch request,
   * otherwise throw an error
   * @returns A function that returns a promise.
   */
  const requestFunction = () => {
    if (method === "get") {
      console.log("DEBUG get");
      return axios.get(url, config);
    } else if (method === "post") {
      return axios.post(url, payload, config);
    } else if (method === "patch") {
      return axios.patch(url, payload, config);
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
        setData(gasDataExtract(response));
      } else if (
        urlPathName.includes("electricity") &&
        Array.isArray(response.data)
      ) {
        setData(elecDataExtract(response));
      } else {
        setError("Success, Utilities was updated");
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
