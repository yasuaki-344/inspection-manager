import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../components/Home', () => {
  return { Home: () => { return <></> }, };
});
jest.mock('../inspection/Create', () => {
  return { Create: () => { return <></> }, };
});
jest.mock('../inspection/Details', () => {
  return { Details: () => { return <></> }, };
});
jest.mock('../inspection/Edit', () => {
  return { Edit: () => { return <></> }, };
});
jest.mock('../categories/InspectionGroupCategory', () => {
  return { InspectionGroupCategory: () => { return <></> }, };
});
jest.mock('../categories/InspectionTypeCategory', () => {
  return { InspectionTypeCategory: () => { return <></> }, };
});
jest.mock('../categories/ChoicesTemplate', () => {
  return { ChoicesTemplate: () => { return <></> }, };
});

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
});
