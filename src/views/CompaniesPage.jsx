import React, { useEffect } from "react";
import { Table, Tag } from "antd";
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
      title: "cik".toUpperCase(),
      dataIndex: "cik",
      key: "cik",
      render: (text, record) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "ticker".toUpperCase(),
      dataIndex: "ticker",
      key: "ticker",
      render: (text, record) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "name".toUpperCase(),
      dataIndex: "name",
      key: "name",
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination) {
      handlePaginationChange(pagination);
    }
  };

  const handlePaginationChange = (pagination) => {
    dispatch(
      companiesRequestsList({
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
  };
  return (
    <Table
      style={{ margin: "10px" }}
      columns={columns}
      dataSource={companies?.items}
      loading={companies.loading}
      scroll={{ y: 600 }}
      bordered={true}
      pagination={companies.pagination}
      onChange={handleTableChange}
    ></Table>
  );
}
