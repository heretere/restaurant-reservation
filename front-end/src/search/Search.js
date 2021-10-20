import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationTable from "../common/ReservationTable";

export default function Search() {
  const [reservations, setReservations] = useState(null);
  const [mobileNumber, setMobileNumber] = useState();

  const runSearch = (e) => {
    e.preventDefault();

    if (!mobileNumber) return;

    listReservations({ mobile_number: mobileNumber }).then(setReservations);
  };

  return (
    <React.Fragment>
      <h1>Search by Mobile Number</h1>
      <div className="row">
        <form onSubmit={runSearch}>
          <div>
            <label className="form-label" htmlFor="search">
              Search
            </label>
            <div className="row">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  name="mobile_number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>

              <div className="col-2">
                <button type="submit" className="btn btn-primary col-12">
                  Find
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {reservations && (
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-12">
            {reservations.length ? (
              <ReservationTable reservations={reservations} />
            ) : (
              <h3>No reservations found</h3>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
