import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { VoiceInput } from '../components/VoiceInput';

const BACKEND_URL = 'http://10.246.216.66:8000';

export const RegistrationScreen = ({ route, navigation }: any) => {
  const phone = route.params?.phone || '';
  
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    disability: '',
    primary_skill: '',
    field_of_interest: '',
    description: '',
  });

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/register`, { ...form, phone });
      Alert.alert('Success', 'Profile saved successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Home') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Typography variant="h2" style={styles.title}>Complete Your Profile</Typography>
        <Typography variant="body" style={styles.subtitle}>
          Use the speaker icon to hear the prompt, and the mic icon to speak your answer.
        </Typography>

        <VoiceInput label="Full Name" fieldName="name" value={form.name} onChangeText={(t) => updateForm('name', t)} />
        <VoiceInput label="Age" fieldName="age" value={form.age} onChangeText={(t) => updateForm('age', t)} />
        <VoiceInput label="Gender" fieldName="gender" value={form.gender} onChangeText={(t) => updateForm('gender', t)} />
        <VoiceInput label="Disability Status" fieldName="disability" value={form.disability} onChangeText={(t) => updateForm('disability', t)} placeholder="e.g. None" />
        <VoiceInput label="Primary Skill you want to learn" fieldName="primary_skill" value={form.primary_skill} onChangeText={(t) => updateForm('primary_skill', t)} />
        <VoiceInput label="More Fields of Interest" fieldName="field_of_interest" value={form.field_of_interest} onChangeText={(t) => updateForm('field_of_interest', t)} />
        <VoiceInput 
          label="Describe more about interesting skills you want to learn" 
          fieldName="description" 
          value={form.description} 
          onChangeText={(t) => updateForm('description', t)} 
          multiline 
        />

        <Button title="Submit Profile" onPress={handleSubmit} style={styles.submitButton} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingBottom: 60 },
  title: { marginBottom: 8 },
  subtitle: { marginBottom: 32, color: colors.secondaryText },
  submitButton: { marginTop: 24 }
});
