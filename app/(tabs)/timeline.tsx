import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Flame, Trophy, BookOpen, Target, TrendingUp } from 'lucide-react-native';

interface ActivityDay {
  date: string;
  studyTime: number;
  topicsCompleted: number;
  active: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: any;
  color: string;
}

export default function Timeline() {
  const currentStreak = 7;
  const longestStreak = 15;
  const totalDays = 42;

  // Generate activity data for the last 7 weeks
  const generateActivityData = (): ActivityDay[] => {
    const days: ActivityDay[] = [];
    const today = new Date();
    
    for (let i = 48; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const studyTime = Math.random() > 0.3 ? Math.floor(Math.random() * 180) + 30 : 0;
      days.push({
        date: date.toISOString().split('T')[0],
        studyTime,
        topicsCompleted: studyTime > 0 ? Math.floor(studyTime / 45) : 0,
        active: studyTime > 0,
      });
    }
    return days;
  };

  const activityData = generateActivityData();

  const achievements: Achievement[] = [
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Studied for 7 consecutive days',
      date: '2024-01-15',
      icon: Flame,
      color: '#ef4444',
    },
    {
      id: '2',
      title: 'OWASP Explorer',
      description: 'Completed first OWASP Top 10 module',
      date: '2024-01-12',
      icon: Trophy,
      color: '#f59e0b',
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Completed 10 learning topics',
      date: '2024-01-10',
      icon: BookOpen,
      color: '#10b981',
    },
  ];

  const getActivityIntensity = (studyTime: number) => {
    if (studyTime === 0) return '#1e293b';
    if (studyTime < 60) return '#10b98140';
    if (studyTime < 120) return '#10b98180';
    return '#10b981';
  };

  const renderActivityGrid = () => {
    const weeks: ActivityDay[][] = [];
    for (let i = 0; i < activityData.length; i += 7) {
      weeks.push(activityData.slice(i, i + 7));
    }

    return (
      <View style={styles.activityGrid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={`${weekIndex}-${dayIndex}`}
                style={[
                  styles.activityDay,
                  { backgroundColor: getActivityIntensity(day.studyTime) }
                ]}
              >
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learning Timeline</Text>
          <Text style={styles.subtitle}>Track your cybersecurity journey</Text>
        </View>

        {/* Streak Stats */}
        <View style={styles.streakContainer}>
          <View style={styles.streakCard}>
            <Flame size={24} color="#ef4444" />
            <Text style={styles.streakNumber}>{currentStreak}</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          <View style={styles.streakCard}>
            <Trophy size={24} color="#f59e0b" />
            <Text style={styles.streakNumber}>{longestStreak}</Text>
            <Text style={styles.streakLabel}>Longest Streak</Text>
          </View>
          <View style={styles.streakCard}>
            <Calendar size={24} color="#10b981" />
            <Text style={styles.streakNumber}>{totalDays}</Text>
            <Text style={styles.streakLabel}>Total Days</Text>
          </View>
        </View>

        {/* Activity Heatmap */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Learning Activity</Text>
            <Text style={styles.activitySubtitle}>Last 7 weeks</Text>
          </View>
          
          {renderActivityGrid()}
          
          <View style={styles.activityLegend}>
            <Text style={styles.legendText}>Less</Text>
            <View style={styles.legendDots}>
              <View style={[styles.legendDot, { backgroundColor: '#1e293b' }]} />
              <View style={[styles.legendDot, { backgroundColor: '#10b98140' }]} />
              <View style={[styles.legendDot, { backgroundColor: '#10b98180' }]} />
              <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
            </View>
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                <achievement.icon size={20} color={achievement.color} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <TrendingUp size={20} color="#10b981" />
            <Text style={styles.summaryTitle}>This Week's Progress</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>8.5h</Text>
              <Text style={styles.summaryLabel}>Study Time</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>5</Text>
              <Text style={styles.summaryLabel}>Topics</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Modules</Text>
            </View>
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
  streakContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  streakCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  streakNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 8,
  },
  streakLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    marginTop: 4,
  },
  activitySection: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activityHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  activitySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
  activityGrid: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 16,
  },
  week: {
    gap: 3,
  },
  activityDay: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  activityLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  legendDots: {
    flexDirection: 'row',
    gap: 3,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    marginTop: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#10b981',
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    marginTop: 4,
  },
});