import { AxiosResponse } from "axios";
/**
 * createGasData is a function that takes in 6 parameters and returns an object with the same 6
 * properties
 * @param {number} gasLogID - The ID of the gas log.
 * @param {number} topup    - The topup amount of gas the user added.
 * @param {number} units    - The number of units of gas used.
 * @param {Date} measuredAt - Date of gas measurement,
 * @param {string} uuid     - The unique identifier for the gas data entry.
 * @returns An object with the following properties:
 * gasLogID,
 * topup,
 * units,
 * measuredAt,
 * uuid
 */
const createGasData = (
  gasLogID: number,
  topup: number,
  units: number,
  measuredAt: Date,
  uuid: string
): GasDataInterface => {
  return {
    gasLogID,
    topup,
    units,
    measuredAt,
    uuid
  };
};

/**
 * It takes an AxiosResponse object and returns an array of GasDataInterface objects
 * @param {AxiosResponse} response - AxiosResponse - this is the response from the Axios request.
 * @returns An array of GasDataInterface objects.
 */
const gasTypeResponse = (response: AxiosResponse): GasDataInterface[] => {
  const gasResponseArray: GasDataInterface[] = [];

  if (response.data && Array.isArray(response.data)) {
    response.data.forEach((gasEntry: GasDataInterface) => {
      let gasLogID = 0;
      let topup = 0;
      let units = 0;
      let measuredAt = new Date(Date.now());
      let uuid = "";

      Object.entries(gasEntry).forEach(([label, value]) => {
        if (label === "GasLogID" && typeof value === "number") {
          gasLogID = value;
        }
        if (label === "topup" && typeof value === "number") {
          topup = value;
        }
        if (label === "units" && typeof value === "number") {
          units = value;
        }
        if (label === "measuredAt" && typeof value === "string") {
          measuredAt = new Date(value);
        }
        if (label === "uuid" && typeof value === "string") {
          uuid = value;
        }
      });

      gasResponseArray.push(
        createGasData(gasLogID, topup, units, measuredAt, uuid)
      );
    });
  }
  return gasResponseArray;
};

export default gasTypeResponse;
