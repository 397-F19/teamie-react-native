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
          
        <Text style={styles.badge}>{this.props.restaurant.type}</Text>
        
        <Text style={styles.headline}>{this.props.restaurant.name}</Text>
        
        <Text style={styles.info}>${this.props.restaurant.price}</Text>
        <Text style={styles.info}>{this.props.restaurant.distance} mi, {this.props.restaurant.time} min</Text>
        
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
      backgroundColor: '#fafafa',
      borderRadius: 10,
      borderBottomWidth: 0,
      shadowColor: '#6d6d6d',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      marginTop: 20,
    },
    image: {
      margin: 0,
      width: 80,
      height: 100,
      borderRadius: 10,
      shadowColor: '#fff',
    },
    headline: {
      marginTop: 4,
      fontSize: 20,
      fontWeight: '500',
    },
    badge: {
      //backgroundColor: '#4169E1',
      fontSize: 12,
      color: '#6200ea',
      marginTop: 8,
      //borderRadius: 4,
    },
    info: {
      //marginLeft: 20,
      fontSize: 10,
      marginTop: 4,
    },
  
    fab: {
      position: 'absolute',
      margin: 16,
    },
    imageWrapper: {
      
      width: '30%',
    },
    
  });
export default RestaurantCard;