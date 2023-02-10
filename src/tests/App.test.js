import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { App } from '../components/App';
import store from "../store";
import {Provider} from "react-redux";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

describe('App', () => {
  it('renders the tabs correctly', () => {
    render(<Provider store={store}>
      <App/>
    </Provider>)

    const tabs = document.querySelectorAll(".tabs-container .tab-item")
    expect(tabs[0].textContent).toEqual("Chat");
    expect(tabs[1].textContent).toEqual("Map");
  });

  it('renders the containers correctly', () => {
    render(<Provider store={store}>
      <App/>
    </Provider>)

    const chatContainer = document.querySelector(".chat-container")
    expect(chatContainer).toBeInTheDocument();

    const mapContainer = document.querySelector(".map-container")
    expect(mapContainer).toBeInTheDocument();

    const moviesContainer = document.querySelector(".movie-container")
    expect(moviesContainer).toBeInTheDocument();
  });
});