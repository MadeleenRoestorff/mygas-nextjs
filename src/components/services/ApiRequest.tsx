import axios from "axios";
import { TokenContextInterface } from "./TokenContext";
import { Dispatch, SetStateAction } from "react";
import { StatusCodes } from "http-status-codes";

interface Payload {
  units?: number;
  topup?: number;
}

/**
 * createGasData is a function that takes in 6 parameters and returns an object with the same 6
 * properties
 * @param {number} gasLogID - The ID of the gas log.
 * @param {Date} createdAt  - Creation date of gas entry,
 * @param {number} topup    - The topup amount of gas the user added.
 * @param {number} units    - The number of units of gas used.
 * @param {Date} updatedAt  - Update date of gas entry,
 * @param {string} uuid     - The unique identifier for the gas data entry.
 * @returns An object with the following properties:
 * gasLogID,
 * createdAt,
 * topup,
 * units,
 * updatedAt,
 * uuid
 */
const createGasData = (
  gasLogID: number,
  createdAt: Date,
  topup: number,
  units: number,
  updatedAt: Date,
  uuid: string
): GasDataInterface => {
  return {
    gasLogID,
    createdAt,
    topup,
    units,
    updatedAt,
    uuid
  };
};

/**
 * It makes an API request to the server, and then sets the data in the state
 * @param  - urlPathName - the pathname of the API endpoint you want to hit
 */
const apiRequest = async ({
  urlPathName = "",
  method = "get",
  context,
  setError,
  setData,
  payload = {}
}: {
  urlPathName: string;
  method: string;
  context: TokenContextInterface;
  setError: Dispatch<SetStateAction<Partial<string>>>;
  setData: Dispatch<SetStateAction<GasDataInterface[]>>;
  payload?: Partial<Payload>;
}) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${urlPathName}`;
  const { token, updateToken } = context;
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
      const gasResponseArray: GasDataInterface[] = [];

      // Checking if the response data is an array, and if it is, then it is looping through
      // the array and creating a new array of GasDataInterface objects.
      if (response.data && Array.isArray(response.data)) {
        response.data.forEach((gasEntry: GasDataInterface) => {
          let gasLogID = 0;
          let createdAt = new Date(Date.now());
          let topup = 0;
          let units = 0;
          let updatedAt = new Date(Date.now());
          let uuid = "";

          Object.entries(gasEntry).forEach(([label, value]) => {
            if (label === "GasLogID" && typeof value === "number") {
              gasLogID = value;
            }
            if (label === "createdAt" && typeof value === "string") {
              createdAt = new Date(value);
            }
            if (label === "topup" && typeof value === "number") {
              topup = value;
            }
            if (label === "units" && typeof value === "number") {
              units = value;
            }
            if (label === "updatedAt" && typeof value === "string") {
              updatedAt = new Date(value);
            }
            if (label === "uuid" && typeof value === "string") {
              uuid = value;
            }
          });

          gasResponseArray.push(
            createGasData(gasLogID, createdAt, topup, units, updatedAt, uuid)
          );
        });

        setData(gasResponseArray);
      } else {
        console.error("No Data to set");
      }

      /* If the response status is 401, then destroy the token and throw an error. */
      if (response.status === StatusCodes.UNAUTHORIZED) {
        updateToken({ destroyToken: true });
        throw Error("UNAUTHORIZED");
      }
    })
    /* Catching any errors that are thrown by the axios request. */
    .catch((axiosErr: Error) => {
      setError(axiosErr.toString());
      console.error("axiosErr", axiosErr);
      updateToken({ destroyToken: true });
    });
};

export default apiRequest;
