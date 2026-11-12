import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAVORITOS_INICIAIS = [
  {
    id: '1',
    nome: 'EcoPonto Esquina Verde',
    categoria: 'Recicláveis Gerais',
    endereco: 'Av. Prefeito Valdemar de Oliveira Lima, 1000',
    bairro: 'Centro / Jardim Botânico',
    horarioFuncionamento: 'Seg a Sex: 08:00 - 18:00 | Sáb: 08:00 - 14:00',
    latitude: -21.7975,
    longitude: -50.8789,
    imagemUri: 'https://unsplash.com',
    telefoneContato: '(18) 3528-1001',
    aceitaEntulho: false,
    materiaisResumo: 'Papel, plástico, vidro e metal.',
    destaqueSocial: 'Troca recicláveis por hortaliças de uma horta comunitária no teto.',
  },
  {
    id: '4',
    nome: 'Ecoponto Central Tech',
    categoria: 'Eletrônicos',
    endereco: 'Av. das Nações, 1001',
    bairro: 'Centro',
    horarioFuncionamento: 'Seg a Sex: 08:30 - 17:30',
    latitude: -21.7988,
    longitude: -50.8805,
    imagemUri: 'https://unsplash.com',
    telefoneContato: '(18) 3528-4412',
    aceitaEntulho: false,
    materiaisResumo: 'Computadores, celulares, cabos e eletrodomésticos.',
    destaqueSocial: 'Recondiciona computadores para inclusão digital de jovens.',
  },
];

export default function Favoritos({ navigation }: any) {
  const [favoritos, setFavoritos] = useState(FAVORITOS_INICIAIS);

  const removerFavorito = (id: string) => {
    setFavoritos((atual) => atual.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" background-color="#5DA654" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="heart" size={24} color="#C4F99B" />
          <Text style={styles.headerTitle}>Ecopontos Favoritos</Text>
        </View>
        <Text style={styles.counterBadge}>{favoritos.length} salvos</Text>
      </View>

      <View style={styles.body}>
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('DetalhesEcoponto', { ponto: item })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <TouchableOpacity
                  onPress={() => removerFavorito(item.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="heart" size={22} color="#D64545" />
                </TouchableOpacity>
              </View>

              <View style={styles.badgeRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.categoria}</Text>
                </View>
                <Text style={styles.bairroText}>📍 {item.bairro}</Text>
              </View>

              <Text style={styles.materiaisText}>
                <Text style={styles.bold}>Recebe: </Text>
                {item.materiaisResumo}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="heart-dislike-outline" size={48} color="#8FA38D" />
              <Text style={styles.emptyTitle}>Nenhum ecoponto favoritado</Text>
              <Text style={styles.emptySub}>
                Explore os pontos na tela inicial para salvar seus locais preferidos.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#5DA654' },
  header: {
    backgroundColor: '#5DA654',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  counterBadge: {
    backgroundColor: '#1E7334',
    color: '#C4F99B',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  body: { flex: 1, backgroundColor: '#F6F7F6' },
  listContent: { padding: 18, paddingBottom: 30 },
  card: {
    backgroundColor: '#C4F99B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#111111', flex: 1 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, marginBottom: 8 },
  categoryBadge: { backgroundColor: '#5DA654', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  categoryText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  bairroText: { fontSize: 11, color: '#2A4728', fontWeight: '600' },
  materiaisText: { fontSize: 12, color: '#1A1A1A', lineHeight: 17 },
  bold: { fontWeight: '700', color: '#111111' },
  emptyBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: '#173615', marginTop: 12 },
  emptySub: { fontSize: 13, color: '#5A6E58', textAlign: 'center', marginTop: 6, lineHeight: 18 },
});
