import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import styles from './styles'

import Logo from '../../assets/logo.png'

export default function Incidents() {

  const navigation = useNavigation()

  function navigateToDetail() {
    navigation.navigate('Detail')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 casos</Text>.
        </Text>
      </View>

      <View>
        <Text style={styles.title}>Bem Vindo, ONG</Text>
        <Text style={styles.subtitle}>Escolha um caso abaixo e salve o dia!</Text>
      </View>
      <FlatList
        style={styles.incidentList}
        data={[1, 2, 3]}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.incident}>
            <Text style={styles.incidentTitle}>Caso:</Text>
            <Text style={styles.incidentDescription}>gegegeggegegeggege</Text>
            <Text style={styles.incidentTitle}>ONG:</Text>
            <Text style={styles.incidentDescription}>gegegeggegegeggege</Text>
            <Text style={styles.incidentTitle}>Valor:</Text>
            <Text style={styles.incidentDescription}>R$ 123</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
