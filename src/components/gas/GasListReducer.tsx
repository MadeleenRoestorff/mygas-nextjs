/**
 * It takes in a state object and an action object and returns a new state object
 * @param state - GasDisplayStateInteface,
 * @param GasTableStateInteface.displayTableGasData - this is the data that will be
 * displayed in the table.
 * @param GasTableStateInteface.tablefilterParams - parameters to use to filter the
 * displayTableGasData, and when provided filter the displayTableGasData
 * @param GasTableStateInteface.sorted - boolean - if true sort displayTableGasData with
 * latest first
 * @returns a new state object.
 */
const gasTableReducer = (
  state: GasTableStateInteface,
  {
    displayTableGasData = [],
    tablefilterParams = [],
    sorted = false
  }: GasTableStateInteface
) => {
  // setting or reseting the data
  // If displayTableGasData is provided, set the new state.displayTableGasData
  // to provided displayTableGasData.
  if (displayTableGasData.length > 0) {
    const newState = { ...state };
    newState.displayTableGasData = [...displayTableGasData];
    return newState;
  }

  /* Filtering the gas data. */
  if (tablefilterParams.length > 0 && state.displayTableGasData.length > 0) {
    const newState = { ...state };
    newState.tablefilterParams = tablefilterParams;
    tablefilterParams.forEach((filterItem: GasFilterParametersInterface) => {
      const filterData = newState.displayTableGasData.filter(
        (gasEntry: GasDataInterface) => {
          if (
            filterItem.filterMaxValue === "" &&
            gasEntry[filterItem.filterColumnKey] >= filterItem.filterMinValue
          ) {
            // return all data (return true*) that are greater than filterMinValue
            return true;
          } else if (
            filterItem.filterMinValue === "" &&
            gasEntry[filterItem.filterColumnKey] <= filterItem.filterMaxValue
          ) {
            // return all data (return true*) that are smaller than filterMaxValue
            return true;
          } else if (
            // Filter out all data (return false*) that are smaller than
            // filterMinValue and greater than filterMaxValue
            gasEntry[filterItem.filterColumnKey] < filterItem.filterMinValue ||
            gasEntry[filterItem.filterColumnKey] > filterItem.filterMaxValue
          ) {
            return false;
          }
          return true;
        }
      );

      newState.displayTableGasData = filterData;
    });
    return newState;
  }

  /* Sorting the gas data. */
  if (sorted && state.displayTableGasData.length > 0) {
    const newState = { ...state };
    const sortedData = newState.displayTableGasData.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      return 0;
    });
    newState.displayTableGasData = sortedData;
    return newState;
  }

  return state;
};

export default gasTableReducer;
