import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DynamicForm from "../common/DynamicForm";
import { postTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();
  const [error, setError] = useState();

  const addTable = (formData, resetForm) => {
    formData = { ...formData, capacity: Number(formData.capacity) };

    const errors = [];

    if (!formData.table_name || formData.table_name.length < 2) {
      errors.push({
        message: `Table name must be at least 2 characters long.`,
      });
    }

    if (!formData.capacity || !formData.capacity >= 1) {
      errors.push({
        message: `Table capacity must be at least 1.`,
      });
    }

    if (errors.length) {
      setError(errors);
      return;
    }

    postTable(formData)
      .then(() => history.push("/dashboard"))
      .then(() => resetForm())
      .then(() => setError())
      .catch(setError);
  };

  return (
    <React.Fragment>
      <h1>Add Table</h1>
      {error && <ErrorAlert error={error} />}
      <DynamicForm
        inputs={[
          {
            inputType: "text",
            id: "table_name",
            name: "table_name",
            formattedName: "Table Name",
            placeholder: "Table Name",
            defaultValue: "",
            className: "col-6",
          },
          {
            inputType: "number",
            id: "capacity",
            name: "capacity",
            formattedName: "Capacity",
            placeholder: "",
            className: "col-6",
          },
        ]}
        submit={{ action: addTable }}
        cancel={{ url: history.goBack }}
      />
    </React.Fragment>
  );
}

export default NewTable;
