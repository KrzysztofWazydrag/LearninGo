import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Clock, Star, Play, CircleCheck as CheckCircle, Lock } from 'lucide-react-native';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  locked: boolean;
  progress: number;
}

export default function Learning() {
  const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'upcoming'>('current');

  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: 'OWASP Top 10 - Injection Attacks',
      description: 'Learn about SQL injection, NoSQL injection, and command injection vulnerabilities',
      duration: '45 min',
      difficulty: 'Beginner',
      completed: false,
      locked: false,
      progress: 65,
    },
    {
      id: '2',
      title: 'Network Security Fundamentals',
      description: 'Understanding firewalls, VPNs, and network protocols',
      duration: '60 min',
      difficulty: 'Intermediate',
      completed: false,
      locked: false,
      progress: 0,
    },
    {
      id: '3',
      title: 'TryHackMe - Web Application Security',
      description: 'Hands-on practice with web application vulnerabilities',
      duration: '90 min',
      difficulty: 'Intermediate',
      completed: false,
      locked: true,
      progress: 0,
    },
    {
      id: '4',
      title: 'Microsoft SC-900 Preparation',
      description: 'Security, Compliance, and Identity Fundamentals',
      duration: '120 min',
      difficulty: 'Advanced',
      completed: false,
      locked: true,
      progress: 0,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderModule = (module: LearningModule) => (
    <TouchableOpacity key={module.id} style={styles.moduleCard} disabled={module.locked}>
      <View style={styles.moduleHeader}>
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <View style={styles.moduleMetadata}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(module.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(module.difficulty) }]}>
                {module.difficulty}
              </Text>
            </View>
            <View style={styles.durationContainer}>
              <Clock size={14} color="#94a3b8" />
              <Text style={styles.durationText}>{module.duration}</Text>
            </View>
          </View>
        </View>
        <View style={styles.moduleAction}>
          {module.locked ? (
            <Lock size={24} color="#6b7280" />
          ) : module.completed ? (
            <CheckCircle size={24} color="#10b981" />
          ) : (
            <Play size={24} color="#10b981" />
          )}
        </View>
      </View>
      
      <Text style={styles.moduleDescription}>{module.description}</Text>
      
      {module.progress > 0 && !module.completed && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${module.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{module.progress}% complete</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Path</Text>
        <Text style={styles.subtitle}>Cybersecurity Mastery Journey</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {(['current', 'completed', 'upcoming'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Learning Modules */}
      <ScrollView style={styles.modulesContainer} showsVerticalScrollIndicator={false}>
        {learningModules.map(renderModule)}
        
        {/* Study Tips Card */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Star size={20} color="#f59e0b" />
            <Text style={styles.tipsTitle}>Study Tips</Text>
          </View>
          <Text style={styles.tipsText}>
            • Take 10-minute breaks every hour{'\n'}
            • Practice hands-on labs after theory{'\n'}
            • Review previous topics weekly{'\n'}
            • Join cybersecurity communities
          </Text>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#10b981',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#ffffff',
  },
  modulesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  moduleCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  moduleMetadata: {
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
  moduleAction: {
    marginLeft: 16,
  },
  moduleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
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
  tipsCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    lineHeight: 20,
  },
});