import React from "react"
import { render, screen } from "@testing-library/react"
import DrivingHistory from "."

describe("DrivingHistory", ()=>{

    test("test confirmed trip", () =>{
        const trips = [{
            id: "trip-03",
            date: "5th July 2020",
            incidents: 35,
            distance: 8,
            confirmed: true,
          },]
        render(<DrivingHistory trips={trips}/>)
        const text = screen.queryByText('Confirmed')
        expect(text).toBeTruthy
    })
    test("test unconfirmed trip", () =>{
        const trips = [{
            id: "trip-03",
            date: "5th July 2020",
            incidents: 35,
            distance: 8,
          },]
        render(<DrivingHistory trips={trips}/>)
        const text = screen.queryByText('Confirmed')
        expect(text).toBeFalsy
        const button = screen.queryByRole('button')
        expect(button.textContent).toBe('Confirm Trip')
    })
})