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
      <ErrorAlert error={reservationsError} />
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <div className={"table-responsive"}>
            {reservations && <ReservationTable reservations={reservations} />}
          </div>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link" onClick={pushPrev}>
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={pushToday}>
                  Today
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={pushNext}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-lg-6 col-md-12 table-responsive">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Tables</h4>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Placeholder</th>
                <th scope="col">Placeholder</th>
                <th scope="col">Placeholder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
