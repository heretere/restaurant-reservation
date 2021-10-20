import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewReservation from "./NewReservation";
import NotFound from "../layout/NotFound";
import SeatReservation from "./SeatReservation";

export default function Reservations() {
  return (
    <Switch>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <SeatReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
