import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, AppRegistry, ScrollView, FlatList} from 'react-native';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';
import {Snackbar, Chip, Avatar, Button, Card, Title, Paragraph, List, TextInput, Dialog, Portal, Divider, FAB} from 'react-native-paper';
import * as firebase from 'firebase';
import RestaurantCard from './RestaurantCard.js';

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
      visible: true,
      restaurantDBCopy: [],
      filteredRestaurants: [],
      vibe: "",
      numPeople: "",
      budget: "",
      selectedTime: "",
      selectedRestaurants: []
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

  addToPoll(selectedRestaurant) {
    let newSelectedRestaurants = this.state.selectedRestaurants.concat([selectedRestaurant]);
    console.log("adding to poll, color: ");
    this.setState({selectedRestaurants: newSelectedRestaurants});
  }

  deleteFromPoll(selectedRestaurant) {
    let newSelectedRestaurants = this.state.selectedRestaurants.filter(r => r !== selectedRestaurant);
    this.setState({selectedRestaurants: newSelectedRestaurants});
  }

  render() {

    return ( <ScrollView >
      <Appbar fixed style={styles.bottom} >
      <Appbar.Action icon="filter-outline" onPress={this._showDialog} />
       
        <Appbar.Content title = "Teamie"/>
      </Appbar>
      <View>

        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
                <ScrollView>

            <Dialog.Content>
               
         
           {/* Vibe Filter */}
          <Text>Vibe</Text>
          <Chip outlined onPress={() => {this.setState({vibe: "good_for_clients"}); this.updateFilteredRestaurants();}}>Good for clients</Chip>   
          <Chip onPress={() => {this.setState({vibe : "family_friendly"}); this.updateFilteredRestaurants();}}>Family Friendly</Chip>
          <Chip onPress={() => {this.setState({vibe: "happy_hour"}); this.updateFilteredRestaurants();}}>Happy Hour</Chip>
          <Chip onPress={() => {this.setState({vibe: "team_bonding"}); this.updateFilteredRestaurants();}}>Internal Team Bonding</Chip>
           {/* Size Filter */}
          <Text>Size</Text>
          <Chip onPress={() => {this.setState({numPeople: "small"}); this.updateFilteredRestaurants();}}>Small 2~4</Chip>
          <Chip onPress={() => {this.setState({numPeople: "medium"}); this.updateFilteredRestaurants();}}>Medium 5~9</Chip>
          <Chip onPress={() => {this.setState({numPeople: "large"}); this.updateFilteredRestaurants();}}>Large 10+</Chip>
           {/* Time Filter */}
          <Text>Time</Text>
          <Chip onPress={() => {this.setState({selectedTime: "lunch"}); this.updateFilteredRestaurants();}}>Lunch 11:30 -1:30</Chip>
          <Chip onPress = {() => {this.setState({selectedTime: "dinner"}); this.updateFilteredRestaurants();}}>Dinner 17:30 -19:30</Chip>
           {/* Budget Filter */}
          <Text>Budget</Text>
          <TextInput icon="currency-usd" label='budget' onChangeText={text => {this.setState({budget: text}); this.updateFilteredRestaurants();}}/>
          
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Done</Button>
            </Dialog.Actions>
            </ScrollView>
          </Dialog>
        </Portal>


        
         <FlatList
            data={this.state.selectedRestaurants}
            renderItem={({item}) =>
            <View>
              <Text>
                {item}
              </Text>
            </View>}>
            </FlatList>
            <Button onPress = {this._hideDialog}>Send out poll</Button> 
       
      </View>
     
      
      

    <FlatList
          data={this.state.filteredRestaurants}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <RestaurantCard addToPoll={this.addToPoll.bind(this)} deleteFromPoll={this.deleteFromPoll.bind(this)} restaurant={item}/>
        //     <View style={styles.restaurantCard}>
           
        // <View style={{width: '30%'}}>
        // <Image
        //   style={styles.image}
        //   source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        // />
        
        //  </View>
        
        // <View style={{width: '50%'}}>
        // <Text style={styles.headline}>{item.name}</Text>
        //           <Paragraph style={styles.info}>{item.type}</Paragraph>
        //           </View>
        // <View style={{width: '20%'}} >
        // <FAB
        //             style={styles.fab}
        //             small
        //             icon="plus" 
                    
        //             onPress={(style) => {this.addToPoll(style, this.state.selectedRestaurants.concat([item.name]))}}
        //           />
        //           </View>
        //   </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />

      <View>
{/* 
      <Portal>
        <Dialog visible = {this.state.visible} onDismiss = {this._hideDialog}>
        <Dialog.Title> Poll </Dialog.Title> 
          <Dialog.Content>
            <FlatList
            data={this.state.selectedRestaurants}
            renderItem={({item}) =>
            <View>
              <Paragraph>
                {item}
              </Paragraph>
            </View>}>
            </FlatList>
          </Dialog.Content> 
          <Dialog.Actions >
            <Button onPress = {this._hideDialog}>Send out poll</Button> 
          </Dialog.Actions> 
        </Dialog> 
      </Portal> 
*/}
   
      
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
    backgroundColor: '#8a2be2', 
  },
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
  },
});