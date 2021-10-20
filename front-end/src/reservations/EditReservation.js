import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { asDateString, formatAsTime } from "../utils/date-time";

function EditReservation() {
  const history = useHistory();
  const { reservationId } = useParams();
  const [error, setError] = useState();
  const [reservation, setReservation] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    getReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setError);

    return () => abortController.abort();
  }, [reservationId]);

  const updateReservationAction = (formData, resetForm) => {
    formData = { ...reservation, ...formData, people: Number(formData.people) };

    const errors = [];

    if (formData.status !== "booked") {
      errors.push("Can only update reservations with a booked status.");
    }

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

    updateReservation(formData)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .then(() => resetForm())
      .then(() => setError())
      .catch(setError);
  };

  return (
    <React.Fragment>
      <h1>Add Reservation</h1>
      {error && <ErrorAlert error={error} />}
      {reservation && (
        <ReservationForm
          submitAction={updateReservationAction}
          defaultValues={{
            ...reservation,
            reservation_date: asDateString(
              new Date(reservation.reservation_date)
            ),
            reservation_time: formatAsTime(reservation.reservation_time),
          }}
        />
      )}
    </React.Fragment>
  );
}

export default EditReservation;
