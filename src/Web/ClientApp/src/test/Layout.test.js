import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Layout } from '../components/Layout';

jest.mock('../components/NavMenu', () => {
  return {
    NavMenu: () => { return <></> },
  };
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', async () => {
  await act(async () => {
    render(
      <Layout>
        <div></div>
      </Layout>
      , container
    );
  });
});
