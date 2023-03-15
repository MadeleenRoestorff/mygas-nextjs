/* eslint-disable max-statements */
import { AxiosResponse } from "axios";

/**
 * If the type of the value is object and the value is not an array, then return true.
 * @param {unknown} val - unknown - This is the value that we want to check.
 * @returns A function that takes a value and returns true if the value is an object and not an array.
 */
const isObject = (val: unknown): val is object => {
  return typeof val === "object" && !Array.isArray(val);
};

/**
 * createGasData takes a gas entry object, the previous units and date, and returns a gas data object
 * @param {object} gasEntry  - object - This is the object that is returned from the API.
 * @param {number} prevUnits - The previous units value.
 * @param {number} prevDate  - The date of the previous gas entry in SECONDS.
 * @returns An object with the following properties:
 * - gasLogID   - The ID of the gas log.
 * - topup      - The topup amount of gas the user added.
 * - units      - The number of units of gas used.
 * - measuredAt - Date of gas measurement.
 * - uuid       - The unique identifier for the gas data entry.
 */
const createGasData = (
  gasEntry: object,
  prevUnits: number,
  prevDate: number
): GasDataInterface => {
  let gasLogID = 0;
  let topup = 0;
  let units = 0;
  let measuredAt = new Date(Date.now());
  let uuid = "";

  if (isObject(gasEntry)) {
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
  }

  const measureTime = measuredAt.getTime();
  // Adjustedments for initial previous values
  const prevDateTemp = prevUnits === 0 ? measureTime : prevDate;
  const prevUnitsTemp = prevUnits === 0 ? units : prevUnits;

  // Calculate raw rate in units per milliseconds
  const deltaTimeMS = measureTime - prevDateTemp;
  const used = units > 0 ? units - topup - prevUnitsTemp : 0;
  const rateRaw = used > 0 || deltaTimeMS > 0 ? used / deltaTimeMS : 0;
  const rate = Number((rateRaw * -604800).toFixed(4));

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
 * gasDataExtract takes an AxiosResponse object and returns an array of GasDataInterface objects
 * with a new property (rate) added to each GasDataInterface object.
 * @param {AxiosResponse} response - AxiosResponse - This is the response object that is returned from
 * the Axios request.
 * @returns An array of GasDataInterface objects
 */
const gasDataExtract = (response: AxiosResponse): GasDataInterface[] => {
  // Initialise
  const gasResponseArray: GasDataInterface[] = [];
  let prevUnits = 0;
  let prevDate = new Date("1992-11-05").getTime();

  // Check if there is response data and response data is an array
  if (response.data && Array.isArray(response.data)) {
    // Loop through all the response data
    response.data.reverse().forEach((gasEntry: GasDataInterface) => {
      // Create a new Gas data object and push it to gasResponseArray
      const newGasDataObject = createGasData(gasEntry, prevUnits, prevDate);
      gasResponseArray.push(newGasDataObject);

      // Update previous values with current values
      prevUnits =
        newGasDataObject.units > 0 ? newGasDataObject.units : prevUnits;
      prevDate =
        newGasDataObject.units > 0
          ? newGasDataObject.measuredAt.getTime()
          : prevDate;
    });
  }
  return gasResponseArray.reverse();
};

export default gasDataExtract;
