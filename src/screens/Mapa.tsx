import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MapaWeb() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIconWrapper}>
                        <MaterialCommunityIcons name="recycle" size={32} color="#1A5D2A" />
                    </View>
                    <Text style={styles.logoText}>RECICLASPOT</Text>
                </View>
            </View>

            {/* Conteúdo Principal */}
            <View style={styles.content}>
                <Text style={styles.title}>Ponto de Coleta - Escola SESI</Text>

                <View style={styles.mapContainer}>
                    {Platform.OS === 'web' ? (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.485372453957!2d-50.884441800000005!3d-21.800169749999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x949426743a132d2d%3A0x7a6e36d60ae9fed6!2sEscola%20Sesi%20de%20Osvaldo%20Cruz%20-%20CE%20283!5e0!3m2!1spt-BR!2sbr!4v1794508135429!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    ) : (
                        <Text style={styles.subtitle}>
                            Este mapa incorporado está disponível apenas na versão Web.
                        </Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA'
    },
    header: {
        backgroundColor: '#65A65B',
        height: 95,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
    },
    logoContainer: {
        alignItems: 'center'
    },
    logoIconWrapper: {
        backgroundColor: '#8BC34A',
        borderRadius: 20,
        padding: 4,
        borderWidth: 2,
        borderColor: '#2E7D32',
    },
    logoText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#113819',
        marginTop: 3,
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E7334',
        textAlign: 'center',
        marginBottom: 12,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 800,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#5DA654',
        backgroundColor: '#E8ECEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 14,
        color: '#4F634D',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#5DA654',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14
    },
});

