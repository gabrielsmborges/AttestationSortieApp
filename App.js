import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Linking , AsyncStorage} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput, Button, Card, Title, Paragraph, Avatar} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AdMobBanner, AdMobInterstitial, PublisherBanner,AdMobRewarded } from 'expo-ads-admob'
import {YellowBox} from 'react-native';
console.disableYellowBox = true;

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

class attest_profile{
  constructor(prenom, nom, dt_naissance, lieu_naissance, addresse, ville, cd_postal, motif, date){
    this.prenom = prenom
    this.nom = nom
    this.dt_naissance = dt_naissance
    this.lieu_naissance = lieu_naissance
    this.addresse = addresse
    this.ville = ville
    this.cd_postal = cd_postal
    this.motif = motif
    this.date = date
  }


   getData(){
    return(
      {
        "nom": this.nom,
        "prenom": this.prenom,
        "dt_naissance": this.dt_naissance,
        "lieu_naissance": this.lieu_naissance,
        "addresse": this.addresse,
        "ville": this.ville,
        "cd_postal": this.cd_postal,
        "motif": this.motif,
        "date": this.date
      }
    )
  }
}

class Profile extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  date = new Date(Date.parse(this.props.profile.date))
  render(){
    return(
      <View style={{marginVertical: 10}}>
        <Card>
        <View style={{flexDirection: "row"}}>
          <View style={{flex: 5}}> 
            <Card.Title title={this.props.profile.prenom} subtitle={this.props.profile.motif} />
            <Card.Content>
              <Text>
                {
                  `${this.date.getDate() >= 10 ? "": "0"}${this.date.getDate()}/${this.date.getMonth() >= 10 ? "": "0"}${this.date.getMonth() + 1}/${this.date.getFullYear()} à ${this.date.getHours() >= 10 ? "": "0"}${this.date.getHours()}h${this.date.getMinutes() >= 10 ? "": "0"}${this.date.getMinutes()}`
               }
              </Text>
              <Text>Motif</Text>
            </Card.Content>
            <Card.Actions>
              <Button>PDF</Button>
            </Card.Actions>
          </View>

          <View style={{flex: 5}}>
          <Card.Cover  style={{flex: 1}} source={{ uri: "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=I+Love+QR+Codes!++HI+MOM!&choe=UTF-8" }} />
          </View>
        </View>
        </Card>
      </View>
    )
  }
}

