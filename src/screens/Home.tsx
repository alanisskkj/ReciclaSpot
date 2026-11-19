import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    FlatList,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';
import NetInfo from '@react-native-community/netinfo';
import { BottomTabParamList, PontoColeta, RootStackParamList } from '../types/navigations';
import { useFavorites } from '../contexts/FavoritesContext';

type Props = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Explorar'>,
    NativeStackScreenProps<RootStackParamList>
>;

export interface PontoColetaItem extends PontoColeta {
    materiaisResumo: string;
    destaqueSocial: string;
}

type FiltroVisual = 'PLÁSTICO' | 'PAPEL' | 'VIDRO' | 'METAL' | null;

const PONTOS_INICIAIS: PontoColetaItem[] = [
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
        id: '2',
        nome: 'Estação Re-Criação',
        categoria: 'Recicláveis Gerais',
        endereco: 'Rua Armando Salles, 450',
        bairro: 'Vila São José',
        horarioFuncionamento: 'Seg a Sáb: 09:00 - 17:00',
        latitude: -21.7942,
        longitude: -50.8821,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-2040',
        aceitaEntulho: true,
        materiaisResumo: 'Sobras de construção, madeiras e paletes.',
        destaqueSocial: 'Oferece oficinas gratuitas de marcenaria e upcycling.',
    },
    {
        id: '3',
        nome: 'Ponto Integrar Sabor',
        categoria: 'Óleo Usado',
        endereco: 'Av. Brasil, 820',
        bairro: 'Centro',
        horarioFuncionamento: 'Seg a Sex: 08:00 - 18:00',
        latitude: -21.7961,
        longitude: -50.8754,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-3310',
        aceitaEntulho: false,
        materiaisResumo: 'Óleo de cozinha e resíduos orgânicos.',
        destaqueSocial: 'Transforma o óleo em sabão para escolas públicas.',
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
    {
        id: '5',
        nome: 'Ponto Vila Nova Energia',
        categoria: 'Pilhas/Baterias',
        endereco: 'Rua São Paulo, 45',
        bairro: 'Vila Nova',
        horarioFuncionamento: 'Seg a Sáb: 08:00 - 19:00',
        latitude: -21.8012,
        longitude: -50.8732,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-5590',
        aceitaEntulho: false,
        materiaisResumo: 'Pilhas alcalinas, baterias de lítio e carregadores.',
        destaqueSocial: 'Garante destinação química segura evitando contaminação do solo.',
    },
    {
        id: '6',
        nome: 'Farmácia Verde Descarte',
        categoria: 'Medicamentos',
        endereco: 'Rua Feb, 310',
        bairro: 'Jardim das Bandeiras',
        horarioFuncionamento: 'Seg a Dom: 07:00 - 22:00',
        latitude: -21.7929,
        longitude: -50.8771,
        imagemUri: 'https://unsplash.com',
        telefoneContato: '(18) 3528-6600',
        aceitaEntulho: false,
        materiaisResumo: 'Medicamentos vencidos, cartelas e frascos.',
        destaqueSocial: 'Incineração certificada para proteção da rede de água.',
    },
];

const COLUNAS_MATERIAIS: {
    id: Exclude<FiltroVisual, null>;
    titulo: string;
    subtitulo: string;
    corFundo: string;
}[] = [
        {
            id: 'PLÁSTICO',
            titulo: 'PLÁSTICO',
            subtitulo: 'Garrafas,\nEmbalagens,\nCopos',
            corFundo: '#B7D4E8',
        },
        {
            id: 'PAPEL',
            titulo: 'PAPEL',
            subtitulo: 'Caixas, Jornais,\nPapelão',
            corFundo: '#AED5B8',
        },
        {
            id: 'VIDRO',
            titulo: 'VIDRO',
            subtitulo: 'Potes, Garrafas\nde Bebida',
            corFundo: '#DFD9CE',
        },
        {
            id: 'METAL',
            titulo: 'METAL',
            subtitulo: 'Latas de Alumínio,\nConservas',
            corFundo: '#F8D49B',
        },
    ];

