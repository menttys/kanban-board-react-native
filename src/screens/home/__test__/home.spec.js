import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { mockData } from '@app/reducer/data';
import { Home } from '../home';

const numberOfBoards = Object.keys(mockData.boards).length;

const renderContainer = () =>
  render(
    <NavigationContainer>
      <Home />
    </NavigationContainer>,
  );

describe('<Home> Screen', () => {
  it('should render the columns steps', async () => {
    renderContainer();

    const boards = screen.getAllByTestId('boards-container');
    expect(boards.length).toBe(numberOfBoards);
  });

  it('should render the right number of ticket to each column', async () => {
    renderContainer();

    expect(screen.getAllByTestId('board-0').length).toBe(
      mockData.boards[0].tickets.length,
    );
    expect(screen.getAllByTestId('board-1').length).toBe(
      mockData.boards[1].tickets.length,
    );
  });

  it('home snapshot', () => {
    const { toJSON } = renderContainer();

    expect(toJSON()).toMatchSnapshot();
  });
});
