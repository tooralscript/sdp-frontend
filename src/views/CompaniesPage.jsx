import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { companiesRequestsList } from "../features/companies";

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(companiesRequestsList());
  }, []);

  const columns = [
    {
      title: "cik",
      dataIndex: "cik",
      key: "cik",
    },
    {
      title: "ticker",
      dataIndex: "ticker",
      key: "ticker",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={companies?.items}
      loading={companies.loading}
    ></Table>
  );
}
