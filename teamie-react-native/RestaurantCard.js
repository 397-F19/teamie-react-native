import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, AppRegistry, ScrollView, FlatList} from 'react-native';
import {Chip, Avatar, Button, Card, Title, Paragraph, List, TextInput, Dialog, Portal, Divider, FAB} from 'react-native-paper';

class RestaurantCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonColor: '#8a2be2',
            added: false,
            icon: "plus"
        };
    };
    
    render() {
      var dat = {url: this.props.imgUrl};
      let imgUrl = "https://loremflickr.com/240/240/food,restaurants,plate/all"
      console.log("img url: " + this.props.imgUrl)
        return(
            <View style={styles.restaurantCard}>
           
        <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{uri: this.props.restaurant.imgUrl}}
        />
         </View>
        
        <View style={{width: '55%'}}>
        <Text style={styles.headline}>{this.props.restaurant.name}</Text>
                  <Paragraph style={styles.info}>{this.props.restaurant.type} ${this.props.restaurant.price}</Paragraph>
                  <Paragraph style={styles.info}>{this.props.restaurant.distance} mi, {this.props.restaurant.time} min</Paragraph>
                  </View>
        <View style={{width: '15%'}} >
        <FAB
                    style={{position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                            backgroundColor: this.state.buttonColor
                        }}
                    small
                    icon={this.state.icon}
                    onPress={() => {
                        if (!this.state.added) {
                            this.setState({buttonColor: "#000", added: true, icon: "minus"})
                            this.props.addToPoll(this.props.restaurant.name);
                        }
                        else {
                            this.setState({buttonColor: '#8a2be2', added: false, icon: "plus"})
                            this.props.deleteFromPoll(this.props.restaurant.name);
                        }
                    }}
                  />
                  </View>
          </View>
        )
    }
 
};  

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
      width: '95%',
      // borderWidth: 1,
      // borderStyle: "solid",
      // borderColor: '#000', 
      backgroundColor: '#fafafa',
      borderRadius: 10,
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginTop: 20,
    },
    image: {
      margin: 0,
      width: 100,
      height: 100,
      borderRadius: 10,
      shadowColor: '#fff',
    },
    headline: {
      marginTop: 8,
      marginLeft: 20,
      fontSize: 20,
    },
  
    info: {
      marginLeft: 20,
      fontSize: 10,
      marginTop: 1,
    },
  
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    imageWrapper: {
      width: '30%',
    }
  });
export default RestaurantCard;