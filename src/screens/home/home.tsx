import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  DraxProvider,
  DraxView,
  DraxSnapbackTargetPreset,
} from 'react-native-drax';

import {
  AppNavigatorRoutes,
  AppNavigatorNavigationProp,
} from '@app/navigator/AppNavigator';
import Card from '@app/components/Card';
import Picker from '@app/components/Picker';
import Icon from '@app/components/Icon';
import {
  initialState,
  reducer,
  TICKET_ACTIONS,
  STEPS_STATE,
  BOARD_STATE,
} from '@app/reducer';

export enum Stages {
  BACKLOG = 'Backlog',
  TODO = 'To Do',
  IN_DEVELOPMENT = 'In Development',
  COMPLETED = 'Completed',
}

const stagesColors = {
  [Stages.BACKLOG]: '#1B5A7C',
  [Stages.TODO]: '#106254',
  [Stages.IN_DEVELOPMENT]: '#71441B',
  [Stages.COMPLETED]: '#54127D',
};

const COLUMN_WIDTH = 250;

/**
 * @function @Home
 **/

export const Home = () => {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [selectedTickets, setselectedTickets] = React.useState(state);

  const {
    add_ticket_button,
    empty_column,
    empty_column_text,
    header_container,
    home_container,
    main_container,
    step,
    step_header,
    search_container,
    search_icon,
    search_text,
  } = styles;

  const handleSearch = (event: any) => {
    // will search only when lenght larger than 3
    if (event.nativeEvent.text.length > 3) {
      let newBoard = {};
      Object.keys(selectedTickets.boards as BOARD_STATE).forEach((step) => {
        const filteredTickets =
          state.boards[step].tickets.filter(
            (ticket: {
              title: string;
              tag: string;
              description: string;
              link: string;
            }) =>
              ticket.title.includes(event.nativeEvent.text) ||
              ticket.tag.includes(event.nativeEvent.text) ||
              ticket.description.includes(event.nativeEvent.text) ||
              ticket.link.includes(event.nativeEvent.text),
          ) || [];

        newBoard = {
          ...newBoard,
          [step]: {
            name: state.boards[step].name,
            tickets: filteredTickets,
          },
        };
      });
      const newState = {
        ...state,
        boards: newBoard,
      };

      setselectedTickets(() => newState);
    }
    // clean up the search
    if (event.nativeEvent.text.length === 3) {
      setselectedTickets(() => state);
    }
  };

  return (
    <View style={main_container}>
      <View style={{ ...header_container, zIndex: 100, position: 'relative' }}>
        <View style={search_container}>
          <View style={search_icon}>
            <Icon name="Search" size="xlg" />
          </View>
          <TextInput
            style={search_text}
            placeholderTextColor="#222"
            placeholder="Search this board"
            onChange={(event) => handleSearch(event)}
          />
        </View>
        <Picker />
      </View>

      <ScrollView horizontal style={{ zIndex: 0 }}>
        <DraxProvider>
          <View style={home_container}>
            {selectedTickets &&
              Object.values(selectedTickets.boards as BOARD_STATE).map(
                (data: STEPS_STATE, columnIndex) => {
                  return (
                    <ScrollView
                      key={`${data.name}_${columnIndex}`}
                      testID="boards-container"
                    >
                      <DraxView
                        style={{
                          ...step,
                          backgroundColor: stagesColors[data.name as Stages],
                        }}
                        onReceiveDragDrop={({ dragged: { payload } }: any) => {
                          dispatch({
                            type: TICKET_ACTIONS.MOVE,
                            payload: {
                              ticketId: payload.ticketId,
                              newColumn: `${columnIndex}`,
                              actualColumn: payload.actualColumn,
                            },
                          });
                          return DraxSnapbackTargetPreset.None;
                        }}
                        receptive={true}
                      >
                        <Text style={step_header}>{data.name}</Text>
                        {!data.tickets.length ? (
                          <View style={empty_column}>
                            <Text
                              style={{
                                ...empty_column_text,
                                color: stagesColors[data.name as Stages],
                              }}
                            >
                              Drag and drop here
                            </Text>
                          </View>
                        ) : (
                          data.tickets.map((ticket, ticketIndex) => (
                            <Card
                              key={`${ticket.id}${ticketIndex}`}
                              ticket={ticket}
                              column={columnIndex}
                              testID={`board-${columnIndex}`}
                            />
                          ))
                        )}

                        {data.name === Stages.BACKLOG && (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate(AppNavigatorRoutes.ADD_CARD, {
                                dispatch: dispatch,
                                state: state,
                              })
                            }
                            style={{
                              paddingVertical: 12,
                            }}
                          >
                            <Text style={add_ticket_button}>+ Add Card</Text>
                          </TouchableOpacity>
                        )}
                      </DraxView>
                    </ScrollView>
                  );
                },
              )}
          </View>
        </DraxProvider>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  home_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  header_container: {
    marginBottom: 20,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fcfdfc',
    shadowColor: '#888',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  step: {
    width: COLUMN_WIDTH,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    padding: 16,
    borderRadius: 4,
    backgroundColor: 'grey',
  },
  step_header: {
    color: 'white',
    fontFamily: 'nunito',
    fontSize: 16,
    marginBottom: 16,
  },
  empty_column: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
  },
  empty_column_text: {
    fontSize: 18,
  },
  add_ticket_button: {
    color: 'white',
    fontSize: 16,
    width: '100%',
  },
  search_container: {
    borderColor: '#aaa',
    borderWidth: 1,
    flex: 3,
    borderRadius: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search_icon: {
    marginLeft: 12,
  },
  search_text: {
    fontSize: 18,
    paddingVertical: 18,
    paddingLeft: 8,
  },
});
