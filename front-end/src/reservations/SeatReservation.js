import React, { useEffect, useState } from "react";
import DynamicForm from "../common/DynamicForm";
import {
  getReservation,
  listTables,
  seatReservationStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

function SeatReservation() {
  const history = useHistory();
  const { reservationId } = useParams();
  const [error, setError] = useState();
  const [reservation, setReservation] = useState();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    getReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }, [reservationId]);

  const seatReservation = (formData, resetForm) => {
    const table = tables[Number(formData.table_id)];

    const errors = [];

    if (!table) {
      errors.push({
        message: "No table selected",
      });
    }

    if (!reservation) {
      errors.push({
        message: "Reservation not found",
      });
    }

    if (
      table &&
      reservation &&
      Number(table.capacity) < Number(reservation.people)
    ) {
      errors.push({
        message: `${table.table_name} doesn't have the capacity for ${reservation.people}`,
      });
    }

    if (errors.length) {
      setError(errors);
      return;
    }

    seatReservationStatus(table, reservation)
      .then(() => history.push("/dashboard"))
      .then(() => resetForm())
      .then(() => setError())
      .catch(setError);
  };

  return (
    <React.Fragment>
      <div className="row">
        <h1>Seat Reservation</h1>
        <div className="col-6">
          {error && <ErrorAlert error={error} />}
          {tables.length && (
            <DynamicForm
              inputs={[
                {
                  inputType: "select",
                  id: "table_id",
                  name: "table_id",
                  formattedName: "Table",
                  defaultValue: "none",
                  options: [
                    <option key={0} value="none">
                      Please Pick a Table
                    </option>,
                    ...tables.map(({ capacity, table_id, table_name }, idx) => {
                      return (
                        <option key={idx + 1} value={idx}>
                          {table_name} - {capacity}
                        </option>
                      );
                    }),
                  ],
                },
              ]}
              submit={{ action: seatReservation }}
              cancel={{ url: history.goBack }}
            />
          )}
        </div>
        <div className="col-6 justify-content-center">
          {reservation && <h3>Reservation Size: {reservation.people}</h3>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SeatReservation;
