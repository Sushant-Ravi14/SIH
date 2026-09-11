import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { VoiceInput } from '../components/VoiceInput';

const BACKEND_URL = 'http://10.246.216.66:8000';

export const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');

  const handleRequestOtp = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/request-otp`, { phone });
      setStep('OTP');
      Alert.alert('Success', 'OTP sent! (Use 1234 for testing)');
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/verify-otp`, { phone, otp });
      if (res.data.status === 'success') {
        navigation.replace('Registration', { phone });
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Typography variant="h1" style={styles.title}>PM-AJAY</Typography>
        <Typography variant="body" style={styles.subtitle}>Voice-enabled Registration</Typography>
        
        {step === 'PHONE' ? (
          <View>
            <VoiceInput
              label="Phone Number"
              fieldName="phone"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your 10-digit number"
            />
            <Button title="Get OTP" onPress={handleRequestOtp} style={styles.button} />
          </View>
        ) : (
          <View>
            <VoiceInput
              label="OTP"
              fieldName="otp"
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter 4-digit OTP"
            />
            <Button title="Verify OTP" onPress={handleVerifyOtp} style={styles.button} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { marginBottom: 8, textAlign: 'center' },
  subtitle: { marginBottom: 40, textAlign: 'center', color: colors.secondaryText },
  button: { marginTop: 20 }
});
