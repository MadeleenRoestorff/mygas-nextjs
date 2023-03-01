import { AxiosResponse } from "axios";
/**
 * createElecData is a function that takes in 6 parameters and returns an object with the same 6
 * properties
 * @param {number} ElecLogID   - The ID of the electricity log.
 * @param {number} electricity - The electricity usage.
 * @param {string} uuid        - The unique identifier for the electricity data entry.
 * @param {Date} measuredAt    - Date of electricity measurement,
 * @returns An object with the following properties:
 * ElecLogID,
 * electricity,
 * uuid,
 * measuredAt,
 */
const createElecData = (
  ElecLogID: number,
  electricity: number,
  used: number,
  uuid: string,
  measuredAt: Date
): ElecDataInterface => {
  return {
    ElecLogID,
    electricity,
    used,
    uuid,
    measuredAt
  };
};

/**
 * It takes an AxiosResponse object and returns an array of ElecDataInterface objects
 * @param {AxiosResponse} response - AxiosResponse - This is the response from the API call.
 * @returns An array of ElecDataInterface objects.
 */
const elecDataType = (response: AxiosResponse): ElecDataInterface[] => {
  const elecResponseArray: ElecDataInterface[] = [];
  let prevReading = 0;

  if (response.data && Array.isArray(response.data)) {
    response.data.forEach((elecEntry: ElecDataInterface) => {
      let ElecLogID = 0;
      let electricity = 0;
      let uuid = "";
      let measuredAt = new Date();

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

      // Electricity Usage Calculations
      const used =
        electricity - (prevReading === 0 ? electricity : prevReading);
      prevReading = electricity;

      elecResponseArray.push(
        createElecData(ElecLogID, electricity, used, uuid, measuredAt)
      );
    });
  }
  return elecResponseArray;
};

export default elecDataType;
