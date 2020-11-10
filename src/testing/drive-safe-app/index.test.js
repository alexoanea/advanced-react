import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import App from "."

jest.mock("./api", () => ({
    getTrips: () => {
      // `getTrips` returns a promise that resolves to an object
      // with a trips key, like the original function.
      return new Promise((resolve) => {
          resolve({
            trips: [
                {
                  id: "trip-01",
                  date: "1st July 2020",
                  incidents: 12,
                  distance: 30,
                  confirmed: false,
                },
                {
                  id: "trip-02",
                  date: "3rd July 2020",
                  incidents: 3,
                  distance: 20,
                  confirmed: true,
                },
            ],
          })
      })
    },
  }))

describe("App", () =>{

    test("test loading displayed", async ()=> {
        render(<App/>)
      
        const loadingText = screen.queryByText("Loading...")
        expect(loadingText).toBeTruthy()
      
        const overallDrivingAssessmentText = await screen.findByText("Overall Driving Assessment:")
        expect(overallDrivingAssessmentText).toBeTruthy()
      
        const loadingTextAfter = screen.queryByText("Loading...")
        expect(loadingTextAfter).toBeFalsy()
    })

    test("test total trips", async ()=> {
        render(<App />)

        const totalTrips = await screen.findByTestId("trip-count")
        expect(totalTrips.textContent).toEqual("2")
    })

    test("click on trips", async ()=> {
        render(<App />)

        const totalTrips = await screen.findByTestId("trip-count")

        expect(totalTrips).toBeTruthy

        fireEvent.click(totalTrips)

        const yourTripsText = await screen.findByText("Your Trips")

        expect(yourTripsText).toBeTruthy

        const confirmTripButton = await screen.findByText("Confirm Trip")

        expect(confirmTripButton).toBeTruthy

        const countConfirmed = await screen.findAllByText("Confirmed")

        expect(countConfirmed).toHaveLength(1)

        fireEvent.click(confirmTripButton)

        const countConfirmedAfter = await screen.findAllByText("Confirmed")

        expect(countConfirmedAfter).toHaveLength(2)
    })
})