export default function Home({ navigation }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [busca, setBusca] = useState('');
    const [filtroMaterial, setFiltroMaterial] = useState<FiltroVisual>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [pontos, setPontos] = useState<PontoColetaItem[]>(PONTOS_INICIAIS);
    const { favorites, isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(Boolean(state.isConnected && state.isInternetReachable !== false));
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (Platform.OS === 'web') return;

        Accelerometer.setUpdateInterval(150);
        let ultimoShake = 0;

        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);
            const agora = Date.now();

            if (totalForce > 3.5 && agora - ultimoShake > 3000) {
                ultimoShake = agora;
                setPontos([...PONTOS_INICIAIS]);
                Alert.alert(
                    'Sincronizando Ecopontos...',
                    'Lista de pontos de coleta atualizada com sucesso!'
                );
            }
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const pontosFiltrados = useMemo(() => {
        return pontos.filter((item) => {
            const texto = `${item.nome} ${item.bairro} ${item.categoria} ${item.materiaisResumo}`.toLowerCase();
            const bateBusca = !busca.trim() || texto.includes(busca.trim().toLowerCase());

            if (!filtroMaterial) return bateBusca;

            const termoMaterial = filtroMaterial.toLowerCase();
            const bateMaterial =
                texto.includes(termoMaterial) ||
                (filtroMaterial === 'PLÁSTICO' && texto.includes('plastico')) ||
                (filtroMaterial === 'METAL' && item.categoria === 'Eletrônicos');

            return bateBusca && bateMaterial;
        });
    }, [pontos, busca, filtroMaterial]);

    const alternarFiltro = (material: Exclude<FiltroVisual, null>) => {
        setFiltroMaterial((atual) => (atual === material ? null : material));
    };

    const renderEcoponto = ({ item }: { item: PontoColetaItem }) => {
        const ehFavorito = isFavorite(item.id);

        return (
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.82}
                onPress={() => navigation.navigate('DetalhesEcoponto', { ponto: item })}
            >
                <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle}>{item.nome}</Text>
                    <View style={styles.cardActions}>
                        <TouchableOpacity
                            onPress={() => toggleFavorite(item)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            style={styles.heartButton}
                        >
                            <Ionicons
                                name={ehFavorito ? 'heart' : 'heart-outline'}
                                size={22}
                                color={ehFavorito ? '#E53935' : '#888'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.cardArrow}>→</Text>
                    </View>
                </View>

                <View style={styles.badgeRow}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{item.categoria}</Text>
                    </View>
                    <Text style={styles.bairroText}>📍 {item.bairro}</Text>
                </View>

                <View style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletTextBold}>
                        O que recebe:{' '}
                        <Text style={styles.bulletTextRegular}>{item.materiaisResumo}</Text>
                    </Text>
                </View>

                <View style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletTextRegular}>{item.destaqueSocial}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" background-Color="#5DA654" />

            <View style={styles.topBar}>
                <View style={styles.logoBox}>
                    <Ionicons name="location-sharp" size={26} color="#8CE652" />
                    <Text style={styles.logoText}>RECICLASPOT</Text>
                </View>

                <View style={styles.topLinks}>
                    <TouchableOpacity
                        style={styles.topLinkButton}
                        onPress={() => navigation.navigate('Favoritos')}
                    >
                        <Ionicons name="heart" size={18} color="#FFFFFF" />
                        <Text style={styles.topLinkText}>
                            Favoritos{favorites.length > 0 ? ` (${favorites.length})` : ''}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.topLinkButton}
                        onPress={() => navigation.navigate('Mapa')}
                    >
                        <Ionicons name="map-outline" size={18} color="#FFFFFF" />
                        <Text style={styles.topLinkText}>Mapa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {isConnected === false && (
                <View style={styles.offlineBanner}>
                    <Ionicons name="cloud-offline-outline" size={16} color="#FFF" />
                    <Text style={styles.offlineText}>
                        Modo offline: exibindo pontos salvos localmente.
                    </Text>
                </View>
            )}

            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por bairro, nome ou material..."
                        placeholderTextColor="#888"
                        value={busca}
                        onChangeText={setBusca}
                    />
                    {busca.length > 0 && (
                        <TouchableOpacity onPress={() => setBusca('')}>
                            <Ionicons name="close-circle" size={20} color="#888" />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.sectionTitle}>Filtrar por Material</Text>
                <View style={styles.materiaisGrid}>
                    {COLUNAS_MATERIAIS.map((mat) => {
                        const selecionado = filtroMaterial === mat.id;
                        return (
                            <TouchableOpacity
                                key={mat.id}
                                style={[
                                    styles.materialCard,
                                    { backgroundColor: mat.corFundo },
                                    selecionado && styles.materialCardSelected,
                                ]}
                                activeOpacity={0.8}
                                onPress={() => alternarFiltro(mat.id)}
                            >
                                <Text style={styles.materialTitle}>{mat.titulo}</Text>
                                <Text style={styles.materialSubtitle}>{mat.subtitulo}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.listHeader}>
                    <Text style={styles.sectionTitle}>
                        Pontos de Coleta ({pontosFiltrados.length})
                    </Text>
                    {filtroMaterial && (
                        <TouchableOpacity onPress={() => setFiltroMaterial(null)}>
                            <Text style={styles.clearFilterText}>Limpar filtro</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={pontosFiltrados}
                    keyExtractor={(item) => item.id}
                    renderItem={renderEcoponto}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="leaf-outline" size={40} color="#999" />
                            <Text style={styles.emptyText}>
                                Nenhum ecoponto encontrado para esse filtro.
                            </Text>
                        </View>
                    }
                />
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F7F4',
    },
    topBar: {
        backgroundColor: '#5DA654',
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 0.6,
    },
    topLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    topLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    topLinkText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 13,
    },
    offlineBanner: {
        backgroundColor: '#D9534F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        gap: 6,
    },
    offlineText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 14,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 46,
        borderWidth: 1,
        borderColor: '#E0E6E0',
        marginBottom: 14,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#2C3E2D',
        marginBottom: 10,
    },
    materiaisGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 16,
    },
    materialCard: {
        flex: 1,
        borderRadius: 12,
        padding: 10,
        minHeight: 88,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    materialCardSelected: {
        borderColor: '#2C5E28',
        transform: [{ scale: 1.02 }],
    },
    materialTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#1F2937',
    },
    materialSubtitle: {
        fontSize: 10,
        color: '#374151',
        lineHeight: 13,
        marginTop: 4,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clearFilterText: {
        color: '#5DA654',
        fontWeight: '600',
        fontSize: 13,
        marginBottom: 10,
    },
    listContent: {
        paddingBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5EBE5',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E3A1E',
        flex: 1,
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    heartButton: {
        padding: 2,
    },
    cardArrow: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5DA654',
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    categoryBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryBadgeText: {
        color: '#2E7D32',
        fontSize: 12,
        fontWeight: '700',
    },
    bairroText: {
        fontSize: 13,
        color: '#555',
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
    },
    bulletDot: {
        fontSize: 14,
        color: '#5DA654',
        marginRight: 6,
        fontWeight: 'bold',
    },
    bulletTextBold: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },
    bulletTextRegular: {
        fontSize: 13,
        fontWeight: '400',
        color: '#4B5563',
        flex: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        gap: 8,
    },
    emptyText: {
        color: '#777',
        fontSize: 14,
        textAlign: 'center',
    },
});

