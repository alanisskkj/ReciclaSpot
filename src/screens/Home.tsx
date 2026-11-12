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

    const renderEcoponto = ({ item }: { item: PontoColetaItem }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.82}
            onPress={() => navigation.navigate('DetalhesEcoponto', { ponto: item })}
        >
            <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardArrow}>→</Text>
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


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" background-color="#5DA654" />

            <View style={styles.topBar}>
                <View style={styles.logoBox}>
                    <Ionicons name="location-sharp" size={26} color="#8CE652" />
                    <Text style={styles.logoText}>RECICLASPOT</Text>
                </View>

                <View style={styles.topLinks}>
                    <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
                        <Text style={styles.topLinkText}>Mapa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <Text style={styles.topLinkText}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                        <Text style={styles.topLinkText}>Favoritos</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            'Status da Rede',
                            isConnected
                                ? 'Você está Online. Ecopontos sincronizados em tempo real.'
                                : 'Modo Offline ativo. Exibindo ecopontos salvos no dispositivo.'
                        )
                    }
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="menu" size={28} color="#111111" />
                </TouchableOpacity>
            </View>

            <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
                <FlatList
                    data={pontosFiltrados}
                    keyExtractor={(item) => item.id}
                    renderItem={renderEcoponto}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>
                            <View style={styles.materialsBanner}>
                                {COLUNAS_MATERIAIS.map((col, index) => {
                                    const selecionado = filtroMaterial === col.id;
                                    return (
                                        <TouchableOpacity
                                            key={col.id}
                                            activeOpacity={0.85}
                                            onPress={() => alternarFiltro(col.id)}
                                            style={[
                                                styles.materialColumn,
                                                { backgroundColor: col.corFundo },
                                                index === 0 && styles.firstColumn,
                                                index === COLUNAS_MATERIAIS.length - 1 && styles.lastColumn,
                                                selecionado && styles.materialColumnSelected,
                                            ]}
                                        >
                                            <View style={styles.recycleIconCircle}>
                                                <Ionicons name="sync" size={16} color="#FFFFFF" />
                                            </View>
                                            <Text style={styles.materialTitle}>{col.titulo}</Text>
                                            <Text style={styles.materialSubtitle}>{col.subtitulo}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <View style={styles.searchBar}>
                                <TextInput
                                    style={styles.searchInput}
                                    value={busca}
                                    onChangeText={setBusca}
                                    placeholder="Busque o que você procura..."
                                    placeholderTextColor="#5C8A4E"
                                />
                                {busca.length > 0 || filtroMaterial ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBusca('');
                                            setFiltroMaterial(null);
                                        }}
                                    >
                                        <Ionicons name="close-circle" size={20} color="#2E6F2B" />
                                    </TouchableOpacity>
                                ) : (
                                    <Ionicons name="search" size={19} color="#2E6F2B" />
                                )}
                            </View>

                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionTitleRow}>
                                    <Ionicons name="leaf" size={18} color="#5DA654" />
                                    <Text style={styles.sectionTitle}>
                                        Ecopontos Comunitários e Urbanos
                                    </Text>
                                </View>
                                <View style={styles.statusRow}>
                                    <View
                                        style={[
                                            styles.statusDot,
                                            isConnected === false ? styles.dotOffline : styles.dotOnline,
                                        ]}
                                    />
                                    <Text style={styles.statusLabel}>
                                        {isConnected === false ? 'Offline' : 'Online'} • Chacoalhe para atualizar
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyBox}>
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
        backgroundColor: '#5DA654',
    },
    topBar: {
        backgroundColor: '#5DA654',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 12 : 6,
        paddingBottom: 12,
    },
    logoBox: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#1A3A18',
        marginTop: 2,
    },
    topLinks: {
        flexDirection: 'row',
        gap: 16,
    },
    topLinkText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#173615',
    },
    body: {
        flex: 1,
        backgroundColor: '#F6F7F6',
    },
    listContent: {
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 28,
    },
    materialsBanner: {
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    materialColumn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    firstColumn: {
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
    },
    lastColumn: {
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14,
    },
    materialColumnSelected: {
        borderColor: '#2E7D32',
    },
    recycleIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    materialTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#111111',
        marginTop: 4,
    },
    materialSubtitle: {
        fontSize: 9,
        color: '#222222',
        textAlign: 'center',
        marginTop: 3,
        lineHeight: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C4F99B',
        borderRadius: 24,
        height: 44,
        paddingHorizontal: 18,
        marginBottom: 18,
    },
    searchInput: {
        flex: 1,
        fontSize: 13,
        color: '#173615',
    },
    sectionHeader: {
        marginBottom: 12,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#111111',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginLeft: 2,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    dotOnline: {
        backgroundColor: '#439245',
    },
    dotOffline: {
        backgroundColor: '#C0392B',
    },
    statusLabel: {
        fontSize: 11,
        color: '#4F634D',
        fontWeight: '600',
    },
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
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#111111',
        flex: 1,
    },
    cardArrow: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111111',
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
        marginBottom: 8,
    },
    categoryBadge: {
        backgroundColor: '#5DA654',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    categoryBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    bairroText: {
        fontSize: 11,
        color: '#2A4728',
        fontWeight: '600',
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
        paddingRight: 8,
    },
    bulletDot: {
        fontSize: 13,
        fontWeight: '800',
        color: '#111111',
        marginRight: 6,
        lineHeight: 17,
    },
    bulletTextBold: {
        fontSize: 12,
        fontWeight: '700',
        color: '#111111',
        lineHeight: 17,
        flex: 1,
    },
    bulletTextRegular: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1A1A1A',
        lineHeight: 17,
        flex: 1,
    },
    emptyBox: {
        paddingVertical: 32,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 13,
        color: '#5A6E58',
        fontWeight: '600',
    },
});
