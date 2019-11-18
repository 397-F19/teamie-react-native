import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, AppRegistry, ScrollView, FlatList} from 'react-native';
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
      visible: false,
      restaurantDBCopy: [],
      filteredRestaurants: [],
      vibe: "",
      numPeople: "",
      budget: "",
      selectedTime: ""
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
      restaurantDBCopy: restaurantsList,
      filteredRestaurants: restaurantsList
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

  matchFilter (r) {
    let filterStatus = []
    // Vibe
    if (this.state.vibe === "" || r.vibes.includes(this.state.vibe)) {
      filterStatus.push(true);
    }
    else {
      filterStatus.push(false);
    }
    // Party Size
    if (this.state.numPeople === "" || (r.party_size.includes(this.state.numPeople))) {
      filterStatus.push(true);
    }
    else {
      filterStatus.push(false);
    }
    // Budget
    if (this.state.budget === "" || (parseFloat(r.price) <= parseFloat(this.state.budget))) {
      filterStatus.push(true);
    }
    else {  
      filterStatus.push(false);
    }
    // Time
    let selectedStart;
    let selectedEnd;
    if (this.state.selectedTime === "lunch") {
      selectedStart = 1130;
      selectedEnd = 1330;
    }
    else if (this.state.selectedTime === "dinner") {
      selectedStart = 1730;
      selectedEnd = 1930;
    }
    if (this.state.selectedTime === "" || (selectedStart >= r.start && selectedEnd <= r.end)) {
      filterStatus.push(true);
    }
    else {
      filterStatus.push(false);
    }
    return filterStatus.every(val => val);
  }

  updateFilteredRestaurants() {
    let currFilteredRestaurants = this.state.restaurantDBCopy.filter(r => this.matchFilter(r));
    this.setState({filteredRestaurants: currFilteredRestaurants});
  }

  render() {

    return ( <ScrollView >
      <Appbar style={styles.bottom}>
        <Appbar.Content title = "Teamie"/>
      </Appbar>

      <View>
        {/* Vibe Filter */}
        <List.Accordion style={styles.list} left={props => <List.Icon {...props} icon="format-list-bulleted-type" />}>
          <List.Item title="Good for clients" onPress={() => {this.setState({vibe: "good_for_clients"}); this.updateFilteredRestaurants();}}/> 
          <List.Item title="Family Friendly" onPress={() => {this.setState({vibe : "family_friendly"}); this.updateFilteredRestaurants();}}/> 
          <List.Item title = "Happy Hour" onPress={() => {this.setState({vibe: "happy_hour"}); this.updateFilteredRestaurants();}}/> 
          <List.Item title = "Internal Team Bonding" onPress={() => {this.setState({vibe: "team_bonding"}); this.updateFilteredRestaurants();}}/> 
        </List.Accordion>
        
        {/* Party Size Filter */}
        <List.Accordion style={styles.list} left={props => <List.Icon {...props} icon="account-group"/>}>
          <List.Item title="Small 2~4" onPress={() => {this.setState({numPeople: "small"}); this.updateFilteredRestaurants();}}/> 
          <List.Item title="Medium 5~9" onPress={() => {this.setState({numPeople: "medium"}); this.updateFilteredRestaurants();}}/>
          <List.Item title = "Large 10+" onPress={() => {this.setState({numPeople: "large"}); this.updateFilteredRestaurants();}}/>
        </List.Accordion>

        {/* Time Filter */}
        <List.Accordion style={styles.list} left={props => <List.Icon {...props} icon = "calendar-clock" />}>
          <List.Item title="Lunch 11:30 -1:30" onPress={() => {this.setState({selectedTime: "lunch"}); this.updateFilteredRestaurants();}}/> 
          <List.Item title = "Dinner 17:30 -19:30" onPress = {() => {this.setState({selectedTime: "dinner"}); this.updateFilteredRestaurants();}}/> 
        </List.Accordion> 
      </View> 

      {/* Budget Filter  */}
      <TextInput icon="currency-usd" label='budget' onChangeText={text => {this.setState({budget: text}); this.updateFilteredRestaurants();}}/>
      <Button onPress={this._showDialog}>Send out Poll</Button> 
    <Divider/>
    
    <FlatList
          data={this.state.filteredRestaurants}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <View style={styles.restaurantCard}>
           
        <View style={{width: '30%'}}>
        <Image
          style={styles.image}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
        
         </View>
        
        <View style={{width: '50%'}}>
        <Text style={styles.headline}>{item.name}</Text>
                  <Paragraph style={styles.info}>{item.type}</Paragraph>
                  </View>
        <View style={{width: '20%'}} >
        <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                   
                  />
                  </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
    borderWidth: 1,
    borderRadius: 4, 
    borderStyle: "solid",
    borderColor: '#000', 
  },
  image: {
    margin: 0,
    width: 100,
    height: 100,
  },
  headline: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
  },

  info: {
    marginLeft: 20,
    fontSize: 10
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});