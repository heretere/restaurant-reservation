import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

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
      <ReservationForm
        submitAction={addReservation}
        defaultValues={{
          first_name: "",
          last_name: "",
          reservation_date: today(),
          reservation_time:
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
            ":" +
            (date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes()),
          mobile_number: "",
          people: 1,
        }}
      />
    </React.Fragment>
  );
}

export default NewReservation;
