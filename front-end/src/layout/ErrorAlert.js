import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  return (
    error && (
      <div className="alert alert-danger mt-2">
        <p>Please fix the following error(s): </p>
        <ul>
          {Array.isArray(error) ? (
            error.map((curr, index) => <li key={index}>{curr.message}</li>)
          ) : (
            <li>{error.message}</li>
          )}
        </ul>
      </div>
    )
  );
}

export default ErrorAlert;
