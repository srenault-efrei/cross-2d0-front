import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
    AsyncStorage
} from 'react-native'
import styles from '../../assets/styles/messages'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import global from '../../assets/css/global.js'


export default class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token:'',
            user:null,
            type:null,
            messages:null
        }
    }
    
    async componentDidMount() {
        this.setComponent()
    
      }

   async fetchUser(){
        let data = await AsyncStorage.getItem('data')
        if(data!= undefined){
            data = JSON.parse(data)
            this.setState({token:data.meta.token})
            if (data.customer){
                this.setState({user:data.customer,type:'customer'})
            }
            else{
                this.setState({user:data.association,type:'association'})
            }
        } 
        
    }

    fetchMessages = async () => {
        if(this.state.user != null){
            const settings = {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + this.state.token,
                  'Content-Type': 'application/json',
                }
              };
          
              try {
                let url =`https://trocify.herokuapp.com/api/users/${this.state.user.id}/messages/`
                const response = await fetch(url, settings);
                const json = await response.json();
                if(json){  
                    this.setState({messages:json.data.message})
                }
               
              
              } catch (e) {
                console.log(e)
              }
        }


      }

      
     setComponent = async () => {
        this.props.navigation.addListener('focus', async () => {
        await this.fetchUser();
        this.fetchMessages()
        })
    }

    getConvName(item){
        if(item.recipient.id == this.state.user.id){
            return item.sender.email
        }
        else{
            return item.recipient.email
        }
    }


    getRenderContent(msgs){
        if(msgs != null && this.state.user!=null){
   
            let alreadyHere=[]
            msgs = msgs.filter((msg)=>{
                    if(msg.sender.email != this.state.user.email){
                        if(!alreadyHere.includes(msg.recipient.email) && !alreadyHere.includes(msg.sender.email) ){
                            alreadyHere.push(msg.sender.email)
                            return msg
                        }
                    }
                    if(!alreadyHere.includes(msg.recipient.email) && !alreadyHere.includes(msg.sender.email) ){
                        alreadyHere.push(msg.recipient.email)
                        return msg
                        } 
                    }   
            )
        
            
            
            

            return(
                <SafeAreaView style={styles.contentContainer}>
                    <FlatList
                    data={msgs}
                    renderItem={({ item }) => 
                    <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={() => this.props.navigation.navigate('Messages Box',this.getUserConv(item))} >
                         <View style={{flex:1,width:'95%',borderWidth:1,borderRadius:15,marginTop:15,padding:10}}>
                        <View style={styles.messageCard}>
                            <Text style={{ fontSize: 15}} >{this.getConvName(item)} </Text >
                        </View>
                        <View style={styles.messageCard}>
                            <Text style={{ fontSize: 15,color:'gray'}} >{item.content.slice(0,25)}... </Text >
                        </View>
                        <View style={{flex:1,alignItems:'flex-end',color:'gray'}}>
                            <Text style={{ fontSize: 15,color:'gray'}} >{item.createdAt.slice(0,25)}... </Text >
                        </View>
                    </View>     
                    </TouchableOpacity>
                    
                    }
                    keyExtractor={item => String(item.id)}
                />
            </SafeAreaView>
            );
            
        }
    }

    getUserConv(item){
        if(item.sender.id == this.state.user.id){
            return ({interlocutor:item.recipient.id})
        }
        return ( {interlocutor:item.sender.id} )
    }
  
    render() {
       
        const { navigation } = this.props
        const messages = this.state.messages  
        return (
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
            <MyHeader type='Classic' navigation={navigation} />
          
            {this.getRenderContent(messages)}
                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation}/>

            </SafeAreaView>
        )
    }
}
