import React from "react"

import { calculateDrivingLevel, calculateDrivingScore } from "../calculations"
import { drivingLevelDisplay } from "../constants"

function TripRow({ tripNumber, trip, onConfirmTrip }) {
  const { date, distance, incidents, tripType, confirmed } = trip
  const drivingScore = calculateDrivingScore({ distance, incidents })
  const drivingLevel = calculateDrivingLevel({ drivingScore })
  const { color } = drivingLevelDisplay[drivingLevel]
  return (
    <tr data-testid="trip-row" style={{ background: color }}>
      <td>{tripNumber}</td>
      <td>{date}</td>
      <td>{distance}</td>
      <td>{incidents}</td>
      <td>{drivingScore}</td>
      <td>
        {confirmed ? (
          "Confirmed"
        ) : (
          <button
            type="button"
            className="btn btn-dark btn-sm"
            onClick={onConfirmTrip}
          >
            Confirm Trip
          </button>
        )}
      </td>
    </tr>
  )
  // return (
  //   <tr data-testid="trip-row">
  //     <td>
  //       <div
  //         style={{
  //           background: color,
  //           width: 30,
  //           height: 30,
  //           borderRadius: 30,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           display: "flex",
  //         }}
  //       >
  //         {tripNumber}
  //       </div>
  //     </td>
  //     <td>{date}</td>
  //     <td>{distance}</td>
  //     <td>{incidents}</td>
  //     <td>{drivingScore}</td>
  //     <td>
  //       {confirmed ? (
  //         "Confirmed"
  //       ) : (
  //         <button
  //           type="button"
  //           className="btn btn-dark btn-sm"
  //           onClick={onConfirmTrip}
  //         >
  //           Confirm Trip
  //         </button>
  //       )}
  //     </td>
  //   </tr>
  // )
}

export default function DrivingHistory({ trips, confirmTrip }) {
  return (
    <div style={{ maxWidth: 900 }}>
      <h2 className="mb-4">Your Trips</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Distance (miles)</th>
            <th>Incidents</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <TripRow
              key={trip.id}
              trip={trip}
              tripNumber={index + 1}
              onConfirmTrip={() => {
                confirmTrip(trip.id)
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
