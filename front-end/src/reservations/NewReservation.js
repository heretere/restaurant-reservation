import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DynamicForm from "../common/DynamicForm";
import { postReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState();

  const addReservation = (formData, resetForm) => {
    formData = { ...formData, people: Number(formData.people) };

    const errors = [];
    const dateNumber = Date.parse(
      `${formData.reservation_date}T${formData.reservation_time}`
    );
    const currentDate = new Date(dateNumber);
    const timeNumber = Number(
      `${
        currentDate.getHours() < 10
          ? "0" + currentDate.getHours()
          : currentDate.getHours()
      }${
        currentDate.getMinutes() < 10
          ? "0" + currentDate.getMinutes()
          : currentDate.getMinutes()
      }`
    );

    if (dateNumber < Date.now()) {
      errors.push({
        message: "Reservation date/time must occur in the future",
      });
    }

    if (currentDate.getDay() === 2) {
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

  const date = new Date();

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
            placeholder: "First Name",
            defaultValue: "",
            className: "col-6",
          },
          {
            inputType: "text",
            id: "last_name",
            name: "last_name",
            formattedName: "Last Name",
            placeholder: "Last Name",
            defaultValue: "",
            className: "col-6",
          },
          {
            inputType: "date",
            id: "reservation_date",
            name: "reservation_date",
            formattedName: "Date of reservation",
            placeholder: "",
            defaultValue: today(),
            className: "col-6",
          },
          {
            inputType: "time",
            id: "reservation_time",
            name: "reservation_time",
            formattedName: "Time of reservation",
            placeholder: "",
            defaultValue:
              (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
              ":" +
              (date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()),
            className: "col-6",
          },
          {
            inputType: "text",
            id: "mobile_number",
            name: "mobile_number",
            formattedName: "Mobile Number",
            placeholder: "(555) 555-5555",
            defaultValue: "",
            className: "col-6",
          },
          {
            inputType: "number",
            id: "people",
            name: "people",
            formattedName: "Party Size",
            placeholder: "",
            defaultValue: 1,
            min: 1,
            className: "col-6",
          },
        ]}
        submit={{ action: addReservation }}
        cancel={{ url: history.goBack }}
      />
    </React.Fragment>
  );
}

export default NewReservation;
