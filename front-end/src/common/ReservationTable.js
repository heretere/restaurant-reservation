import React from "react";
import DynamicTable from "./DynamicTable";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";

export default function ReservationTable({ reservations, reloadReservations }) {
  return (
    <DynamicTable
      headers={{
        seat: "",
        first_name: "First Name",
        last_name: "Last Name",
        mobile_number: "Mobile Number",
        reservation_time: "Time",
        people: "People",
        status: "Status",
        other_actions: "",
      }}
      mappers={{
        seat: (key, { reservation_id, status }) => {
          return (
            <td key={key}>
              {status === "booked" && (
                <Link
                  className="btn btn-primary"
                  to={`/reservations/${reservation_id}/seat`}
                >
                  Seat
                </Link>
              )}
            </td>
          );
        },
        status: (key, { reservation_id, status }) => {
          return (
            <td key={key} data-reservation-id-status={reservation_id}>
              {status}
            </td>
          );
        },
        other_actions: (key, { reservation_id, status }) => {
          return (
            <td key={key}>
              {status === "booked" && (
                <React.Fragment>
                  <Link
                    className="btn btn-warning"
                    to={`/reservations/${reservation_id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    data-reservation-id-cancel={reservation_id}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Do you want to cancel this reservation? This cannot be undone."
                        )
                      ) {
                        cancelReservation(reservation_id)
                          .then(() => reloadReservations())
                          .catch(console.log);
                      }
                    }}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              )}
            </td>
          );
        },
      }}
      data={reservations}
    />
  );
}
