import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

//Ativa animações no android
if (Platform.OS == 'android'){
    UIManager.setLayoutAnimationEnabledExperimental && 
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AccordionSobre({title, children}) {
    //controla se está aberto ou fechado
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        //Ativa animação de transição
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        //Altera estado de expandido
        setExpanded(!expanded);
    }
    return (
        <View style={styles.container}>
            {/* Cabeçalho do item: titulo + icone */}
            <TouchableOpacity style={styles.titleContainer} onPress={toggleExpanded}>
                <Text style={styles.title}>{title}</Text>
                {/* Icone muda conforme está expandido ou não */}
                <AntDesign name={expanded ? 'up' : 'down'} size={16} color="black" />
            </TouchableOpacity>

            {/* Conteúdo do acordeão, só parece se estiver expandido */}
            {expanded && (
                <View style={styles.content}>
                    <Text style={styles.contentText}>{children}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
        marginBottom: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    contentText: {
        fontSize: 16,
        color: '#444',
    },
});