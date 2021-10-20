import React, { useEffect, useState } from "react";
import {
  deleteTableReservation,
  listReservations,
  listTables,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { Link, useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";
import DynamicTable from "../common/DynamicTable";
import ReservationTable from "../common/ReservationTable";

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

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  const pushNext = () => {
    history.push(`/dashboard?date=${next(date)}`);
  };

  const pushToday = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  const pushPrev = () => {
    history.push(`/dashboard?date=${previous(date)}`);
  };

  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const finishTable = (table) => {
    deleteTableReservation(table, null)
      .then(loadTables)
      .then(loadReservations)
      .catch(setError);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={error} />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <ReservationTable reservations={reservations} />
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
              finish: "",
              table_name: "Table Name",
              capacity: "Capacity",
              occupied: "Occupied",
            }}
            mappers={{
              finish: (key, table) => {
                return (
                  <td key={key}>
                    {table.reservation_id && (
                      <button
                        className="btn btn-primary"
                        data-table-id-finish={table.table_id}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Is this table ready to seat new guests? This cannot be undone."
                            )
                          ) {
                            finishTable(table);
                          }
                        }}
                      >
                        Finish
                      </button>
                    )}
                  </td>
                );
              },
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
