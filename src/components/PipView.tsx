import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAppStore } from '../store/appStore';

export const PipView: React.FC = () => {
  const {
    aiAnswer,
    transcribedQuestion,
    isListening,
    setIsInPipMode,
  } = useAppStore();

  const handleExitPipMode = () => {
    setIsInPipMode(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ghost Writer</Text>
        <TouchableOpacity onPress={handleExitPipMode} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {isListening && (
          <View style={styles.statusContainer}>
            <View style={styles.listeningIndicator} />
            <Text style={styles.statusText}>Listening...</Text>
          </View>
        )}

        {transcribedQuestion && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionLabel}>Question:</Text>
            <Text style={styles.questionText}>{transcribedQuestion}</Text>
          </View>
        )}

        {aiAnswer ? (
          <View style={styles.answerContainer}>
            <Text style={styles.answerLabel}>AI Answer:</Text>
            <Text style={styles.answerText}>{aiAnswer}</Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              {isListening 
                ? 'Waiting for questions...' 
                : 'Start listening to see AI-generated answers here'
              }
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(40, 40, 40, 0.95)',
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 200,
    minWidth: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exitButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listeningIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  questionContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  questionLabel: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  questionText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
  },
  answerContainer: {
    padding: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  answerLabel: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  answerText: {
    color: '#e0e0e0',
    fontSize: 14,
    lineHeight: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});