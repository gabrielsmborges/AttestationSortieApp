import * as React from 'react';
import { Text, View, ScrollView} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Dropdown } from 'react-native-material-dropdown';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { TextInput } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';




//importing fonts


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



function Infos() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cette Application n'est pas gérée par le gouvernement</Text>
      
    </SafeAreaView>
  );
}

function Mes() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mes Attestations</Text>
    </SafeAreaView>
  );
}

class Nouvelle extends React.Component{
  render(){
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
    return(
      <SafeAreaView>
        <ScrollView style={{padding: 40}}>
          <Text style={{color: "#1D749D", fontSize: 30, fontWeight: "bold"}}>Nouvelle Attestation</Text>
          <Text style={{fontSize: 12}}>Remplissez vos informations et sélectionnez un motif.</Text>
          <View style={{marginVertical: 50}}>
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
            
              
          </View>
        </ScrollView>
      </SafeAreaView>
    )
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