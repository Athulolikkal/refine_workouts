import { useState, useMemo, useEffect } from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { BlogPostEdit } from "../../pages/blog-posts/edit";
// import dataProvider from "@refinedev/simple-rest";
import axios from "../../AuthenticationApis/api";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();
  const [data, setData] = useState([]);

  const dataFetch = async () => {
    try {
      const response = await axios.get("/users");
      const newData=response?.data
      newData.reverse()
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <BlogPostEdit recordItemId={row.id} dataFetch={dataFetch} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} rows={data} columns={columns} autoHeight />
    </List>
  );
};
