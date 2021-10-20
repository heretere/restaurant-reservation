import React from "react";
import DynamicTable from "./DynamicTable";
import { Link } from "react-router-dom";

export default function ReservationTable({ reservations }) {
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
      }}
      data={reservations}
    />
  );
}
