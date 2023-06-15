import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Holder from "../holder";

jest.mock("axios");

afterEach(() => {
    axios.get.mockClear();
});

function mockCall() {
    axios.get.mockResolvedValueOnce({
        data: {
            items: [
                {
                    display_name: "Jon Skeet",
                }
            ]
        }
    });
}

test('show loader when it"s fetching data', () => {
    mockCall();

    render(<Holder />);
    const loaderElement = screen.getByTestId('loading');
    expect(loaderElement).toBeInTheDocument();
});
