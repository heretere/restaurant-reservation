import React from "react";

const ReservationItem = ({
  reservation: {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
  },
}) => {
  return (
    <tr>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
    </tr>
  );
};

export default ReservationItem;
