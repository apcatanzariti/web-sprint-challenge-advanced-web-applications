import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { fetchColors as mockFetchColors } from './../api/fetchColors';

test("Renders BubblePage without errors", () => {
  render(<BubblePage />);
});

jest.mock('./../api/fetchColors');

const colorsData = {
    color:"aqua",
    code:{hex:"#00ffff"},
    id:3
  };

test("Fetches data and renders the bubbles on mounting", async () => {
  
  mockFetchColors.mockResolvedValueOnce(colorsData);

  render(<BubblePage />);

  const colorSpan = await screen.findByText(/aqua/i);

  expect(colorSpan).toBeInTheDocument();

});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading