import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { App } from '../components/App';
import store from "../store";
import {Provider} from "react-redux";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

describe('Movie', () => {
  it('renders the containers correctly', () => {
    render(<Provider store={store}>
      <App/>
    </Provider>)

    const videoContainer = document.querySelector(".movie video")
    expect(videoContainer).toBeInTheDocument();

    const keywordsContainer = document.querySelector(".keywords")
    expect(keywordsContainer).toBeInTheDocument();

    const chaptersContainer = document.querySelector(".chapters")
    expect(chaptersContainer).toBeInTheDocument();
  })
});