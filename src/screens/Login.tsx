import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation<any>();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleEntrar = () => {
        navigation.navigate('MainTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  background-color="#FFFFFF" barStyle="dark-content" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* LOGO CENTRAL RECICLASPOT */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoCircle}>
                            <MaterialCommunityIcons name="recycle" size={76} color="#1E7334" />
                        </View>
                        <Text style={styles.brandName}>RECICLASPOT</Text>
                    </View>

                    {/* FORMULÁRIO DE LOGIN */}
                    <View style={styles.formSection}>
                        <Text style={styles.label}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome aqui..."
                            placeholderTextColor="#7A9E66"
                            value={login}
                            onChangeText={setLogin}
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="******************"
                                placeholderTextColor="#5C7A4B"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!mostrarSenha}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setMostrarSenha(!mostrarSenha)}
                            >
                                <Ionicons
                                    name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                                    size={22}
                                    color="#111"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.forgotButton}
                            onPress={() => Alert.alert('Recuperar Senha', 'Função de recuperação de senha.')}
                        >
                            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* BOTÃO ENTRAR E LINK DE CADASTRO */}
                    <View style={styles.actionSection}>
                        <TouchableOpacity style={styles.entrarButton} onPress={handleEntrar}>
                            <Text style={styles.entrarButtonText}>ENTRAR</Text>
                        </TouchableOpacity>

                        <View style={styles.registerRow}>
                            <Text style={styles.registerText}>Não possui uma conta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                <Text style={styles.registerLink}>Cadastrar-se</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.orText}>Ou</Text>
                    </View>

                    {/* BOTÕES DE LOGIN SOCIAL */}
                    <View style={styles.socialSection}>
                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => Alert.alert('Google', 'Entrar com a conta do Google')}
                        >
                            <FontAwesome name="google" size={22} color="#111" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Entrar com a conta do Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => Alert.alert('Apple', 'Entrar com o Apple ID')}
                        >
                            <FontAwesome name="apple" size={24} color="#111" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Entrar com o Apple ID</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
        paddingVertical: 30,
    },
    // Logo
    logoSection: {
        alignItems: 'center',
        marginBottom: 42,
    },
    logoCircle: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: '#E8F8DC',
        borderWidth: 3,
        borderColor: '#65A65B',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    brandName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E7334',
        letterSpacing: 1,
    },
    // Campos
    formSection: {
        width: '100%',
        marginBottom: 28,
    },
    label: {
        fontSize: 13.5,
        color: '#111',
        fontFamily: 'serif',
        marginBottom: 6,
        marginLeft: 14,
    },
    input: {
        width: '100%',
        height: 44,
        backgroundColor: '#C5F99B',
        borderRadius: 22,
        paddingHorizontal: 18,
        fontSize: 13,
        color: '#1A3311',
        fontFamily: 'serif',
        marginBottom: 16,
    },
    passwordContainer: {
        width: '100%',
        height: 44,
        backgroundColor: '#C5F99B',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 14,
        marginBottom: 8,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        fontSize: 13,
        color: '#1A3311',
        fontFamily: 'serif',
    },
    eyeButton: {
        padding: 4,
    },
    forgotButton: {
        alignSelf: 'flex-start',
        marginLeft: 14,
    },
    forgotText: {
        fontSize: 12.5,
        color: '#111',
        fontFamily: 'serif',
    },
    // Botão Entrar e Links
    actionSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 22,
    },
    entrarButton: {
        width: '56%',
        height: 42,
        backgroundColor: '#C5F99B',
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    entrarButtonText: {
        fontSize: 13.5,
        fontWeight: 'bold',
        color: '#1A3311',
        fontFamily: 'serif',
        letterSpacing: 0.5,
    },
    registerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    registerText: {
        fontSize: 12.5,
        color: '#111',
        fontFamily: 'serif',
    },
    registerLink: {
        fontSize: 12.5,
        color: '#111',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    orText: {
        fontSize: 13,
        color: '#111',
        fontFamily: 'serif',
    },
    // Botões Sociais
    socialSection: {
        width: '100%',
        gap: 14,
    },
    socialButton: {
        width: '100%',
        height: 44,
        backgroundColor: '#C5F99B',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    socialIcon: {
        marginRight: 14,
        width: 24,
        textAlign: 'center',
    },
    socialButtonText: {
        fontSize: 12.5,
        color: '#5C7A4B',
        fontFamily: 'serif',
    },
});



