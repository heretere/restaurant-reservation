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

    return (
      <div key={idx} className="mb-3">
        <label className="form-label" htmlFor={input.id}>
          {input.formattedName}
        </label>
        {input.inputType === "textarea" ? (
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
        ) : (
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
        )}
      </div>
    );
  });

  return (
    <div className="row">
      <div className="col-sm-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAction(formData, () => setFormData({ ...initialForm }));
          }}
        >
          {inputList}
          <button
            className="btn btn-secondary mr-2"
            onClick={
              typeof cancelUrl === "string"
                ? () => history.push(cancelUrl)
                : cancelUrl
            }
          >
            {cancelName}
          </button>
          <button type="submit" className="btn btn-primary">
            {submitName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DynamicForm;
