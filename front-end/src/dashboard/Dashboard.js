import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { Link, useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";
import DynamicTable from "../common/DynamicTable";

/**
 * Defines the dashboard page.
 * @returns {JSX.Element}
 */
function Dashboard() {
  let date = useQuery().get("date");
  date = date ? date : today();
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

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
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={error} />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <DynamicTable
            headers={{
              seat: "",
              first_name: "First Name",
              last_name: "Last Name",
              mobile_number: "Mobile Number",
              reservation_time: "Time",
              people: "People",
            }}
            mappers={{
              seat: (key, { reservation_id }) => {
                return (
                  <td key={key}>
                    <Link
                      className="btn btn-primary"
                      to={`/reservations/${reservation_id}/seat`}
                    >
                      Seat
                    </Link>
                  </td>
                );
              },
            }}
            data={reservations}
          />
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
        <div className="col-lg-6 col-md-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Tables</h4>
          </div>
          <DynamicTable
            headers={{
              table_name: "Table Name",
              capacity: "Capacity",
              occupied: "Occupied",
            }}
            mappers={{
              occupied: (key, { reservation_id, table_id }) => (
                <td key={key} data-table-id-status={table_id}>
                  {reservation_id ? "Occupied" : "Free"}
                </td>
              ),
            }}
            data={tables}
          />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
