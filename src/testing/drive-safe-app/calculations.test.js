import {
  DRIVING_LEVEL_VERY_SAFE,
  DRIVING_LEVEL_SAFE,
  DRIVING_LEVEL_UNSAFE,
  DRIVING_LEVEL_DANGEROUS,
} from "./constants"

import {
  calculateDrivingLevel,
  calculateDrivingScore,
  calculateDrivingAssessment,
} from "./calculations"

describe("calculateDrivingScore", () => {
  test("distance 100 incidents 0 -> driving score 100", () => {
    const output = calculateDrivingScore({ distance: 100, incidents: 0 })
    expect(output).toBe(100)
  })

  test("distance 100 incidents 50 -> driving score 50", () => {
    const output = calculateDrivingScore({ distance: 100, incidents: 50 })
    expect(output).toBe(50)
  })

  test("distance 100 incidents 100 -> driving score 0", () => {
    const output = calculateDrivingScore({ distance: 100, incidents: 100 })
    expect(output).toBe(0)
  })

  test("distance 100 incidents 101 -> driving score 0", () => {
    const output = calculateDrivingScore({ distance: 100, incidents: 101 })
    expect(output).toBe(0)
  })
})

describe("calculateDrivingLevel", () => {
  test("score 30 -> driving level unsafe", () => {
    const output = calculateDrivingLevel({ drivingScore: 30})
    expect(output).toBe(DRIVING_LEVEL_UNSAFE)
  })

  test("score 90 -> driving level unsafe", () => {
    const output = calculateDrivingLevel({ drivingScore: 90})
    expect(output).toBe(DRIVING_LEVEL_VERY_SAFE)
  })
})

describe("calculateDrivingAssessment", () => {
  test("trips", () => {
    const output = calculateDrivingAssessment({
      trips: [
        {incidents: 73, distance: 50},
        {incidents: 11, distance: 70}
      ]
    })
    expect(output).toEqual( {
      drivingScore: 30,
      drivingLevel: DRIVING_LEVEL_UNSAFE,
      tripsCount: 2,
      incidentsCount: 84,
      totalDistance: 120
    })
  })
})