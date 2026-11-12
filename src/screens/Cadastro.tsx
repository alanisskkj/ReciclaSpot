import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Usuario } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function Cadastro({ navigation }: Props) {
    const [tipoPerfil, setTipoPerfil] = useState<'Cidadao' | 'Voluntario'>('Cidadao');
    const [nome, setNome] = useState('');
    const [emailOuCpf, setEmailOuCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [aceitouTermos, setAceitouTermos] = useState(false);

    const handleCriarConta = () => {
        if (!nome.trim() || !emailOuCpf.trim() || !telefone.trim() || !senha.trim()) {
            Alert.alert('Campos obrigatórios', 'Preencha todos os dados para criar sua conta.');
            return;
        }

        if (!aceitouTermos) {
            Alert.alert('Termos de Uso', 'Você precisa aceitar os Termos de Uso e Privacidade.');
            return;
        }

        const novoUsuario: Usuario = {
            id: Date.now().toString(),
            nome: nome.trim(),
            email: emailOuCpf.trim(),
            telefone: telefone.trim(),
            tipoPerfil,
            pontosReciclagem: 0,
        };

        Alert.alert('Conta criada!', `Bem-vindo ao ReciclaSpot, ${novoUsuario.nome}!`, [
            {
                text: 'Começar',
                onPress: () => navigation.replace('MainTabs'),
            },
        ]);
    };

    const handleLoginSocial = (provedor: 'Google' | 'Apple') => {
        Alert.alert(`Login com ${provedor}`, 'Autenticação simulada com sucesso!', [
            { text: 'Continuar', onPress: () => navigation.replace('MainTabs') },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" background-color="#5DA654" />
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Cabeçalho Verde do Protótipo */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="location-sharp" size={28} color="#8CE652" />
                        <Text style={styles.logoText}>RECICLASPOT</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Seletor de Tipo de Perfil: Cidadão / Voluntário */}
                    <View style={styles.roleRow}>
                        <TouchableOpacity
                            style={[
                                styles.rolePill,
                                tipoPerfil === 'Cidadao' && styles.rolePillActive,
                            ]}
                            onPress={() => setTipoPerfil('Cidadao')}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="person" size={18} color="#111111" />
                            <Text style={styles.roleText}>Cidadão</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.rolePill,
                                tipoPerfil === 'Voluntario' && styles.rolePillActive,
                            ]}
                            onPress={() => setTipoPerfil('Voluntario')}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="heart" size={18} color="#111111" />
                            <Text style={styles.roleText}>Voluntário</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Formulário */}
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Nome Completo:</Text>
                        <TextInput
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                            placeholder="Digite seu nome aqui..."
                            placeholderTextColor="#6E8F64"
                        />

                        <Text style={styles.label}>E-mail ou CPF</Text>
                        <TextInput
                            style={styles.input}
                            value={emailOuCpf}
                            onChangeText={setEmailOuCpf}
                            placeholder="Digite seu e-mail ou número de documento..."
                            placeholderTextColor="#6E8F64"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Celular/ WhatsApp</Text>
                        <TextInput
                            style={styles.input}
                            value={telefone}
                            onChangeText={setTelefone}
                            placeholder="Digite seu número de telefone..."
                            placeholderTextColor="#6E8F64"
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                value={senha}
                                onChangeText={setSenha}
                                placeholder="****************"
                                placeholderTextColor="#6E8F64"
                                secureTextEntry={!mostrarSenha}
                            />
                            <TouchableOpacity
                                onPress={() => setMostrarSenha((prev) => !prev)}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons
                                    name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                                    size={22}
                                    color="#1B3B1A"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Checkbox Termos de Uso */}
                        <TouchableOpacity
                            style={styles.termsRow}
                            onPress={() => setAceitouTermos((prev) => !prev)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, aceitouTermos && styles.checkboxChecked]}>
                                {aceitouTermos && <Ionicons name="checkmark" size={14} color="#111" />}
                            </View>
                            <Text style={styles.termsText}>Li e aceito os Termos de Uso e Privacidade</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botão Principal */}
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleCriarConta}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.primaryButtonText}>CRIAR MINHA CONTA</Text>
                    </TouchableOpacity>

                    {/* Link para Login */}
                    <View style={styles.loginRedirectRow}>
                        <Text style={styles.loginRedirectText}>Já possui uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginRedirectLink}>Entrar</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.orText}>Ou</Text>

                    {/* Login Social */}
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleLoginSocial('Google')}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="logo-google" size={20} color="#111111" style={styles.socialIcon} />
                        <Text style={styles.socialButtonText}>Entrar com a conta do Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleLoginSocial('Apple')}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="logo-apple" size={22} color="#111111" style={styles.socialIcon} />
                        <Text style={styles.socialButtonText}>Entrar com o Apple ID</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#5DA654',
    },
    flex: {
        flex: 1,
        backgroundColor: '#F7F8F7',
    },
    header: {
        backgroundColor: '#5DA654',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 14 : 8,
        paddingBottom: 16,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    logoText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#1A3A18',
        marginTop: 2,
        letterSpacing: 0.5,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 22,
        paddingBottom: 36,
    },
    roleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 22,
        gap: 16,
    },
    rolePill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D6F9B8',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 24,
        gap: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    rolePillActive: {
        backgroundColor: '#BFF693',
        borderColor: '#4B8E43',
    },
    roleText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111111',
    },
    formContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#222222',
        marginBottom: 6,
        marginLeft: 10,
    },
    input: {
        backgroundColor: '#C4F99B',
        borderRadius: 24,
        height: 46,
        paddingHorizontal: 18,
        fontSize: 13,
        color: '#163014',
        marginBottom: 14,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C4F99B',
        borderRadius: 24,
        height: 46,
        paddingHorizontal: 18,
        marginBottom: 12,
    },
    passwordInput: {
        flex: 1,
        fontSize: 13,
        color: '#163014',
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 2,
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: '#222222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#C4F99B',
    },
    termsText: {
        fontSize: 12,
        color: '#222222',
    },
    primaryButton: {
        backgroundColor: '#C4F99B',
        borderRadius: 24,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 36,
        marginTop: 8,
    },
    primaryButtonText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#111111',
        letterSpacing: 0.4,
    },
    loginRedirectRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    loginRedirectText: {
        fontSize: 12,
        color: '#222222',
    },
    loginRedirectLink: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2E7D32',
        textDecorationLine: 'underline',
    },
    orText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#333333',
        marginVertical: 12,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C4F99B',
        borderRadius: 24,
        height: 46,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    socialIcon: {
        marginRight: 16,
    },
    socialButtonText: {
        fontSize: 13,
        color: '#4E6B47',
        fontWeight: '500',
    },
});