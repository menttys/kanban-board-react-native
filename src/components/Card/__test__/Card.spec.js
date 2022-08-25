import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DraxProvider } from 'react-native-drax';

import { Card } from '../Card';

const ticket = {
  id: 'A1',
  title: 'Chewbacca',
  description: 'This is a nice sentence Chewie said',
  tag: 'Star Wars',
  link: 'https://www.starwars.com',
};

describe('<Card> component', () => {
  it('should render the card content', async () => {
    render(
      <DraxProvider>
        <Card ticket={ticket} column={0} />
      </DraxProvider>,
    );

    expect(screen.queryByText(ticket.title)).toBeTruthy();
    expect(screen.queryByText(ticket.description)).toBeTruthy();
    expect(screen.queryByText(ticket.tag)).toBeTruthy();

    // TODO: implement link call mock test
  });
});
