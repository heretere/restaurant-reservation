import React from "react";
import ReservationItem from "./ReservationItem";

const emptyData = {
  first_name: "None",
  last_name: "None",
  mobile_number: "None",
  people: "None",
  reservation_time: "None",
};

const ReservationTable = ({ reservations }) => {
  const data = [];

  for (let i = 0; i < 5 || i < reservations.length; i++) {
    let reservation = reservations[i] || emptyData;

    data.push(<ReservationItem key={i} reservation={reservation} />);
  }

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
      <tbody>{data}</tbody>
    </table>
  );
};

export default ReservationTable;
