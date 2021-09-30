import React from "react";
import { useHistory } from "react-router-dom";
import DynamicForm from "../common/DynamicForm";
import { postReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();

  const addReservation = (formData) => {
    formData = { ...formData, people: Number(formData.people) };

    postReservation(formData)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(console.log);
  };

  return (
    <DynamicForm
      inputs={[
        {
          inputType: "text",
          id: "first_name",
          name: "first_name",
          formattedName: "First Name",
          placeholder: "",
          defaultValue: "",
        },
        {
          inputType: "text",
          id: "last_name",
          name: "last_name",
          formattedName: "Last Name",
          placeholder: "",
          defaultValue: "",
        },
        {
          inputType: "text",
          id: "mobile_number",
          name: "mobile_number",
          formattedName: "Mobile Number",
          placeholder: "",
          defaultValue: "",
        },
        {
          inputType: "date",
          id: "reservation_date",
          name: "reservation_date",
          formattedName: "Date of reservation",
          placeholder: "",
          defaultValue: "",
        },
        {
          inputType: "time",
          id: "reservation_time",
          name: "reservation_time",
          formattedName: "Time of reservation",
          placeholder: "",
          defaultValue: "",
        },
        {
          inputType: "number",
          id: "people",
          name: "people",
          formattedName: "Party Size",
          placeholder: "",
          defaultValue: 1,
          min: 1,
        },
      ]}
      submit={{ action: addReservation }}
      cancel={{ url: () => history.goBack() }}
    />
  );
}

export default NewReservation;
