import React from "react";

function DynamicTable({
  headers,
  data,
  mappers,
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
        {headerKeys.map((headerKey, headerIndex) => {
          const key = i + "-" + headerIndex;

          if (!row || (row && !mappers[headerKey])) {
            return <td key={key}>{row ? row[headerKey] : emptyDataName}</td>;
          } else {
            return mappers[headerKey](key, row);
          }
        })}
      </tr>
    );
  }

  return (
    <div className="col-auto table-responsive text-center">
      <table className="table table-bordered table-dynamic">
        <thead>
          <tr>{headerMap}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
