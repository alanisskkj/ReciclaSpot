import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhesEcoponto'>;

export default function Detalhes({ route, navigation }: Props) {
  const { ponto } = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <StatusBar barStyle="dark-content" background-color="#ecf3ea" />

      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <View style={styles.modalBody}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
              <View style={styles.iconBadge}>
                <Ionicons name="leaf" size={26} color="#1E7334" />
              </View>
              <View style={styles.headerTextBox}>
                <Text style={styles.categoryTag}>{ponto.categoria}</Text>
                <Text style={styles.title}>{ponto.nome}</Text>
              </View>
            </View>

            <Text style={styles.desc}>
              📍 <Text style={styles.bold}>Endereço:</Text> {ponto.endereco} — {ponto.bairro}
            </Text>

            <Text style={styles.desc}>
              🕒 <Text style={styles.bold}>Horário:</Text> {ponto.horarioFuncionamento}
            </Text>

            <Text style={styles.desc}>
              📞 <Text style={styles.bold}>Telefone:</Text> {ponto.telefoneContato}
            </Text>

            <Text style={styles.desc}>
              🧱 <Text style={styles.bold}>Aceita entulho:</Text>{' '}
              {ponto.aceitaEntulho ? 'Sim' : 'Não'}
            </Text>

            {ponto.materiaisResumo && (
              <Text style={styles.desc}>
                ♻️ <Text style={styles.bold}>O que recebe:</Text> {ponto.materiaisResumo}
              </Text>
            )}

            {ponto.destaqueSocial && (
              <View style={styles.socialBox}>
                <Text style={styles.socialTitle}>🌱 Impacto Social</Text>
                <Text style={styles.socialText}>{ponto.destaqueSocial}</Text>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>Fechar Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ecf3ea',
  },
  blob1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#a3f984',
    opacity: 0.25,
    top: -80,
    right: -80,
  },
  blob2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#76d255',
    opacity: 0.2,
    bottom: 80,
    left: -60,
  },
  modalBody: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    padding: 22,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    borderTopColor: '#5DA654',
    borderTopWidth: 8,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F8DC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextBox: {
    flex: 1,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5DA654',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#173615',
  },
  desc: {
    fontSize: 14,
    color: '#2B3A29',
    marginBottom: 12,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: '#111111',
  },
  socialBox: {
    backgroundColor: '#E8F8DC',
    padding: 14,
    borderRadius: 14,
    marginTop: 6,
    marginBottom: 8,
  },
  socialTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E7334',
    marginBottom: 4,
  },
  socialText: {
    fontSize: 13,
    color: '#173615',
    lineHeight: 18,
  },
  closeButton: {
    backgroundColor: '#5DA654',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 14,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
