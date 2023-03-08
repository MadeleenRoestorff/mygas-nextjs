/* eslint-disable max-statements */
/**
 * It takes in a state object and an action object and returns a new state object
 * @param state - TableStateInteface,
 * @param TableStateInteface.displayTableData - this is the data that will be
 * displayed in the table.
 * @param TableStateInteface.tablefilterParams - parameters to use to filter the
 * displayTableData, and when provided filter the displayTableData
 * @param TableStateInteface.sorted - boolean - if true sort displayTableData with
 * latest first
 * @returns a new state object.
 */
const tableReducer = (
  state: TableStateInteface,
  {
    displayTableData = [],
    tablefilterParams = [],
    sorted = false
  }: TableStateInteface
) => {
  // setting or reseting the data
  // If displayTableData is provided, set the new state.displayTableData
  // to provided displayTableData.
  if (displayTableData.length > 0) {
    const newState = { ...state };
    newState.displayTableData = [...displayTableData];
    return newState;
  }

  // Filtering the table data.
  if (tablefilterParams.length > 0 && state.displayTableData.length > 0) {
    const newState = { ...state };
    tablefilterParams.forEach((filterItem: TableParametersInterface) => {
      const tableData: (GasDataInterface | ElecDataInterface)[] =
        newState.displayTableData;
      const filterData = tableData.filter(
        (entry: GasDataInterface | ElecDataInterface) => {
          if (
            filterItem.filterMaxValue === "" &&
            entry[filterItem.filterColumnKey] >= filterItem.filterMinValue
          ) {
            // return all data (return true*) that are greater than filterMinValue
            return true;
          } else if (
            filterItem.filterMinValue === "" &&
            entry[filterItem.filterColumnKey] <= filterItem.filterMaxValue
          ) {
            // return all data (return true*) that are smaller than filterMaxValue
            return true;
          } else if (
            // Filter out all data (return false*) that are smaller than
            // filterMinValue and greater than filterMaxValue
            entry[filterItem.filterColumnKey] < filterItem.filterMinValue ||
            entry[filterItem.filterColumnKey] > filterItem.filterMaxValue
          ) {
            return false;
          }
          return true;
        }
      );

      newState.displayTableData = filterData;
    });
    return newState;
  }

  // Sorting the table data.
  if (sorted && state.displayTableData.length > 0) {
    const newState = { ...state };
    const tableData: (GasDataInterface | ElecDataInterface)[] =
      newState.displayTableData;
    const sortedData = tableData.sort((a, b) => {
      if (a.measuredAt > b.measuredAt) {
        return -1;
      }
      if (a.measuredAt < b.measuredAt) {
        return 1;
      }
      return 0;
    });
    newState.displayTableData = sortedData;
    return newState;
  }

  return state;
};

export default tableReducer;
