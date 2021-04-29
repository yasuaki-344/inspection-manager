import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { ChoicesTemplate } from '../ChoicesTemplate';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { choices: ['choice1-1', 'choice1-2'] },
        { choices: ['choice2-1', 'choice2-2'] },
        { choices: ['choice3-1', 'choice3-2'] },
      ])
    })
  );
  jest.spyOn(window, 'alert').mockImplementation(() => { });
});
afterEach(() => {
  jest.resetAllMocks();
});

it('renders without crashing', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ChoicesTemplate />
      </MemoryRouter>
    );
  });
});

it('click add template button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ChoicesTemplate />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId('add-template-button'));
  fireEvent.click(screen.getByTestId('add-choice-button'));
  fireEvent.change(
    screen.getByDisplayValue(''),
    { target: { value: 'new choice' } }
  );
  fireEvent.change(
    screen.getByDisplayValue('new choice'),
    { target: { value: 'new choice1' } }
  );
  fireEvent.click(screen.getByTestId('add-choice-button'));
  fireEvent.change(
    screen.getByDisplayValue(''),
    { target: { value: 'new choice2' } }
  );
  fireEvent.click(screen.getByTestId('remove-choice-0'));
  fireEvent.click(screen.getByText(/ok/i));
});

it('click edit template button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ChoicesTemplate />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId('edit-template-button-0'));
  fireEvent.click(screen.getByText(/キャンセル/i));
});

it('click remove template button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ChoicesTemplate />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId('remove-template-button-0'));
});


it('click submit type button', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ChoicesTemplate />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByTestId('form'));
  });
});
