import React from "react";

function DynamicTable({
  headers,
  data,
  defaultSize = 5,
  emptyDataName = "None",
}) {
  const headerMap = Object.values(headers).map((header, index) => (
    <th key={index} scope="col">
      {header}
    </th>
  ));

  const headerKeys = Object.keys(headers);
  const rows = [];

  for (let i = 0; i < defaultSize || i < data.length; i++) {
    const row = data[i];

    rows.push(
      <tr key={i}>
        {headerKeys.map((headerKey, headerIndex) => (
          <td key={i + "-" + headerIndex}>
            {row ? row[headerKey] : emptyDataName}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <table className="table table-bordered table-dynamic">
      <thead>
        <tr>{headerMap}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default DynamicTable;
