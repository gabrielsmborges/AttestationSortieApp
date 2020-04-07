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

class attest_profile{
  constructor(nom, prenom, dt_naissance, lieu_naissance, addresse, ville, cd_postal, motif, date){
    this.nom = nom
    this.prenom = prenom
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


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

class Profile extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: this.props.name
    }
  }
  render(){
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return(
      <View>
        <Card>
        <View style={{flexDirection: "row"}}>
          <View style={{flex: 5}}> 
            <Card.Title title={this.state.name} subtitle="Card Subtitle" />
          <Card.Content>
            <Text>12/29/2020 à 16h00</Text>
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

//----------------------Nouvelle Atestation------------------------------
class Nouvelle extends React.Component{
  constructor(props){
    super(props)
    this.state={
      nom:"",
      prenom: "",
      dt_naissance:"",
      lieu_naissance:"",
      addresse: "", 
      showdate : false,
      date: new Date(),
      text: '',
      data: [{
        value: "Déplacements professionels",
      }, {
        value: 'Achats (1ère  nécessité/ Professionel)',
      }, {
        value: 'Consultations',
      },{
        value: 'Motif familial',
      }, {
        value: 'Assistance auxS personnes vulnérables',
      }, {
        value: 'Garde d’enfants.',
      }, {
        value: 'Déplacement bref/Activité physique (1km)',
      }, {
        value: 'Convocation judiciaire ou administrative',
      }, {
        value: 'Missions d’intérêt général sur demande de l’autorité administrative',
      }]
    }
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
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Code Postal:"
              keyboardType="numeric"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />

            <Text style={{fontSize:25, marginTop: 50}}>Motif de Sortie:</Text>
            <Dropdown
              label='Motif de Sortie'
              data={this.state.data}
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
              <Button style={{width: 150, paddingVertical: 10}} color="#1D749D" mode="contained" onPress={()=>console.log("Hello Button")}>
                Générer
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )

  }
}


function Infos() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#DDF4FF"}}>
      <ScrollView style={{padding: 40}}>
        <Text style={{color: "#1D749D", fontSize: 30, fontWeight: "bold"}}>Infos</Text>
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 15, marginVertical: 20}}>Cette application n’est pas gérée par le gouvernement</Text>
          <Text style={{fontSize: 15, marginVertical: 20, color: "#1D749D"}} onPress={() => Linking.openURL('https://media.interieur.gouv.fr/deplacement-covid-19/')}>Site officiel pour créer ses attestations</Text>
          <View style={{flexDirection: "row", marginVertical: 20}}>
            <Text>Application dévelopée par </Text>
            <Text style={{color: "#1D749D"}} onPress={() => Linking.openURL('http://gabrielborges.dev')}>Gabriel Borges</Text>
          </View>
        </View>
      </ScrollView>
      <Text style={{fontSize: 20, color: "white", position: "absolute", bottom: 0, margin: 50,padding: 10, backgroundColor: "#1D749D", borderRadius: 14}} onPress={() => Linking.openURL('mailto:gabrielsmborges@gmail.com')}>Contact</Text>
    </SafeAreaView>
  );
}

class Mes extends React.Component{
    render(){
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#DDF4FF"}}>
          <View style={{margin: 40}}>
            <Profile name="Gabriel" />
          </View>
        </SafeAreaView>   
      );
    }
  }


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName="Nouvelle Attestation"
          tabBarOptions={{
          activeTintColor: '#1D749D'
        }}>
          <Tab.Screen name="Mes Attestations" component={Mes} 
            options={{
              tabBarLabel: 'Mes Attestations',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="file-document" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Nouvelle Attestation" component={Nouvelle} 
            options={{
              tabBarLabel: 'Nouvelle Attestation',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Infos" component={Infos} 
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