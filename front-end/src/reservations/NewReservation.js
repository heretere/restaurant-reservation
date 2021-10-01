import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DynamicForm from "../common/DynamicForm";
import { postReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState();

  const addReservation = (formData, resetForm) => {
    formData = { ...formData, people: Number(formData.people) };

    const errors = [];
    const dateNumber = Date.parse(
      `${formData.reservation_date}T${formData.reservation_time}`
    );
    const date = new Date(dateNumber);
    const timeNumber = Number(`${date.getHours()}${date.getMinutes()}`);

    if (dateNumber < Date.now()) {
      errors.push({
        message: "Reservation date/time must occur in the future",
      });
    }

    if (date.getDay() === 2) {
      errors.push({ message: "The restaurant is closed on Tuesday" });
    }

    if (timeNumber < 1030 || timeNumber > 2130) {
      errors.push({ message: "Please select a time between 10:30 and 21:30" });
    }

    if (errors.length) {
      setError(errors);
      return;
    }

    postReservation(formData)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .then(() => resetForm())
      .then(() => setError())
      .catch(setError);
  };

  return (
    <React.Fragment>
      <h1>Add Reservation</h1>
      {error && <ErrorAlert error={error} />}
      <DynamicForm
        inputs={[
          {
            inputType: "text",
            id: "first_name",
            name: "first_name",
            formattedName: "First Name",
            placeholder: "",
            defaultValue: "",
          },
          {
            inputType: "text",
            id: "last_name",
            name: "last_name",
            formattedName: "Last Name",
            placeholder: "",
            defaultValue: "",
          },
          {
            inputType: "text",
            id: "mobile_number",
            name: "mobile_number",
            formattedName: "Mobile Number",
            placeholder: "",
            defaultValue: "",
          },
          {
            inputType: "date",
            id: "reservation_date",
            name: "reservation_date",
            formattedName: "Date of reservation",
            placeholder: "",
            defaultValue: "",
          },
          {
            inputType: "time",
            id: "reservation_time",
            name: "reservation_time",
            formattedName: "Time of reservation",
            placeholder: "",
            defaultValue: "",
          },
          {
            inputType: "number",
            id: "people",
            name: "people",
            formattedName: "Party Size",
            placeholder: "",
            defaultValue: 1,
            min: 1,
          },
        ]}
        submit={{ action: addReservation }}
        cancel={{ url: history.goBack }}
      />
    </React.Fragment>
  );
}

export default NewReservation;
