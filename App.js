import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Linking , AsyncStorage} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput, Button } from 'react-native-paper';
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



//----------------------Nouvelle Atestation------------------------------
function Nouvelle (){



  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
    let data = [{
      value: "Déplacements professionel",
    }, {
      value: 'Achats (1ère  nécessité/ Professionel)',
    }, {
      value: 'Consultations',
    },{
      value: 'Motif familial',
    }, {
      value: 'Assistance aux personnes vulnérables',
    }, {
      value: 'Garde d’enfants.',
    }, {
      value: 'Déplacement bref/Activité physique (1km)',
    }, {
      value: 'Convocation judiciaire ou administrative',
    }, {
      value: 'Missions d’intérêt général sur demande de l’autorité administrative',
    } ];

    var dte = new Date()
    var day = dte.getDate();
    var month = (dte.getMonth() + 1)
    var year = dte.getFullYear()


    return(
      <SafeAreaView style={{backgroundColor: "#C8EBFC"}}> 
        <ScrollView style={{padding: 40}}>
          <Text style={{color: "#1D749D", fontSize: 30, fontWeight: "bold"}}>Nouvelle Attestation</Text>
          <Text style={{fontSize: 12}}>Remplissez vos informations et sélectionnez un motif.</Text>
          <View style={{marginVertical: 100}}>
            <TextInput
              label="Prénom:"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 10}}
            />
            <TextInput
              label="Nom:"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Date de naissance (jj/mm/aaaa):"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Lieu de Naissance:"
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />
            <TextInput
              label="Addresse:"
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
              mode="outlined"
              theme={{ colors: { primary: '#1D749D',underlineColor:'transparent'}}}
              style={{marginTop: 20}}
            />

            <Text style={{fontSize:25, marginTop: 50}}>Motif de Sortie:</Text>
            <Dropdown
              label='Motif de Sortie'
              data={data}
            />
            <Text style={{fontSize:25, marginTop: 50}}>Date et Heure:</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 20}}>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <Button style={{width: 150, marginHorizontal: 6, paddingVertical: 10}} color="#5AB7E3" mode="contained" onPress={showDatepicker}>
                {`${date.getDate() >= 10 ? "": "0"}${date.getDate()}/${date.getMonth() >= 10 ? "": "0"}${date.getMonth() + 1}/${date.getFullYear()}`}
              </Button>
            
              <Button style={{width: 150, marginHorizontal: 6, paddingVertical: 10}} color="#5AB7E3" mode="contained" onPress={showTimepicker}>
                {`${date.getHours() >= 10 ? "": "0"}${date.getHours()}h${date.getMinutes() >= 10 ? "": "0"}${date.getMinutes()}`}
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


function Infos() {
  return (
    <SafeAreaView style={{ flex: 1}}>
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Mes Attestations</Text>
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