class Nouvelle extends React.Component{
  constructor(props){
    super(props)
    this.state={
      date: new Date(),
      nom:"",
      prenom: "",
      dt_naissance:"",
      lieu_naissance:"",
      addresse: "", 
      ville:"",
      cd_postal:"",
      motif:"",
      showdate : false,
      text: '',
      data: [{
        value: "Déplacements professionels",
      }, {
        value: "Achats (1ère nécessité/Professionel)",
      }, {
        value: "Consultations",
      },{
        value: "Motif familial",
      }, {
        value: "Assistance aux personnes vulnérables",
      }, {
        value: "Garde d'enfants",
      }, {
        value: "Déplacement bref/Activité physique (1km)",
      }, {
        value: "Convocation judiciaire ou administrative",
      }, {
        value: "Missions d'intérêt général sur demande de l'autorité administrative",
      }], 
      loadeAd: false,
    }
  }
  list_users = []
  async componentDidMount() {
    this.setState({
      date: new Date(),
      nom:"Borges",
      prenom: "Gabriel",
      dt_naissance:"25/01/2001",
      lieu_naissance:"Cascais",
      addresse: "7 Rue JEan Baptiste de la Quintine", 
      ville:"Chartres",
      cd_postal:"28000",
      list: []
    })
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    AdMobInterstitial.addEventListener("interstitialDidLoad", () => {
      console.log("Loaded");
    });
    /*AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      console.log("FailedToLoad")
    );*/
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("Opened")
    );
    AdMobInterstitial.addEventListener('interstitialDidClose', () => {
      console.log('didclose')
    });
    await AdMobInterstitial.requestAdAsync();
    //console.log(this.state.list)
    }


    componentWillUnmount() {
      AdMobInterstitial.removeAllListeners();
      console.log("Will Unmount")
    }


    _handlePress = async () => {
      console.log('pressed')
      AdMobInterstitial.showAdAsync()
      setTimeout(()=>{this.verify()}, 500)
    };




  verify(){
    console.log("verifying")
    setTimeout(()=>{
      if(this.state.prenom){
        if(this.state.nom){
          if(this.state.dt_naissance){
            if(this.state.lieu_naissance){
              if(this.state.addresse){
                if(this.state.ville){
                  if(this.state.cd_postal){
                    if(this.state.motif){
                      this.co()
                      return true
                    }else{
                      alert("Motif Vide")
                    }
                  }else{
                    alert("Code Postal Invalide")
                  }
                }else{
                  alert("Ville Invalide")
                }
              }else{
                alert("Adresse Invalide")
              }
            }else{
              alert("Lieu de Naissance Invalide")
            }
          }else{
            alert("Date de Naissance Invalide")
          }
        }else{
          alert("Nom Invalide")
        }
      }else{
        alert("Prénom Invalide")
      }
    }, 500)
  }

  co(){
    console.log('co connected')
    const newpers = new attest_profile(
      this.state.prenom,
      this.state.nom,
      this.state.dt_naissance,
      this.state.lieu_naissance,
      this.state.addresse,
      this.state.ville, 
      this.state.cd_postal,
      this.state.motif,
      this.state.date
      )
      //add a new pers to the list
      this.setState({list: newpers})
      this.props.update_parentlist(this.state.list)
  }



  render(){
    return(
      <SafeAreaView style={{backgroundColor: "#DDF4FF"}}> 
        <ScrollView style={{padding: 40}}>
          <Text style={{color: "#1D749D", fontSize: 30, fontWeight: "bold"}}>Nouvelle Attestation</Text>
          <Text style={{fontSize: 12}}>Remplissez vos informations et sélectionnez un motif.</Text>
          <View style={{marginVertical: 100}}>
            <TextInput
              label="Prénom:"
              value={this.state.prenom}
              onChangeText={prenom=> this.setState({prenom: prenom})}
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 10}}
            />
            <TextInput
              label="Nom:"
              value={this.state.nom}
              onChangeText={nom=> this.setState({nom: nom})}
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Date de naissance (jj/mm/aaaa):"
              value={this.state.dt_naissance}
              onChangeText={text => {
                if (text.match(/^\d{2}$/) !== null) {
                  text = text + '/';
              } else if (text.match(/^\d{2}\/\d{2}$/) !== null) {
                  text = text + '/';
              }
              this.setState({dt_naissance: text})
              }}
              maxLength = {10}
              keyboardType="numeric"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Lieu de Naissance:"
              value={this.state.lieu_naissance}
              onChangeText={lieu_naissance=> this.setState({lieu_naissance: lieu_naissance})}
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Addresse:"
              value={this.state.addresse}
              onChangeText={addresse=> this.setState({addresse: addresse})}
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Ville:"
              value={this.state.ville}
              onChangeText={ville=> this.setState({ville: ville})}
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Code Postal:"
              value={this.state.cd_postal}
              onChangeText={cd_postal=> this.setState({cd_postal: cd_postal})}
              keyboardType="numeric"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />

            <Text style={{fontSize:25, marginTop: 50}}>Motif de Sortie:</Text>
            <Dropdown
              label='Motif de Sortie'
              data={this.state.data}
              onChangeText = {value => {this.setState({motif: value})}}
            />
            <Text style={{fontSize:25, marginTop: 50}}>Date et Heure:</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 20}}>
            {this.state.showdate && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  this.setState({date: currentDate, showdate: false})
                }}
              />
            )}
              <Button style={{width: 150, marginHorizontal: 6, paddingVertical: 10}} color="#5AB7E3" mode="contained" onPress={()=>{this.setState({showdate: true, mode:"date"})}}>
                {`${this.state.date.getDate() >= 10 ? "": "0"}${this.state.date.getDate()}/${this.state.date.getMonth() >= 10 ? "": "0"}${this.state.date.getMonth() + 1}/${this.state.date.getFullYear()}`}
              </Button>
              <Button style={{width: 150, marginHorizontal: 6, paddingVertical: 10}} color="#5AB7E3" mode="contained" onPress={()=>{this.setState({showdate: true, mode: "time"})}}>
                {`${this.state.date.getHours() >= 10 ? "": "0"}${this.state.date.getHours()}h${this.state.date.getMinutes() >= 10 ? "": "0"}${this.state.date.getMinutes()}`}
              </Button>
            </View>
            <View style={{alignItems: "center", marginVertical: 30}}>
              <Button style={{width: 150, paddingVertical: 10}} color="#1D749D" mode="contained" onPress={this._handlePress} >
                Générer
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )

  }
}

