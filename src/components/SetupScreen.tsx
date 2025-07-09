import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppStore } from '../store/appStore';

export const SetupScreen: React.FC = () => {
  const {
    resume,
    jobDescription,
    apiKey,
    setResume,
    setJobDescription,
    setApiKey,
    setIsInPipMode,
  } = useAppStore();

  const [loading, setLoading] = useState(false);

  const validateInputs = (): boolean => {
    if (!resume.trim()) {
      Alert.alert('Error', 'Please enter your resume');
      return false;
    }
    if (!jobDescription.trim()) {
      Alert.alert('Error', 'Please enter the job description');
      return false;
    }
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter your Gemini API key');
      return false;
    }
    return true;
  };

  const handleStartInterviewMode = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    
    try {
      // Here we would initialize the AI service and transcription service
      // For now, we'll simulate the initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Enter PiP mode
      setIsInPipMode(true);
      
      Alert.alert(
        'Interview Mode Started',
        'The app is now in Picture-in-Picture mode. Join your video call and the app will listen for questions.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to start interview mode. Please try again.');
      console.error('Error starting interview mode:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Ghost Writer</Text>
        <Text style={styles.subtitle}>AI-Powered Interview Assistant</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Resume</Text>
          <TextInput
            style={styles.largeTextInput}
            placeholder="Paste your resume here..."
            value={resume}
            onChangeText={setResume}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Job Description</Text>
          <TextInput
            style={styles.largeTextInput}
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChangeText={setJobDescription}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Google Gemini API Key</Text>
          <TextInput
            style={styles.apiKeyInput}
            placeholder="Enter your Gemini API key..."
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.startButton, loading && styles.startButtonDisabled]}
          onPress={handleStartInterviewMode}
          disabled={loading}
        >
          <Text style={styles.startButtonText}>
            {loading ? 'Starting...' : 'Start Interview Mode'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          1. Fill in your resume and the job description{'\n'}
          2. Enter your Gemini API key{'\n'}
          3. Start interview mode{'\n'}
          4. Join your video call{'\n'}
          5. The app will listen and provide AI-generated answers
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  largeTextInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#333',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  apiKeyInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#333',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});