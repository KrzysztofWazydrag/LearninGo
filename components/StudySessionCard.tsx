import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Target, Play, CircleCheck as CheckCircle } from 'lucide-react-native';

interface StudySessionCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  completed?: boolean;
  onStart?: () => void;
}

export default function StudySessionCard({
  title,
  description,
  duration,
  difficulty,
  progress = 0,
  completed = false,
  onStart
}: StudySessionCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metadata}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
                {difficulty}
              </Text>
            </View>
            <View style={styles.durationContainer}>
              <Clock size={14} color="#94a3b8" />
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          {completed ? (
            <CheckCircle size={24} color="#10b981" />
          ) : (
            <TouchableOpacity style={styles.playButton} onPress={onStart}>
              <Play size={20} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      {progress > 0 && !completed && (
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% complete</Text>
        </View>
      )}

      {completed && (
        <View style={styles.completedSection}>
          <Target size={16} color="#10b981" />
          <Text style={styles.completedText}>Session completed successfully!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
  },
  actionContainer: {
    marginLeft: 16,
  },
  playButton: {
    backgroundColor: '#10b981',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
  },
  completedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b98120',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  completedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
  },
});