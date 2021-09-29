import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "./ReservationTable";
import { next, previous, today } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @returns {JSX.Element}
 */
function Dashboard() {
  let date = useQuery().get("date");
  date = date ? date : today();
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  const pushNext = () => {
    history.push(`/dashboard?date=${next(date)}`);
  };

  const pushToday = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  const pushPrev = () => {
    history.push(`/dashboard?date=${previous(date)}`);
  };

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations && <ReservationTable reservations={reservations} />}
      <button type="button" className="btn btn-primary" onClick={pushPrev}>
        Previous
      </button>
      <button type="button" className="btn btn-primary" onClick={pushToday}>
        Today
      </button>
      <button type="button" className="btn btn-primary" onClick={pushNext}>
        Next
      </button>
    </main>
  );
}

export default Dashboard;