class Infos extends React.Component{
  constructor(props){
    super(props)
    this.state= {
    }
  }
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#DDF4FF"}}>
        <ScrollView style={{padding: 40}}>
          <Text style={{color: "#1D749D", fontSize: 30, fontWeight: "bold"}}>Infos</Text>
          <View style={{marginTop: 50}}>
            <Text style={{fontSize: 15, marginVertical: 20}}>Cette application n"est pas gérée par le gouvernement</Text>
            <Text style={{fontSize: 15, marginVertical: 20, color: "#1D749D"}} onPress={() => Linking.openURL('https://media.interieur.gouv.fr/deplacement-covid-19/')}>Site officiel pour créer ses attestations</Text>
            <View style={{flexDirection: "row", marginVertical: 20}}>
              <Text>Application dévelopée par</Text>
              <Text style={{color: "#1D749D"}} onPress={() => Linking.openURL('http://gabrielborges.dev')}>Gabriel Borges</Text>
            </View>
          </View>
        </ScrollView>
        <Text style={{fontSize: 20, color: "white", position: "absolute", bottom: 0, margin: 50,padding: 10, backgroundColor: "#1D749D", borderRadius: 14}} onPress={() => Linking.openURL('mailto:gabrielsmborges@gmail.com')}>Contact</Text>
      </SafeAreaView>
    )
  }
}

class Mes extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
    render(){
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#DDF4FF"}}>
          <ScrollView>
            <View style={{margin: 40}}>
              {this.props.list.map(value => <Profile profile={value}/>)}
            </View>
            </ScrollView>
        </SafeAreaView>   
      );
    }
}

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.updatelist = this.updatelist.bind(this)
    this.state={
      list: []
    }
  }

  componentDidMount(){
    //AsyncStorage.setItem('@Attestation:users', JSON.stringify(this.state.list))
    AsyncStorage.getItem('@Attestation:users').then(value => {this.setState({list: JSON.parse(value)})})
  }
  updatelist(target){
    this.setState({
      list: [target, ...this.state.list]
    })
    AsyncStorage.setItem('@Attestation:users', JSON.stringify(this.state.list))
    AsyncStorage.getItem('@Attestation:users').then(value => {console.log(JSON.parse(value))})
  }

  /*_storeData = async () => {
    try {
      await AsyncStorage.setItem('@Attestation:users', "3");
    } catch (error) {
      console.log('Not saved')
    }
  };*/

  /*_retrieveData = async () => {
    var value,collect;
    try {
      value = await AsyncStorage.getItem('@Attestation:users').then(
        (values) => {
          collect = values;
          //console.log('Then: ',values);
        });
      if (value !== null) {
        return value
      }
    } catch (error) {
      console.log('Didn\'t get the data')
    }
    return collect;
  };*/

  render(){
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator 
            initialRouteName="Nouvelle Attestation"
            tabBarOptions={{
            activeTintColor: '#1D749D'
          }} >
            <Tab.Screen name="Mes Attestations" component={()=><Mes list= {this.state.list}/>} 
              options={{
                tabBarLabel: 'Mes Attestations',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="file-document" color={color} size={size} />
                ),
              }}

            />
            <Tab.Screen name="Nouvelle Attestation" component={()=><Nouvelle  update_parentlist = {this.updatelist}  parentlist={this.state.list}/>} 
              options={{
                tabBarLabel: 'Nouvelle Attestation',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen name="Infos" component={()=><Infos/>}
              screenProps={{name: "teste"}}
              options={{
                tabBarLabel:" Infos",
                tabBarIcon: ({color, size}) =>(
                  <MaterialCommunityIcons name="information" color={color} size={size}/>
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}