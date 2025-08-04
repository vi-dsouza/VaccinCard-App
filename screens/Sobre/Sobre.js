import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import AccordionItem from '../../components/AccordionSobre';
import Menu from '../../components/Menu';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function AccordionListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          style={styles.logoApp}
          source={require('../../assets/images/logo.png')}
          resizeMode='cover'
        />
        <View style={styles.centeredContent}>
          <AccordionItem title="Objetivo">
            O aplicativo VaccinCard tem como objetivo facilitar o controle de vacinas do seu pet, simulando um cartão de vacinas digital e de fácil acesso. 
          </AccordionItem>
          <AccordionItem title="Funcionalidades">
            O aplivativo permite cadastrar seus pets de forma fácil e intuitiva. Permitindo o registro de vacinas e o histórico completo das mesmas.
          </AccordionItem>
          <AccordionItem title="Por que usar o VaccinCard?">
            Evitar a perda de cartões de vacinação de papel, ou esquecer de onde guardou. Com nosso aplicativo você terá tudo na palma da sua mão.
          </AccordionItem>
          <AccordionItem title="Privacidade e Segurança">
            Respeitamos sua privacidade e não compartilhamos suas informações com terceiros.
          </AccordionItem>
        </View>
      </ScrollView>

      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    gap: 20,
    width: screenWidth * 1,
    marginBottom: 50,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center', // centraliza verticalmente
    padding: 26,
  },
  menuContainer: {
    height: 70,
    justifyContent: 'center',
  },
  logoApp: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.2,
    borderRadius: 100,
    marginTop: 30,
    alignSelf: 'center',
  },
});
