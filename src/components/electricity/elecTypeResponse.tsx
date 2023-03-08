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
 * createElectData takes an object and a number and returns an object
 * @param {object} elecEntry - object - This is the object that is passed in from the API.
 * @param {number} prevElec - number  - This is the previous electricity reading.
 * @returns An object with the following properties:
 * - ElecLogID - number     - The ID of the electricity log.
 * - electricity - number   - The total electricity usage thusfar.
 * - uuid - string          - The unique identifier for the electricity data entry.
 * - measuredAt - string    - Date of electricity measurement,
 * - used - number          - The electricty usage since previous reading,
 */
const createElectData = (
  elecEntry: object,
  prevElec: number
): ElecDataInterface => {
  let ElecLogID = 0;
  let electricity = 0;
  let uuid = "";
  let measuredAt = new Date();

  if (isObject(elecEntry)) {
    Object.entries(elecEntry).forEach(([label, value]) => {
      if (label === "ElecLogID" && typeof value === "number") {
        ElecLogID = value;
      }
      if (label === "electricity" && typeof value === "number") {
        electricity = value;
      }
      if (label === "uuid" && typeof value === "string") {
        uuid = value;
      }
      if (label === "measuredAt" && typeof value === "string") {
        measuredAt = new Date(value);
      }
    });
  }

  // Electricity Usage Calculations
  const used = electricity - (prevElec === 0 ? electricity : prevElec);

  return {
    ElecLogID,
    electricity,
    uuid,
    measuredAt,
    used
  };
};

/**
 * ElecDataExtract takes an AxiosResponse object and returns an array of ElecDataInterface objects
 * with a new property (usage) added to each ElecDataInterface object.
 * @param {AxiosResponse} response - AxiosResponse - This is the response from the API call.
 * @returns An array of ElecDataInterface objects that have been modified from the original data.
 */
const elecDataExtract = (response: AxiosResponse): ElecDataInterface[] => {
  const elecResponseArray: ElecDataInterface[] = [];
  let prevElec = 0;
  if (response.data && Array.isArray(response.data)) {
    response.data.forEach((elecEntry: ElecDataInterface) => {
      const newElectDataObject = createElectData(elecEntry, prevElec);
      elecResponseArray.push(newElectDataObject);
      // Update previous electricty reading
      prevElec = newElectDataObject.electricity;
    });
  }
  return elecResponseArray;
};

export default elecDataExtract;
