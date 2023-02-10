import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { App } from '../components/App';
import store from "../store";
import {Provider} from "react-redux";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

describe('Chat', () => {
  it('renders the containers correctly', () => {
    render(<Provider store={store}>
      <App/>
    </Provider>)

    const osm = screen.getByText(/OpenStreetMap/i)
    expect(osm).toBeInTheDocument();
  })
});
