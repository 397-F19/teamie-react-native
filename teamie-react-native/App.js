import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ScrollView
} from 'react-native';
import {
  Provider as PaperProvider,
  Appbar
} from 'react-native-paper';
import {
  Chip,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  TextInput,
  Dialog,
  Portal
} from 'react-native-paper';
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
      databaseCopy: {}
    }
    this.handleData = this.handleData.bind(this);
    //db.ref().on('value', this.handleData, e => console.log(e));
  }

  handleData(snap) {
    if (snap.val()) {
      this.setState({
        databaseCopy: snap.val(),
      }); //not working
      console.log(snap.val()); //working
    }
  }

  componentDidMount() {

  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    }).bind(this);

  _showDialog = () => this.setState({
    visible: true
  });

  _hideDialog = () => this.setState({
    visible: false
  });


  render() {
    let restaurantsList = [];
    db.ref().on('value', (snap) => {
      snap.val().restaurants.map(r => {
        restaurantsList.push(r.name)
        console.log(restaurantsList);
      })
    }, e => console.log(e));

    return ( <
      ScrollView >
      <
      Appbar style = {
        styles.bottom
      } >
      <
      Appbar.Content title = "Teamie"

      /
      >

      <
      Appbar.Action icon = "cart-minus"
      onPress = {
        this._showDialog
      }
      /> <
      /Appbar>


      <
      View >
      <
      List.Accordion style = {
        styles.list
      }
      //title="The vibe we want"
      left = {
        props => < List.Icon {
          ...props
        }
        icon = "format-list-bulleted-type" / >
      }
      //expanded={this.state.expanded}
      //onPress={this._handlePress}
      >
      <
      List.Item title = "Good for clients"
      onPress = {
        () => console.log('Pressed good for clients')
      }
      /> <
      List.Item title = "Family Friendly"
      onPress = {
        () => console.log('Pressed family friendly')
      }
      /> <
      List.Item title = "Happy Hour"
      onPress = {
        () => console.log('Pressed happy hour')
      }
      /> <
      List.Item title = "Internal Team Bonding"
      onPress = {
        () => console.log('Pressed internal team bonding')
      }
      /> <
      /List.Accordion> <
      List.Accordion style = {
        styles.list
      }
      //title="Our Party Size is"
      left = {
        props => < List.Icon {
          ...props
        }
        icon = "account-group" / >
      } >
      <
      List.Item title = "Small 2~4"
      onPress = {
        () => console.log('Pressed small')
      }
      /> <
      List.Item title = "Medium 5~9"
      onPress = {
        () => console.log('Pressed medium')
      }
      /> <
      List.Item title = "Large 10+"
      onPress = {
        () => console.log('Pressed large')
      }
      />


      <
      /List.Accordion>



      <
      List.Accordion style = {
        styles.list
      }
      //title="Our Time Preference is"
      left = {
        props => < List.Icon {
          ...props
        }
        icon = "calendar-clock" / >
      } >
      <
      List.Item title = "Lunch 11:30 -1:30"
      onPress = {
        () => console.log('Pressed lunch')
      }
      /> <
      List.Item title = "Dinner 17:30 -19:30"
      onPress = {
        () => console.log('Pressed dinner')
      }
      /> <
      /List.Accordion> <
      /View> <
      TextInput icon = "currency-usd"
      label = 'budget'
      // value={this.state.text}
      onChangeText = {
        text => this.setState({
          text
        })
      }
      />


      <
      View >

      <
      Portal >
      <
      Dialog visible = {
        this.state.visible
      }
      onDismiss = {
        this._hideDialog
      } >
      <
      Dialog.Title > Poll < /Dialog.Title> <
      Dialog.Content >
      <
      Paragraph > Option 1 < /Paragraph> <
      Paragraph > Option 2 < /Paragraph> <
      /Dialog.Content> <
      Dialog.Actions >
      <
      Button onPress = {
        this._hideDialog
      } > Send out poll < /Button> <
      /Dialog.Actions> <
      /Dialog> <
      /Portal> <
      Text > {
        restaurantsList
      } < /Text> <
      /View> <
      /ScrollView>
    );
  }
}

export default function Main() {
  return ( <
    PaperProvider >
    <
    App / >
    <
    /PaperProvider>
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
  }
});