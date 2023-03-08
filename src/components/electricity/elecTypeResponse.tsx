import { AxiosResponse } from "axios";
/**
 * createElecData is a function that takes in 6 parameters and returns an object with the same 6
 * properties
 * @param {number} ElecLogID   - The ID of the electricity log.
 * @param {number} electricity - The total electricity usage thusfar.
 * @param {string} uuid        - The unique identifier for the electricity data entry.
 * @param {Date} measuredAt    - Date of electricity measurement,
 * @param {number} used        - The electricty usage since previous reading,
 * @returns An object with the following properties:
 * ElecLogID,
 * electricity,
 * uuid,
 * measuredAt,
 * used
 */

/**
 * If the type of the value is object and the value is not an array, then return true.
 * @param {unknown} val - unknown - This is the value that we want to check.
 * @returns A function that takes a value and returns true if the value is an object and not an array.
 */
const isObject = (val: unknown): val is object => {
  return typeof val === "object" && !Array.isArray(val);
};

const electDataObject = (
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
 * It takes an AxiosResponse object and returns an array of ElecDataInterface objects.
 * @param {AxiosResponse} response - AxiosResponse - This is the response from the API call.
 * @returns An array of ElecDataInterface objects.
 */
const elecDataType = (response: AxiosResponse): ElecDataInterface[] => {
  const elecResponseArray: ElecDataInterface[] = [];
  let prevElec = 0;
  if (response.data && Array.isArray(response.data)) {
    response.data.forEach((elecEntry: ElecDataInterface) => {
      const newElectDataObject = electDataObject(elecEntry, prevElec);
      elecResponseArray.push(newElectDataObject);
      prevElec = newElectDataObject.electricity;
    });
  }
  return elecResponseArray;
};

export default elecDataType;
