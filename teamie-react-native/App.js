import React, {Component} from 'react';
import {StyleSheet, Text,View, AppRegistry, ScrollView, FlatList} from 'react-native';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';
import {Chip, Avatar, Button, Card, Title, Paragraph, List, TextInput, Dialog, Portal, Divider, FAB} from 'react-native-paper';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyAFzpavaaS5qMRo8FSZsqsZAaglgXL8H04",
   authDomain: "teamie-blue.firebaseapp.com",
   databaseURL: "https://teamie-blue.firebaseio.com",
   projectId: "teamie-blue",
   storageBucket: "teamie-blue.appspot.com",
   messagingSenderId: "373175945503",
   appId: "1:373175945503:web:0ce516f07c5d387642882a"
 };

firebase.initializeApp(firebaseConfig);

const db = firebase.database();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      text: '',
      visible: false,
      restaurantDBCopy: []
    }
    this.handleData = this.handleData.bind(this);
    db.ref().on('value', this.handleData, e => console.log(e));
  }

  handleData() {
    let restaurantsList = [];
    db.ref().on('value', (snap) => {
      snap.val().restaurants.map(r => {
        restaurantsList.push(r)
      })
    }, e => console.log(e));
    this.setState({
      restaurantDBCopy: restaurantsList
    });
    console.log("handleData called");
  }

  componentDidMount() {

  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  _showDialog = () => this.setState({
    visible: true
  });

  _hideDialog = () => this.setState({
    visible: false
  });


  render() {

    return ( <ScrollView >
      <Appbar style={styles.bottom}>
        <Appbar.Content title = "Teamie"/>
      </Appbar>

      <View>
        {/* Vibe Filter */}
        <List.Accordion style={styles.list} left={props => <List.Icon {...props} icon="format-list-bulleted-type" />}>
          <List.Item title="Good for clients" onPress={() => console.log('Pressed good for clients')}/> 
          <List.Item title="Family Friendly" onPress={() => console.log('Pressed family friendly')}/> 
          <List.Item title = "Happy Hour" onPress={() => console.log('Pressed happy hour')}/> 
          <List.Item title = "Internal Team Bonding" onPress={() => console.log('Pressed internal team bonding')}/> 
        </List.Accordion>
        
        {/* Party Size Filter */}
        <List.Accordion style={styles.list} left={props => <List.Icon {...props} icon="account-group"/>}>
          <List.Item title="Small 2~4" onPress={() => console.log('Pressed small')}/> 
          <List.Item title="Medium 5~9" onPress={() => console.log('Pressed medium')}/>
          <List.Item title = "Large 10+" onPress={() => console.log('Pressed large')}/>
        </List.Accordion>

        {/* Time Filter */}
        <List.Accordion style={styles.list} left={props => < List.Icon {...props} icon = "calendar-clock" />}>
          <List.Item title="Lunch 11:30 -1:30" onPress={() => console.log('Pressed lunch')}/> 
          <List.Item title = "Dinner 17:30 -19:30" onPress = {() => console.log('Pressed dinner')}/> 
        </List.Accordion> 
      </View> 

      {/* Budget Filter */} 
      <TextInput icon="currency-usd" label='budget' onChangeText={text => this.setState({text})}/>
      <Button onPress={this._showDialog}>Send out Poll</Button> 
    <Divider/>
    
    <FlatList
          data={this.state.restaurantDBCopy}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View>
            <Card>
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.type}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <FAB
                  style={styles.fab}
                  small
                  icon="plus"
                  onPress={() => console.log('Pressed')}
                />
              </Card.Actions>
            </Card>
            <Divider/>
          </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />

      <View>

      <Portal>
        <Dialog visible = {this.state.visible} onDismiss = {this._hideDialog}>
        <Dialog.Title> Poll </Dialog.Title> 
          <Dialog.Content>
            <Paragraph> Option 1 </Paragraph>
            <Paragraph> Option 2 </Paragraph> 
          </Dialog.Content> 
          <Dialog.Actions >
            <Button onPress = {this._hideDialog}>Send out poll</Button> 
          </Dialog.Actions> 
        </Dialog> 
      </Portal> 

      
      </View> 

      </ScrollView>
    );
  }
}

export default function Main() {
  return ( <PaperProvider>
    <App/>
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

  restaurantCard: {
    color: 'blue',
    width: 325
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
