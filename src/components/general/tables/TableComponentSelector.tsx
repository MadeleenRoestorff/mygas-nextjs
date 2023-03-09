import ElectricityTable from "../../electricity/ElecTable";
import GasTable from "../../gas/GasTable";

interface TableComponentSelectorProps {
  urlPathName: "gas" | "electricity";
  triggerDataRefresh: () => Promise<void>;
  tableDisplayData: GasDataInterface[] | ElecDataInterface[];
  addNew: boolean;
}
/**
 * TableComponentSelector takes in a urlPathName, a triggerDataRefresh function, and a tableDisplayData array,
 * and returns either a GasTable or an ElectricityTable component, depending on the urlPathName
 * @param {TableComponentSelectorProps} tableComponentSelectorProps
 * @param {string} tableComponentSelectorProps.urlPathName - this is the url path name that is used to
 * determine which table to display.
 * @param {() => Promise<void>} tableComponentSelectorProps.triggerDataRefresh - the function that is
 * passed down that will be used to refresh the data
 * @param {GasDataInterface[] | ElecDataInterface[]} tableComponentSelectorProps.tableDisplayData - Array of
 * GasDataInterface[] or ElecDataInterface[] objects to display in the table component
 * @returns A table component.
 */
export default function TableComponentSelector({
  urlPathName,
  triggerDataRefresh,
  tableDisplayData,
  addNew
}: TableComponentSelectorProps) {
  if (urlPathName === "electricity") {
    return (
      <ElectricityTable
        triggerDataRefresh={triggerDataRefresh}
        displayData={tableDisplayData}
        addNew={addNew}
      />
    );
  }
  return (
    <GasTable
      triggerDataRefresh={triggerDataRefresh}
      displayData={tableDisplayData}
      addNew={addNew}
    />
  );
}
