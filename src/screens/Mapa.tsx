import React, { useEffect, useState } from 'react';
import {
    Alert,
    Linking,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Location from 'expo-location';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabParamList, PontoColeta, RootStackParamList } from '../types/navigations';

type Props = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Mapa'>,
    NativeStackScreenProps<RootStackParamList>
>;

interface PinoMapa extends PontoColeta {
    corPino: string;
    materiais: string;
    topPercent: `${number}%`;
    leftPercent: `${number}%`;
}

const PINOS_ECOPONTOS: PinoMapa[] = [
    {
        id: '1',
        nome: 'EcoPonto Esquina Verde',
        categoria: 'Recicláveis Gerais',
        endereco: 'Av. Prefeito Valdemar de Oliveira Lima, 1000',
        bairro: 'Centro / Jardim Botânico',
        horarioFuncionamento: '08h às 18h',
        latitude: -21.7975,
        longitude: -50.8789,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-1001',
        aceitaEntulho: false,
        corPino: '#2E9E36',
        materiais: 'Papelão ondulado, papel de imprensa, jornais',
        topPercent: '56%',
        leftPercent: '62%',
    },
    {
        id: '2',
        nome: 'Ecoponto Central Tech',
        categoria: 'Eletrônicos',
        endereco: 'Av. das Nações, 1001',
        bairro: 'Centro',
        horarioFuncionamento: '08h30 às 17h30',
        latitude: -21.7988,
        longitude: -50.8805,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-4412',
        aceitaEntulho: false,
        corPino: '#E53935',
        materiais: 'Metais, computadores, cabos e eletrodomésticos',
        topPercent: '51%',
        leftPercent: '59%',
    },
    {
        id: '3',
        nome: 'Ponto Integrar Sabor',
        categoria: 'Óleo Usado',
        endereco: 'Av. Brasil, 820',
        bairro: 'Centro',
        horarioFuncionamento: '08h às 18h',
        latitude: -21.7961,
        longitude: -50.8754,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-3310',
        aceitaEntulho: false,
        corPino: '#F4D03F',
        materiais: 'Embalagens plásticas e óleo de cozinha',
        topPercent: '63%',
        leftPercent: '66%',
    },
    {
        id: '4',
        nome: 'Ponto Vila Nova Vidros',
        categoria: 'Recicláveis Gerais',
        endereco: 'Rua São Paulo, 45',
        bairro: 'Vila Nova',
        horarioFuncionamento: '08h às 19h',
        latitude: -21.8012,
        longitude: -50.8732,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-5590',
        aceitaEntulho: false,
        corPino: '#1E88E5',
        materiais: 'Potes, garrafas de vidro e frascos',
        topPercent: '74%',
        leftPercent: '64%',
    },
    {
        id: '5',
        nome: 'Estação Norte Metais',
        categoria: 'Pilhas/Baterias',
        endereco: 'Rua Armando Salles, 450',
        bairro: 'Vila São José',
        horarioFuncionamento: '09h às 17h',
        latitude: -21.7942,
        longitude: -50.8821,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-2040',
        aceitaEntulho: true,
        corPino: '#E53935',
        materiais: 'Latas de alumínio, pilhas e baterias',
        topPercent: '32%',
        leftPercent: '24%',
    },
];

