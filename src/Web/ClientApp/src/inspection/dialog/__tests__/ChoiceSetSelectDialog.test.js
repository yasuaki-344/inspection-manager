import React from 'react';
import { render } from '@testing-library/react';
import { ChoiceSetSelectDialog } from '../ChoiceSetSelectDialog';

it('renders without crashing', () => {
  const templates = [
    { choices: ['choice1-1', 'choice1-2'] },
    { choices: ['choice2-1', 'choice2-2'] },
    { choices: ['choice3-1', 'choice3-2'] },
  ];
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(templates)
    })
  );

  render(
    <ChoiceSetSelectDialog
      open={true}
      handleClose={() => { }}
    />
  );
});