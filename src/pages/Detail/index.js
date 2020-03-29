import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'react-native'

import styles from './styles';
import Logo from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation()
  const msg = `Olá ONG, estou entrando em contato pois gostaria de ajudar no caso "Caso 1" com o valor de R$ 120,00`

  function navigateToIncidents() {
    navigation.navigate('Incidents')
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Caso 1',
      recipients: ['catha.ana.1994@gmail.com'],
      body: msg
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5586995608086&text=${msg}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
        <TouchableOpacity style={styles.backButton} onPress={navigateToIncidents}>
          <Feather name="arrow-left" size={28} color='#e02041' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentTitle}>Caso:</Text>
        <Text style={styles.incidentDescription}>gegegeggegegeggege</Text>
        <Text style={styles.incidentTitle}>ONG:</Text>
        <Text style={styles.incidentDescription}>gegegeggegegeggege</Text>
        <Text style={styles.incidentTitle}>Valor:</Text>
        <Text style={styles.incidentDescription}>R$ 123</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>

          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actiontext}>Whatspp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actiontext}>Email</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
