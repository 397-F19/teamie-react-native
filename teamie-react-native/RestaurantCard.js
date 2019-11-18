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
        return(
            <View style={styles.restaurantCard}>
           
        <View style={{width: '30%'}}>
        <Image
          style={styles.image}
          source={require('./images/1.jpg')}
        />
          

         </View>
        
        <View style={{width: '50%'}}>
        <Text style={styles.headline}>{this.props.restaurant.name}</Text>
                  <Paragraph style={styles.info}>{this.props.restaurant.type}</Paragraph>
                  </View>
        <View style={{width: '20%'}} >
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
export default RestaurantCard;