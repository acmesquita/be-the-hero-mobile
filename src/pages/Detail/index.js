import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'react-native'

import styles from './styles';
import Logo from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { incident } = route.params

  function formatValue(incident) {
    return Intl.NumberFormat('pt-BR',
      { style: 'currency', currency: 'BRL' })
      .format(incident.value)
  }

  const msg = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${formatValue(incident)}.`


  function navigateToIncidents() {
    navigation.navigate('Incidents')
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: msg
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${msg}`)
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
        <Text style={styles.incidentDescription}>{incident.title}</Text>
        <Text style={styles.incidentTitle}>ONG:</Text>
        <Text style={styles.incidentDescription}>{incident.name} de {incident.city}/{incident.uf}</Text>
        <Text style={styles.incidentTitle}>Valor:</Text>
        <Text style={styles.incidentDescription}>{formatValue(incident)}</Text>
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
