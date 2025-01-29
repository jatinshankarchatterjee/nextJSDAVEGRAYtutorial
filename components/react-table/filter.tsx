import { Column } from "@tanstack/react-table";
import DebouncedInput from "@/components/react-table/debounced-input";

type Props<T> = {
  column: Column<T, unknown>;
  filteredRows: string[];
};

export function Filter<T>({ column, filteredRows }: Props<T>) {
  const columnFilterValue = column.getFilterValue();

  const uniqueFilteredValues = new Set(filteredRows);

  const sortedFilterVlaues = Array.from(uniqueFilteredValues).sort();
  return (
    <div>
      <datalist id={column.id + "list"}>
        {sortedFilterVlaues.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>

      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search (${uniqueFilteredValues.size})...`}
        className="w-full"
        list={column.id + "list"}
      />
    </div>
  );
}
