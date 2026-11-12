import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipagem das rotas com base nos arquivos da sua pasta screens
type RootStackParamList = {
    TelaInicial: undefined;
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Ecopontos: undefined;
    Mapa: undefined;
    Perfil: undefined;
    Detalhes: undefined;
};

type TelaInicialProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaInicial'>;
};

export default function TelaInicial({ navigation }: TelaInicialProps) {
    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleCadastro = () => {
        navigation.navigate('Cadastro');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" background-color="#61A65E" />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {/* Cabeçalho Verde */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Svg width={38} height={38} viewBox="0 0 64 64" fill="none">
                            <Path
                                d="M32 6C20.954 6 12 14.954 12 26C12 39.5 32 58 32 58C32 58 52 39.5 52 26C52 14.954 43.046 6 32 6Z"
                                fill="#76C043"
                                stroke="#1E5622"
                                strokeWidth={2.5}
                            />
                            <Circle
                                cx={32}
                                cy={25}
                                r={11}
                                fill="#61A65E"
                                stroke="#1E5622"
                                strokeWidth={2}
                            />
                            <Path
                                d="M32 18C28 21 27 26 32 31C37 26 36 21 32 18Z"
                                fill="#D2FF9E"
                            />
                            <Path
                                d="M22 25C22 19.5 26.5 15 32 15"
                                stroke="#D2FF9E"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                            />
                            <Path
                                d="M42 25C42 30.5 37.5 35 32 35"
                                stroke="#1E5622"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                            />
                        </Svg>
                        <Text style={styles.logoText}>RECICLASPOT</Text>
                    </View>
                </View>

                {/* Seção Hero com Imagem de Fundo */}
                <ImageBackground
                    source={{
                        uri: 'https://unsplash.com',
                    }}
                    style={styles.hero}
                    resizeMode="cover"
                >
                    <View style={styles.heroOverlay}>
                        <Text style={styles.heroTitle}>RECICLASPOT</Text>
                        <Text style={styles.heroSubtitle}>
                            Simplifique seu descarte.{'\n'}
                            Transforme a sua cidade.
                        </Text>
                    </View>
                </ImageBackground>

                {/* Conteúdo Principal (Cards e Botões) */}
                <View style={styles.content}>
                    <View style={styles.cardsWrapper}>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoCardText}>
                                1. Conheça o ReciclaSpot, o guia definitivo para a reciclagem inteligente.
                            </Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.infoCardText}>
                                2. Encontre pontos de coleta por geolocalização, faça a triagem de materiais por foto e salve seus ecopontos favoritos para acessar mesmo offline.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.actionsWrapper}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCadastro}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Cadastrar-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#61A65E',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F2F4F2',
    },
    header: {
        backgroundColor: '#61A65E',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 16 : 10,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontWeight: '800',
        fontSize: 11,
        color: '#1B4D20',
        letterSpacing: 0.5,
        marginTop: 2,
    },
    hero: {
        height: 290,
        width: '100%',
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(26, 60, 33, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 2.5,
        marginBottom: 14,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    heroSubtitle: {
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        fontSize: 18,
        lineHeight: 26,
        color: '#F4F9F4',
        textAlign: 'center',
        maxWidth: 300,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 36,
        justifyContent: 'space-between',
    },
    cardsWrapper: {
        gap: 16,
    },
    infoCard: {
        backgroundColor: '#D2FF9E',
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    infoCardText: {
        color: '#162413',
        fontSize: 13.5,
        lineHeight: 20,
        fontWeight: '500',
    },
    actionsWrapper: {
        alignItems: 'center',
        gap: 14,
        marginTop: 32,
    },
    button: {
        width: 195,
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#D2FF9E',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: '#162413',
        fontSize: 15,
        fontWeight: '600',
    },
});
