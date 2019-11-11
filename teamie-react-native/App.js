import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, List, TextInput, Dialog, Portal} from 'react-native-paper';


const App = () => {
  state = {
    expanded: true,
    text: '',
    visible: false,
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  return (
    <View>
    <Appbar style={styles.bottom}>
    <Appbar.Content
          title="Teamie"
          
        />

    <Appbar.Action icon="cart-minus" onPress={this._showDialog}/>
    </Appbar>
    
  
  
    <List.Accordion style={styles.list}
          //title="The vibe we want"
          left={props => <List.Icon {...props} icon="format-list-bulleted-type" />}
          //expanded={this.state.expanded}
          //onPress={this._handlePress}
        >
          <List.Item title="Good for clients" 
          onPress={() => console.log('Pressed good for clients')}/>
          <List.Item title="Family Friendly" 
          onPress={() => console.log('Pressed family friendly')}/>
          <List.Item title="Happy Hour" 
          onPress={() => console.log('Pressed happy hour')}/>
          <List.Item title="Internal Team Bonding" 
          onPress={() => console.log('Pressed internal team bonding')}/>
        </List.Accordion>
    <List.Accordion style={styles.list}
          //title="Our Party Size is"
          left={props => <List.Icon {...props} icon="account-group" />}
        >
           <List.Item title="Small 2~4" 
          onPress={() => console.log('Pressed small')}/>
           <List.Item title="Medium 5~9" 
          onPress={() => console.log('Pressed medium')}/>
           <List.Item title="Large 10+" 
          onPress={() => console.log('Pressed large')}/>
          

        </List.Accordion>

       
      
        <List.Accordion style={styles.list}
          //title="Our Time Preference is"
          left={props => <List.Icon {...props} icon="calendar-clock" />}
        >
          <List.Item title="Lunch 11:30 -1:30" 
          onPress={() => console.log('Pressed lunch')}/>
           <List.Item title="Dinner 17:30 -19:30" 
          onPress={() => console.log('Pressed dinner')}/>
        </List.Accordion>

        <TextInput
        icon="currency-usd"
        label='budget'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />


      <View>
    
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Poll</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Option 1</Paragraph>
              <Paragraph>Option 2</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Send out poll</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
      </View>
    </View>
  );
}

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent('main', () => Main);


const styles = StyleSheet.create({
  list: {
    width: 100,

  },

  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
