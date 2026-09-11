import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface VoiceInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  fieldName: string;
  placeholder?: string;
  multiline?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  fieldName,
  placeholder,
  multiline = false 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const speakPrompt = () => {
    Speech.speak(`Please enter your ${label}.`);
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate network/transcription delay
    setTimeout(() => {
      mockTranscribeAudio();
    }, 1500);
  };

  const mockTranscribeAudio = () => {
    const mockResponses: Record<string, string> = {
      phone: '9876543210',
      otp: '1234',
      name: 'Rituraj Jha',
      age: '24',
      gender: 'Male',
      disability: 'None',
      primary_skill: 'Tailoring',
      field_of_interest: 'Fashion Design',
      description: 'I want to learn how to design modern clothes and start my own boutique.'
    };
    
    const text = mockResponses[fieldName.toLowerCase()] || 'Sample voice input';
    onChangeText(text);
    setIsProcessing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || `Enter ${label}`}
          multiline={multiline}
        />
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={speakPrompt} style={styles.iconButton}>
            <Text style={styles.iconText}>🔊</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={isRecording ? stopRecording : startRecording} 
            style={[styles.iconButton, isRecording && styles.recordingButton]}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color={colors.accent} />
            ) : (
              <Text style={styles.iconText}>{isRecording ? '⏹' : '🎤'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    fontFamily: typography.bodyFamily,
    fontSize: typography.sizes.small,
    color: colors.primaryText,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputRow: { flexDirection: 'row', alignItems: 'flex-start' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 12,
    fontSize: typography.sizes.body,
    backgroundColor: '#FFF',
    minHeight: 48,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  actionButtons: { flexDirection: 'row', marginLeft: 10 },
  iconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    marginLeft: 8,
  },
  recordingButton: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  iconText: { fontSize: 20 }
});
