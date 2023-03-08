/* eslint-disable max-statements */
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
  uuid: string,
  rate: number
): GasDataInterface => {
  return {
    gasLogID,
    topup,
    units,
    measuredAt,
    uuid,
    rate
  };
};

/**
 * It takes an AxiosResponse object and returns an array of GasDataInterface objects
 * @param {AxiosResponse} response - AxiosResponse - this is the response from the Axios request.
 * @returns An array of GasDataInterface objects.
 */
const gasTypeResponse = (response: AxiosResponse): GasDataInterface[] => {
  const gasResponseArray: GasDataInterface[] = [];
  let prevUnits = 0;
  let prevDate = new Date("1992-11-05").getTime();

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

      const measureTime = measuredAt.getTime();
      // Adjustedments for initial previous values
      prevDate = prevUnits === 0 ? measureTime : prevDate;
      prevUnits = prevUnits === 0 ? units : prevUnits;

      // Calculate raw rate in units per milliseconds
      const deltaTimeMS = measureTime - prevDate;
      const used = units > 0 ? units - topup - prevUnits : 0;
      const rateRaw = used > 0 || deltaTimeMS > 0 ? used / deltaTimeMS : 0;

      // Update previous values with current values
      prevDate = units > 0 ? measureTime : prevDate;
      prevUnits = units > 0 ? units : prevUnits;

      gasResponseArray.push(
        createGasData(
          gasLogID,
          topup,
          units,
          measuredAt,
          uuid,
          Number((rateRaw * -604800).toFixed(4))
        )
      );
    });
  }
  return gasResponseArray;
};

export default gasTypeResponse;
