
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Target, Clock, Trophy, TrendingUp, Calendar, Shield, FileText } from 'lucide-react-native';
import { shareAsync } from 'expo-sharing';
import { generateLearningPost } from '@/utils/shareTemplate';
import SessionTimer from '../../components/SessionTimer';


export default function Dashboard() {
  const currentStreak = 7;
  const totalHours = 42;
  const completedTopics = 12;
  const nextSession = "OWASP Top 10 - Injection Attacks";

  // Daily learning state
  const DAILY_TARGET = 20; // minutes
  const [todayMinutes, setTodayMinutes] = useState(0);

  const handleSessionComplete = (duration: number) => {
    setTodayMinutes(prev => prev + duration);
    Alert.alert('Session Complete', `You studied for ${duration} minutes!`);
  };

  const handleShare = async () => {
    try {
      const post = generateLearningPost({
        userName: 'Your Name',
        topics: [
          'Cybersecurity Fundamentals',
          'OWASP Top 10',
          'Practical Labs',
        ],
        period: 'this week',
        achievements: [
          `Maintained a ${currentStreak}-day learning streak`,
          `Completed ${completedTopics} topics`,
          `Studied for ${totalHours} hours`,
        ],
      });
      await shareAsync(post, { dialogTitle: 'Share your learning journey' });
    } catch (error) {
      Alert.alert('Error', 'Could not share your post.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.subtitle}>Ready to advance your cybersecurity skills?</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakNumber}>{currentStreak}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={24} color="#10b981" />
            <Text style={styles.statNumber}>{totalHours}h</Text>
            <Text style={styles.statLabel}>Total Study Time</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy size={24} color="#f59e0b" />
            <Text style={styles.statNumber}>{completedTopics}</Text>
            <Text style={styles.statLabel}>Topics Completed</Text>
          </View>
        </View>

        {/* Daily Learning Tracker */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Target size={20} color="#10b981" />
            <Text style={styles.goalTitle}>Today's Goal</Text>
          </View>
          <Text style={styles.goalDescription}>Learn at least 20 minutes today</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((todayMinutes / DAILY_TARGET) * 100, 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>{todayMinutes} / {DAILY_TARGET} minutes completed</Text>
          <SessionTimer onSessionComplete={handleSessionComplete} targetDuration={DAILY_TARGET} />
          {todayMinutes < DAILY_TARGET && (
            <Text style={styles.warningText}>Keep going! Every little step matters.</Text>
          )}
          {todayMinutes >= DAILY_TARGET && (
            <Text style={styles.celebrateText}>🎉 Daily goal achieved! Great job!</Text>
          )}
        </View>

        {/* Next Session */}
        <View style={styles.sessionCard}>
          <View style={styles.sessionHeader}>
            <Shield size={20} color="#3b82f6" />
            <Text style={styles.sessionTitle}>Next Session</Text>
          </View>
          <Text style={styles.sessionTopic}>{nextSession}</Text>
          <Text style={styles.sessionDuration}>Estimated: 45 minutes</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#8b5cf6" />
              <Text style={styles.actionText}>Schedule Study</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <FileText size={24} color="#ef4444" />
              <Text style={styles.actionText}>Update CV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <TrendingUp size={24} color="#06b6d4" />
              <Text style={styles.actionText}>View Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#2563eb' }]} onPress={handleShare}>
              <Text style={[styles.actionText, { color: '#fff' }]}>Share on LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
  streakBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  streakLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    marginTop: 4,
  },
  goalCard: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  goalDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#e2e8f0',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#f59e0b',
    marginTop: 8,
    textAlign: 'center',
  },
  celebrateText: {
    fontSize: 14,
    color: '#10b981',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  sessionCard: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  sessionTopic: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  sessionDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
    marginTop: 8,
    textAlign: 'center',
  },
});