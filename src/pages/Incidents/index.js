import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';

import Logo from '../../assets/logo.png';

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [totalIncidents, setTotalIncidents] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  async function loadIncidents() {
    if (loading) { return }
    if (totalIncidents > 0 & incidents.length === totalIncidents) { return }

    setLoading(true)
    const response = await api.get(`incidents`, {
      params: { page }
    })

    setIncidents([...incidents, ...response.data])
    setTotalIncidents(response.headers['x-total-count'])

    setPage(page + 1)
    setLoading(false)
  }
  useEffect(() => {
    loadIncidents()
  }, [])

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>.
        </Text>
      </View>

      <View>
        <Text style={styles.title}>Bem Vindo, ONG</Text>
        <Text style={styles.subtitle}>Escolha um caso abaixo e salve o dia!</Text>
      </View>
      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentTitle}>Caso:</Text>
            <Text style={styles.incidentDescription}>{incident.title}</Text>
            <Text style={styles.incidentTitle}>ONG:</Text>
            <Text style={styles.incidentDescription}>{incident.name}</Text>
            <Text style={styles.incidentTitle}>Valor:</Text>
            <Text style={styles.incidentDescription}>
              {Intl.NumberFormat('pt-BR',
                { style: 'currency', currency: 'BRL' })
                .format(incident.value)}
            </Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => { navigateToDetail(incident) }}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
