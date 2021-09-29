import React from "react";
import ReservationItem from "./ReservationItem";

const ReservationTable = ({ reservations }) => {
  const reservationMap = reservations.map((reservation, index) => (
    <ReservationItem key={index} reservation={reservation} />
  ));

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Time</th>
          <th scope="col">People</th>
        </tr>
      </thead>
      <tbody>{reservationMap}</tbody>
    </table>
  );
};

export default ReservationTable;
