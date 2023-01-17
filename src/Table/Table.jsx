import React from "react";
import { datas } from "./content";
import Table1, {
  ActionCell,
  AvatarCell,
  DateCell,
  SelectColumnFilter,
  StatusPill,
} from "./Table1";

const Table = () => {
//   const [user, setUsers] = useState([]);

//   useEffect(() => {
//     const users = datas;
//     setUsers(users);
//     // console.log(users);
//   }, []);

//   const data_func = () => {
//     let data = user;
//     console.log(data);
//     return [...data, ...data, ...data];
//   };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
      {
        Header: "Last Login",
        accessor: "login",
        Cell: DateCell,
      },
      {
        // Header: "Action",
        accessor: "action",
        Cell: ActionCell,
      },
    ],
    []
  );

  const data = React.useMemo(() => datas, []);

  return (
    // <div className="min-h-screen bg-gray-100 text-gray-900">
    <main className="w-full ">
      {/* <div className="mt-6"> */}
      <Table1 columns={columns} data={data} /> {/* </div> */}
    </main>
    // </div>
  );
};

export default Table;
