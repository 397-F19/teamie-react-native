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
      vibe: {
        "good_for_clients": false,
        "family_friendly": false,
        "happy_hour": false,
        "team_bonding": false,
      },
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
    let selectedVibes = {
      "good_for_clients" : r.vibes.indexOf("good_for_clients") != -1, 
      "family_friendly" : r.vibes.indexOf("family_friendly") != -1, 
      "happy_hour" : r.vibes.indexOf("happy_hour") != -1, 
      "team_bonding" : r.vibes.indexOf("team_bonding") != -1
    }
    console.log("selected vibes")
    console.log(JSON.stringify(selectedVibes)) 
    console.log("vibes")
    console.log(JSON.stringify(this.state.vibe))
    
    if (
          ((this.state.vibe["good_for_clients"] == false) &&
          (this.state.vibe["family_friendly"] == false) &&
          (this.state.vibe["happy_hour"] == false) &&
          (this.state.vibe["team_bonding"] == false)) ||
          
          ((this.state.vibe["good_for_clients"] == selectedVibes["good_for_clients"]) ||
          (this.state.vibe["family_friendly"] == selectedVibes["family_friendly"]) ||
          (this.state.vibe["happy_hour"] == selectedVibes["happy_hour"]) ||
          (this.state.vibe["team_bonding"] == selectedVibes["team_bonding"]))) {
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
          <Chip style={styles.chip} selected={this.state.vibe["good_for_clients"]} onPress={() => {
            let updatedVibe = this.state.vibe; 
            updatedVibe["good_for_clients"] = !updatedVibe["good_for_clients"]; 
            this.setState({vibe: updatedVibe}); 
            this.updateFilteredRestaurants();  
            }}>Good for clients</Chip>   

          <Chip style={styles.chip} selected={this.state.vibe["family_friendly"]} onPress={() => {
            let updatedVibe = this.state.vibe; 
            updatedVibe["family_friendly"] = !updatedVibe["family_friendly"]; 
            this.setState({vibe: updatedVibe}); 
            this.updateFilteredRestaurants();  
            }}>Family Friendly</Chip>

          <Chip style={styles.chip} selected={this.state.vibe["happy_hour"]} onPress={() => {
            let updatedVibe = this.state.vibe; 
            updatedVibe["happy_hour"] = !updatedVibe["happy_hour"]; 
            this.setState({vibe: updatedVibe}); 
            this.updateFilteredRestaurants();  
            }}>Happy Hour</Chip>

          <Chip style={styles.chip} selected={this.state.vibe["team_bonding"]} onPress={() => {
            let updatedVibe = this.state.vibe; 
            updatedVibe["team_bonding"] = !updatedVibe["team_bonding"];
            this.setState({vibe: updatedVibe}); 
            this.updateFilteredRestaurants();  
            }}>Internal Team Bonding</Chip>

           {/* Size Filter */}
          <Text>Size</Text>
          <Chip style={styles.chip} style={styles.chip} onPress={() => {this.setState({numPeople: "small"}); this.updateFilteredRestaurants();}}>Small 2~4</Chip>
          <Chip style={styles.chip} style={styles.chip} onPress={() => {this.setState({numPeople: "medium"}); this.updateFilteredRestaurants();}}>Medium 5~9</Chip>
          <Chip style={styles.chip} onPress={() => {this.setState({numPeople: "large"}); this.updateFilteredRestaurants();}}>Large 10+</Chip>
           
           {/* Time Filter */}
          <Text>Time</Text>
          <Chip style={styles.chip} onPress={() => {this.setState({selectedTime: "lunch"}); this.updateFilteredRestaurants();}}>Lunch 11:30 -1:30</Chip>
          <Chip style={styles.chip} onPress = {() => {this.setState({selectedTime: "dinner"}); this.updateFilteredRestaurants();}}>Dinner 17:30 -19:30</Chip>
           
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


        
         <FlatList style={styles.poll} 
            data={this.state.selectedRestaurants}
            renderItem={({item}) =>
            <View>
              <Text style={styles.cart}>
                {item}
              </Text>
            </View>}>
            </FlatList>
            <Button onPress ={this._hideDialog}>Send out poll</Button> 
       
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
    height: 100,
  },
  chip:{
    
    marginTop: 1, 
  
  },
  cart:{
    backgroundColor: '#8a2be2', 
    color: '#fff',
    fontSize: 16,
    padding: 6,
  },
  poll:{
    borderBottomColor: '#fff',
  },
});