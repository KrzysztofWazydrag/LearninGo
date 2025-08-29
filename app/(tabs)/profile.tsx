import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Share2, Award, MapPin, Calendar, Mail, Globe, Github, Linkedin } from 'lucide-react-native';

export default function Profile() {
  const userStats = {
    totalHours: 156,
    completedCourses: 8,
    certifications: 2,
    rank: 'Security Analyst',
    joinDate: 'January 2024',
    location: 'Remote',
  };

  const skills = [
    { name: 'Network Security', level: 85 },
    { name: 'OWASP Top 10', level: 70 },
    { name: 'Penetration Testing', level: 45 },
    { name: 'Incident Response', level: 60 },
    { name: 'Risk Assessment', level: 55 },
  ];

  const recentCertifications = [
    { name: 'CompTIA Security+', status: 'In Progress', progress: 75 },
    { name: 'OWASP Foundation', status: 'Completed', progress: 100 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <View style={styles.statusIndicator} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userTitle}>{userStats.rank}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#94a3b8" />
                <Text style={styles.locationText}>{userStats.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shareButton}>
              <Share2 size={20} color="#10b981" />
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.totalHours}</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.completedCourses}</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.certifications}</Text>
              <Text style={styles.statLabel}>Certs</Text>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <View style={styles.contactItem}>
              <Mail size={16} color="#94a3b8" />
              <Text style={styles.contactText}>john.doe@email.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Calendar size={16} color="#94a3b8" />
              <Text style={styles.contactText}>Joined {userStats.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{skill.level}%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillProgress, { width: `${skill.level}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Certifications Progress */}
        <View style={styles.certificationsSection}>
          <Text style={styles.sectionTitle}>Certification Progress</Text>
          {recentCertifications.map((cert, index) => (
            <View key={index} style={styles.certificationCard}>
              <View style={styles.certificationHeader}>
                <Award size={20} color="#f59e0b" />
                <View style={styles.certificationInfo}>
                  <Text style={styles.certificationName}>{cert.name}</Text>
                  <Text style={[
                    styles.certificationStatus,
                    { color: cert.status === 'Completed' ? '#10b981' : '#f59e0b' }
                  ]}>
                    {cert.status}
                  </Text>
                </View>
              </View>
              <View style={styles.certProgressBar}>
                <View style={[styles.certProgressFill, { width: `${cert.progress}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Social Links */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Connect</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Github size={20} color="#ffffff" />
              <Text style={styles.socialText}>GitHub</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Linkedin size={20} color="#0077b5" />
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Globe size={20} color="#10b981" />
              <Text style={styles.socialText}>Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Public Profile Toggle */}
        <View style={styles.publicProfileCard}>
          <Text style={styles.publicProfileTitle}>Public Profile</Text>
          <Text style={styles.publicProfileDescription}>
            Make your profile visible to recruiters and cybersecurity professionals
          </Text>
          <TouchableOpacity style={styles.publicProfileButton}>
            <Text style={styles.publicProfileButtonText}>Make Profile Public</Text>
          </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  settingsButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  profileCard: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#1e293b',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  userTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#10b98120',
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    marginTop: 4,
  },
  contactSection: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
  },
  skillsSection: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
  },
  skillLevel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  skillBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
  },
  skillProgress: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  certificationsSection: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  certificationCard: {
    marginBottom: 16,
  },
  certificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  certificationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  certificationName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  certificationStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  certProgressBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginTop: 8,
  },
  certProgressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 2,
  },
  socialSection: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  socialText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
  },
  publicProfileCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155',
  },
  publicProfileTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  publicProfileDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 16,
  },
  publicProfileButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  publicProfileButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});