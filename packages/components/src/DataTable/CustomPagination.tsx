import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import axios from "axios";
import { DataTable } from ".";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export function CustomPagination() {
  const [posts, setPosts] = useState<Post[]>([]);
  //   const [sorting, setSorting] = useState<SortingState>([
  //     { id: "id", desc: true },
  //   ]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    // const url = `https://jsonplaceholder.typicode.com/posts`;
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${
      pageIndex + 1
    }&_limit=${pageSize}`;
    axios.get(url).then(response => {
      console.log("enter...." + pageIndex);
      setPosts(response.data);
    });
    // }, []);
  }, [pageIndex, pageSize]);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  //   const defaultData = useMemo(() => [], []);
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorFn: row => row.id,
        id: "id",
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.title,
        id: "title",
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.body,
        id: "body",
        cell: info => info.getValue(),
      },
    ],
    [],
  );
  return (
    <div>
      <DataTable
        data={posts}
        columns={columns}
        pagination={{
          manualPagination: true,
          onPaginationChange: setPagination,
          pageCount: Math.ceil(100 / pageSize),
          totalItems: 100,
          state: pagination,
        }}
        height={400}
        stickyHeader
      />
    </div>
  );
}
