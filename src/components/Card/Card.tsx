import React from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Linking,
} from 'react-native';
import { DraxView } from 'react-native-drax';
import { TICKET_STATE } from '@app/reducer';

type CardProps = {
  column: number;
  ticket: TICKET_STATE;
  testID: string;
};

/**
 * @author
 * @function @Card
 * @param {CardProps.column} column
 * @param {CardProps.ticket} ticket
 * @param {CardProps.testID} testID
 * @returns {React.Component}
 **/

export const Card = ({ ticket, column, testID }: CardProps) => {
  const {
    card,
    card_title,
    card_description,
    card_link,
    card_tag,
    card_tag_container,
    card_tag_title_header,
    card_id,
    dragging,
  } = styles;

  const handleLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <DraxView
      style={[card]}
      draggingStyle={dragging}
      dragPayload={{ ticketId: ticket.id, actualColumn: column }}
    >
      <View style={card_tag_container}>
        <Text style={card_tag}>{ticket.tag}</Text>
      </View>

      <View testID={testID}>
        <View style={card_tag_title_header}>
          <Text style={card_title}>{ticket.title}</Text>
          <Text style={card_id}>{ticket.id}</Text>
        </View>
        <Text style={card_description} numberOfLines={2}>
          {ticket.description}
        </Text>
        <TouchableHighlight
          onPress={() => handleLink(ticket.link)}
          testID="card-link"
        >
          <Text style={card_link}>Document link</Text>
        </TouchableHighlight>
      </View>
    </DraxView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 4,
    marginBottom: 16,
    padding: 12,
    alignItems: 'flex-start',
  },
  card_tag_container: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  card_tag_title_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    marginBottom: 12,
  },
  card_tag: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
  card_id: {
    fontFamily: 'Nunito',
    fontSize: 14,
  },
  card_title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card_description: {
    fontFamily: 'Nunito',
    color: '#111',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  card_link: {
    fontFamily: 'Nunito',
    color: '666',
    textDecorationLine: 'underline',
  },
  dragging: {
    opacity: 0.2,
  },
});
