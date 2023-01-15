import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  CloudDownloadIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { Button, PageButton } from "../shared/Button";
import { classNames } from "../shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "../shared/Icons";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { data } from "./Table";

// Define a default UI for filtering
let count;
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
}

// export function deleteFunc({ index }) {
//   const data = data.splice(index, 1);
//   return data;
// }

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DateCell({ value }) {
  const mon = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${mon[month]} ${day}, ${year}`;
  let time;
  if (date.getHours() < 12) {
    time = date.getHours() + ":" + date.getMinutes() + " AM";
  } else {
    time = date.getHours() + ":" + date.getMinutes() + " PM";
  }

  return (
    <div className="flex flex-col">
      <span
        className={classNames(
          " uppercase leading-wide text-gray-800 font-bold text-sm rounded-full shadow-sm"
        )}
      >
        {currentDate}
      </span>
      <span
        className={classNames(
          " text-gray-500 leading-wide font-bold text-xs rounded-full shadow-sm"
        )}
      >
        {time}
      </span>
    </div>
  );
}

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100  text-green-800" : null,
        status.startsWith("invited") ? "bg-gray-200  text-gray-600" : null
        // status.startsWith("offline") ? "bg-red-100 text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}
export function ActionCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10 cursor-pointer hover:text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <div className="flex-shrink-0 h-10 w-10 cursor-pointer hover:text-blue-600">
        <button onClick={""}>
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Table1({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <>
      <div className="bg-gray-50 p-2 flex justify-between rounded-t-lg h-24 items-center">
        <div className="flex flex-col w-[80%]">
          <div className="">
            <span className="text-xl mx-6 font-semibold text-gray-800">
              {"Users"}{" "}
              <span className="bg-green-100 w-full text-green-800 px-2 text-xs rounded-3xl">
                {preGlobalFilteredRows.length} users
              </span>
            </span>
          </div>
          <div className="text-sm text-gray-500 mx-6  ">
            <span>Manage your team members and their team managers</span>
          </div>
        </div>
        <div className=" flex flex-col space-y-4 w-full justify-end mx-2 sm:space-y-0 sm:flex-row sm:space-x-8 ">
          <button className="px-3 py-2 w-fit text-sm h-fit font-semibold rounded-lg border-2 flex items-center bg-gray-100">
            <CloudDownloadIcon className="w-4 h-4 mx-2 text-black" />
            Download CSV
          </button>
          <button className="px-3 py-2 w-fit  font-semibold text-sm rounded-lg border-2 flex items-center text-white bg-blue-600">
            <PlusIcon className="w-4 h-4 mx-2 text-white" />
            Add User
          </button>
        </div>
      </div>
      {/* table */}
      <div className=" flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden  ">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs border-t-2 font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center w-full justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <ArrowDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ArrowUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <>
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                                role="cell"
                              >
                                {cell.column.Cell.name === "defaultRenderer" ? (
                                  <>
                                    <div className="text-sm text-gray-500">
                                      {cell.render("Cell")}
                                    </div>
                                  </>
                                ) : (
                                  cell.render("Cell")
                                )}
                              </td>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 bg-white flex items-center justify-between">
        <div className="flex-1 flex justify-between ">
          <div className="flex items-center">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <ArrowLeftIcon className="w-4 h-4 mx-2 text-gray-400" />
              Previous
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-x-2 mx-4 items-baseline">
              <label>
                <span className="sr-only">Items Per Page</span>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={state.pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mx-4">
              <span className="text-sm text-gray-700">
                Page <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                of <span className="font-medium">{pageOptions.length}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
              <ArrowRightIcon className="w-4 h-4 mx-2 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table1;
