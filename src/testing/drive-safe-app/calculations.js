import {
  DRIVING_LEVEL_VERY_SAFE,
  DRIVING_LEVEL_SAFE,
  DRIVING_LEVEL_UNSAFE,
  DRIVING_LEVEL_DANGEROUS,
} from "./constants"

export function calculateDrivingLevel({ drivingScore }) {
  if (drivingScore >= 90) {
    return DRIVING_LEVEL_VERY_SAFE
  } else if (drivingScore >= 70) {
    return DRIVING_LEVEL_SAFE
  } else if (drivingScore >= 30) {
    return DRIVING_LEVEL_UNSAFE
  }
  return DRIVING_LEVEL_DANGEROUS
}

export function calculateDrivingScore({ distance, incidents }) {
  const incidentsPerMile = incidents / distance
  if (incidentsPerMile > 1) {
    return 0
  }
  return Math.round(100 - 100 * incidentsPerMile)
}

export function calculateDrivingAssessment({ trips = [] }) {
  let tripsCount = 0
  let incidentsCount = 0
  let totalDistance = 0
  trips.forEach((trip) => {
    tripsCount += 1
    incidentsCount += trip.incidents
    totalDistance += trip.distance
  })
  const drivingScore = calculateDrivingScore({
    distance: totalDistance,
    incidents: incidentsCount,
  })
  return {
    drivingScore,
    drivingLevel: calculateDrivingLevel({
      drivingScore,
    }),
    tripsCount,
    incidentsCount,
    totalDistance,
  }
}
