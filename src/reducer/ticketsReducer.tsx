import { mockData } from './data';

export enum TICKET_ACTIONS {
  ADD = 'add',
  DELETE = 'delete',
  MOVE = 'move',
}

export type TICKET_STATE = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link: string;
};
export type STEPS_STATE = {
  name: string;
  tickets: TICKET_STATE[];
};
export type BOARD_STATE = Record<string, STEPS_STATE>;
export type STATE = {
  lastIndice: number;
  boards: BOARD_STATE;
};

export const initialState: STATE = mockData;

type PAYLOAD_TYPE = {};

export type TICKETS_ACTION_TYPE =
  | {
      type: TICKET_ACTIONS.ADD;
      payload: {
        tag: string;
        cardTitle: string;
        cardDescription: string;
        link: string;
      };
    }
  | { type: TICKET_ACTIONS.DELETE; payload: PAYLOAD_TYPE }
  | {
      type: TICKET_ACTIONS.MOVE;
      payload: {
        ticketId: string;
        newColumn: string;
        actualColumn: string;
      };
    };

export function reducer(state: STATE, action: TICKETS_ACTION_TYPE): STATE {
  switch (action.type) {
    case TICKET_ACTIONS.ADD:
      const { tag, cardTitle, cardDescription, link } = action.payload;
      const addState: STATE = { ...state, lastIndice: +state.lastIndice + 1 };
      addState.boards[0].tickets.push({
        id: `A${+state.lastIndice + 1}`,
        title: cardTitle,
        description: cardDescription,
        tag: tag,
        link: link,
      });
      return {
        ...addState,
      };

    case TICKET_ACTIONS.DELETE:
      return {
        ...state,
      };

    case TICKET_ACTIONS.MOVE:
      const { ticketId, newColumn, actualColumn } = action.payload;
      const newState = { ...state };
      let savedTicket: TICKET_STATE | null = null;
      const removeTicket = newState.boards[actualColumn].tickets.filter(
        (ticket) => {
          if (ticket.id !== ticketId) {
            return ticket;
          }
          savedTicket = ticket;
        },
      );
      newState.boards[actualColumn].tickets = removeTicket;
      if (savedTicket) {
        newState.boards[newColumn].tickets = [
          ...newState.boards[newColumn].tickets,
          savedTicket,
        ];
      }

      return {
        ...newState,
      };
    default:
      throw new Error();
  }
}