export default function Mapa({ navigation }: Props) {
    const [pontoSelecionado, setPontoSelecionado] = useState<PinoMapa | null>(
        PINOS_ECOPONTOS[0]
    );
    const [coordsUsuario, setCoordsUsuario] = useState<string>('Obtendo GPS...');

    useEffect(() => {
        const capturarGps = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setCoordsUsuario('Osvaldo Cruz - SP');
                    return;
                }
                const pos = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                setCoordsUsuario(
                    `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
                );
            } catch {
                setCoordsUsuario('Osvaldo Cruz - SP');
            }
        };
        capturarGps();
    }, []);

    const handleTracarRota = async () => {
        const alvo = pontoSelecionado || PINOS_ECOPONTOS[0];
        const label = encodeURIComponent(alvo.nome);
        const url = Platform.select({
            ios: `maps:0,0?q=${label}@${alvo.latitude},${alvo.longitude}`,
            android: `geo:0,0?q=${alvo.latitude},${alvo.longitude}(${label})`,
            default: `https://google.com{alvo.latitude},${alvo.longitude}`,
        });

        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert('Erro', 'Não foi possível abrir o mapa externo.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" background-color="#5DA654" />

            <View style={styles.header}>
                <View style={styles.logoBox}>
                    <Ionicons name="location-sharp" size={28} color="#8CE652" />
                    <Text style={styles.logoText}>RECICLASPOT</Text>
                </View>

                <View style={styles.gpsBadge}>
                    <Ionicons name="navigate" size={13} color="#173615" />
                    <Text style={styles.gpsBadgeText}>{coordsUsuario}</Text>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.pageTitle}>MAPA DE DESCARTE</Text>

                {/* Quadro Visual do Mapa com Ruas, Rio e Pinos Interativos */}
                <View style={styles.mapCard}>
                    {/* Fundo estilizado de mapa urbano */}
                    <View style={styles.riverCurve} />
                    <View style={[styles.roadHorizontal, { top: '38%' }]} />
                    <View style={[styles.roadHorizontal, { top: '68%', transform: [{ rotate: '8deg' }] }]} />
                    <View style={[styles.roadVertical, { left: '36%' }]} />
                    <View style={[styles.roadVertical, { left: '68%', transform: [{ rotate: '-10deg' }] }]} />

                    {/* Marcador Azul da Localização Atual do Usuário */}
                    <View style={[styles.userDotWrap, { top: '48%', left: '46%' }]}>
                        <View style={styles.userDotPulse} />
                        <View style={styles.userDotCore} />
                    </View>

                    {/* Pinos dos Ecopontos Clicáveis */}
                    {PINOS_ECOPONTOS.map((pino) => {
                        const ativo = pontoSelecionado?.id === pino.id;
                        return (
                            <TouchableOpacity
                                key={pino.id}
                                style={[
                                    styles.pinButton,
                                    { top: pino.topPercent, left: pino.leftPercent },
                                    ativo && styles.pinButtonActive,
                                ]}
                                onPress={() => setPontoSelecionado(pino)}
                                activeOpacity={0.8}
                            >
                                <Ionicons
                                    name="location-sharp"
                                    size={ativo ? 34 : 28}
                                    color={pino.corPino}
                                />
                            </TouchableOpacity>
                        );
                    })}

                    {/* Card de Detalhamento do Ponto Selecionado (igual ao protótipo) */}
                    {pontoSelecionado && (
                        <View style={styles.detailOverlay}>
                            <View style={styles.detailOverlayHeader}>
                                <Text style={styles.detailOverlayTitle}>
                                    DETALHAMENTO DO{'\n'}PONTO DE COLETA
                                </Text>
                                <TouchableOpacity onPress={() => setPontoSelecionado(null)}>
                                    <Ionicons name="close" size={18} color="#333333" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.detailOverlayBody}>
                                <Ionicons
                                    name="location-sharp"
                                    size={30}
                                    color={pontoSelecionado.corPino}
                                    style={{ marginRight: 6 }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.overlayLine} numberOfLines={1}>
                                        <Text style={styles.bold}>Local:</Text> {pontoSelecionado.nome}
                                    </Text>
                                    <Text style={styles.overlayLine} numberOfLines={2}>
                                        <Text style={styles.bold}>Materiais Aceitos:</Text>{' '}
                                        {pontoSelecionado.materiais}
                                    </Text>
                                    <Text style={styles.overlayLine}>
                                        <Text style={styles.bold}>Status:</Text> Aberto e Operacional
                                    </Text>
                                    <Text style={styles.overlayLine}>
                                        <Text style={styles.bold}>Horário:</Text>{' '}
                                        {pontoSelecionado.horarioFuncionamento}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.overlayDetailsBtn}
                                onPress={() =>
                                    navigation.navigate('DetalhesEcoponto', { ponto: pontoSelecionado })
                                }
                            >
                                <Text style={styles.overlayDetailsBtnText}>Ver Detalhes Completos →</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Legenda Inferior Direita (igual ao protótipo) */}
                    <View style={styles.legendBox}>
                        <Text style={styles.legendTitle}>Legenda:</Text>
                        <View style={styles.legendRow}>
                            <View style={[styles.legendDot, { backgroundColor: '#E53935' }]} />
                            <Text style={styles.legendText}>Metal</Text>
                        </View>
                        <View style={styles.legendRow}>
                            <View style={[styles.legendDot, { backgroundColor: '#2E9E36' }]} />
                            <Text style={styles.legendText}>Papel</Text>
                        </View>
                        <View style={styles.legendRow}>
                            <View style={[styles.legendDot, { backgroundColor: '#1E88E5' }]} />
                            <Text style={styles.legendText}>Vidro</Text>
                        </View>
                        <View style={styles.legendRow}>
                            <View style={[styles.legendDot, { backgroundColor: '#F4D03F' }]} />
                            <Text style={styles.legendText}>Plástico</Text>
                        </View>
                    </View>
                </View>

                {/* Barra Inferior: Traçar Rota / Voltar */}
                <View style={styles.bottomActionsRow}>
                    <MaterialCommunityIcons name="car-side" size={26} color="#111111" />
                    <TouchableOpacity style={styles.actionButton} onPress={handleTracarRota}>
                        <Text style={styles.actionButtonText}>Traçar Rota</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.backButton]}
                        onPress={() => navigation.navigate('Explorar')}
                    >
                        <Text style={styles.actionButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
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
        paddingTop: Platform.OS === 'android' ? 14 : 8,
        paddingBottom: 14,
    },
    logoBox: { alignItems: 'center' },
    logoText: { fontSize: 10, fontWeight: '800', color: '#1A3A18', marginTop: 2 },
    gpsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C4F99B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        gap: 5,
    },
    gpsBadgeText: { fontSize: 11, fontWeight: '700', color: '#173615' },
    body: {
        flex: 1,
        backgroundColor: '#F7F8F7',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 18,
        justifyContent: 'space-between',
    },
    pageTitle: { fontSize: 22, fontWeight: '800', color: '#1E6F2B', textAlign: 'center' },
    mapCard: {
        flex: 1,
        minHeight: 380,
        marginVertical: 16,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#E8ECEF',
        borderWidth: 1,
        borderColor: '#D0DDD0',
        elevation: 3,
    },
    riverCurve: {
        position: 'absolute',
        top: -40,
        left: '18%',
        width: 26,
        height: '120%',
        backgroundColor: '#9CC7F5',
        transform: [{ rotate: '-18deg' }],
    },
    roadHorizontal: {
        position: 'absolute',
        left: -20,
        right: -20,
        height: 10,
        backgroundColor: '#F9E08B',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E2C36B',
    },
    roadVertical: {
        position: 'absolute',
        top: -20,
        bottom: -20,
        width: 12,
        backgroundColor: '#FFFFFF',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#D4D9DE',
    },
    userDotWrap: {
        position: 'absolute',
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userDotPulse: {
        position: 'absolute',
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'rgba(30, 136, 229, 0.25)',
    },
    userDotCore: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#1E88E5',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    pinButton: {
        position: 'absolute',
        marginLeft: -14,
        marginTop: -28,
    },
    pinButtonActive: {
        transform: [{ scale: 1.15 }],
    },
    detailOverlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: '68%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 14,
        padding: 10,
        elevation: 4,
    },
    detailOverlayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    detailOverlayTitle: { fontSize: 11, fontWeight: '800', color: '#111111' },
    detailOverlayBody: { flexDirection: 'row', alignItems: 'center' },
    overlayLine: { fontSize: 9.5, color: '#222222', marginBottom: 2 },
    bold: { fontWeight: '700' },
    overlayDetailsBtn: {
        marginTop: 6,
        backgroundColor: '#C4F99B',
        borderRadius: 8,
        paddingVertical: 5,
        alignItems: 'center',
    },
    overlayDetailsBtnText: { fontSize: 10, fontWeight: '800', color: '#173615' },
    legendBox: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(196, 249, 155, 0.94)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    legendTitle: { fontSize: 11, fontWeight: '800', color: '#111111', marginBottom: 3 },
    legendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    legendDot: { width: 9, height: 9, borderRadius: 5, marginRight: 6 },
    legendText: { fontSize: 10.5, fontWeight: '600', color: '#111111' },
    bottomActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    actionButton: {
        backgroundColor: '#C4F99B',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    backButton: { flex: 1 },
    actionButtonText: { fontSize: 13, fontWeight: '700', color: '#111111' },
})