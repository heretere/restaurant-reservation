import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function DynamicForm({
  inputs,
  submit: { name: submitName = "Submit", action: submitAction } = {},
  cancel: { name: cancelName = "Cancel", url: cancelUrl } = {},
}) {
  const history = useHistory();
  const initialForm = {};

  inputs.forEach((input) => (initialForm[input.name] = input.defaultValue));

  const [formData, setFormData] = useState({ ...initialForm });

  const inputList = inputs.map((input, idx) => {
    const updateFormData = (e) => {
      e.persist();
      setFormData((currentFormData) => ({
        ...currentFormData,
        [e.target.name]: e.target.value,
      }));
    };

    let inputField;

    switch (input.inputType) {
      case "textarea":
        inputField = (
          <textarea
            className="form-control"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={updateFormData}
            rows={4}
            required={true}
          />
        );
        break;
      case "select":
        inputField = (
          <select
            className="form-control"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={updateFormData}
            required={true}
          >
            {input.options}
          </select>
        );
        break;
      default:
        inputField = (
          <input
            type={input.inputType}
            className="form-control"
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={updateFormData}
            required={true}
            min={input.min}
          />
        );
    }

    return (
      <div
        key={idx}
        className={(input.className || "col-12") + " d-flex flex-column"}
      >
        <label className="form-label mt-2" htmlFor={input.id}>
          {input.formattedName}
        </label>

        {inputField}
      </div>
    );
  });

  return (
    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        submitAction(formData, () => setFormData({ ...initialForm }));
      }}
    >
      <div className="row">{inputList}</div>
      <div className="row col-12 mt-4">
        <div className="pr-2 col-6">
          <button
            className="btn btn-secondary col-12"
            onClick={
              typeof cancelUrl === "string"
                ? () => history.push(cancelUrl)
                : cancelUrl
            }
          >
            {cancelName}
          </button>
        </div>

        <div className="pl-2 col-6">
          <button type="submit" className="btn btn-primary col-12">
            {submitName}
          </button>
        </div>
      </div>
    </form>
  );
}

export default DynamicForm;
