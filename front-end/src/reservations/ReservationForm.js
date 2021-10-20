import React from "react";
import DynamicForm from "../common/DynamicForm";
import { useHistory } from "react-router-dom";

export default function ReservationForm({ defaultValues, submitAction }) {
  const history = useHistory();

  return (
    <DynamicForm
      inputs={[
        {
          inputType: "text",
          id: "first_name",
          name: "first_name",
          formattedName: "First Name",
          placeholder: "First Name",
          defaultValue: defaultValues.first_name,
          className: "col-6",
        },
        {
          inputType: "text",
          id: "last_name",
          name: "last_name",
          formattedName: "Last Name",
          placeholder: "Last Name",
          defaultValue: defaultValues.last_name,
          className: "col-6",
        },
        {
          inputType: "date",
          id: "reservation_date",
          name: "reservation_date",
          formattedName: "Date of reservation",
          placeholder: "",
          defaultValue: defaultValues.reservation_date,
          className: "col-6",
        },
        {
          inputType: "time",
          id: "reservation_time",
          name: "reservation_time",
          formattedName: "Time of reservation",
          placeholder: "",
          defaultValue: defaultValues.reservation_time,
          className: "col-6",
        },
        {
          inputType: "text",
          id: "mobile_number",
          name: "mobile_number",
          formattedName: "Mobile Number",
          placeholder: "(555) 555-5555",
          defaultValue: defaultValues.mobile_number,
          className: "col-6",
        },
        {
          inputType: "number",
          id: "people",
          name: "people",
          formattedName: "Party Size",
          placeholder: "",
          defaultValue: defaultValues.people,
          min: 1,
          className: "col-6",
        },
      ]}
      submit={{ action: submitAction }}
      cancel={{ url: history.goBack }}
    />
  );
}
