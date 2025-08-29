import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, CreditCard as Edit3, Eye, Download, Plus, Award, Briefcase, GraduationCap, CheckCircle } from 'lucide-react-native';

interface CVSection {
  id: string;
  title: string;
  icon: any;
  completed: boolean;
}

export default function CVBuilder() {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isEditing, setIsEditing] = useState(false);

  const cvSections: CVSection[] = [
    { id: 'personal', title: 'Personal Info', icon: FileText, completed: true },
    { id: 'experience', title: 'Experience', icon: Briefcase, completed: false },
    { id: 'education', title: 'Education', icon: GraduationCap, completed: true },
    { id: 'certifications', title: 'Certifications', icon: Award, completed: false },
  ];

  const renderPersonalInfo = () => (
    <View style={styles.sectionContent}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          value="John Doe"
          editable={isEditing}
          placeholderTextColor="#64748b"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Professional Title</Text>
        <TextInput
          style={styles.input}
          value="Cybersecurity Analyst"
          editable={isEditing}
          placeholderTextColor="#64748b"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value="john.doe@email.com"
          editable={isEditing}
          placeholderTextColor="#64748b"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Professional Summary</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value="Passionate cybersecurity professional with hands-on experience in threat analysis, vulnerability assessment, and security frameworks. Currently advancing skills through OWASP Top 10 and practical penetration testing."
          editable={isEditing}
          multiline
          numberOfLines={4}
          placeholderTextColor="#64748b"
        />
      </View>
    </View>
  );

  const renderExperience = () => (
    <View style={styles.sectionContent}>
      <View style={styles.experienceItem}>
        <Text style={styles.jobTitle}>Junior Security Analyst</Text>
        <Text style={styles.company}>TechCorp Solutions</Text>
        <Text style={styles.duration}>Jan 2024 - Present</Text>
        <Text style={styles.jobDescription}>
          • Monitored security events using SIEM tools{'\n'}
          • Conducted vulnerability assessments{'\n'}
          • Assisted in incident response procedures
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Plus size={20} color="#10b981" />
        <Text style={styles.addButtonText}>Add Experience</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCertifications = () => (
    <View style={styles.sectionContent}>
      <View style={styles.certificationItem}>
        <Text style={styles.certTitle}>CompTIA Security+</Text>
        <Text style={styles.certStatus}>In Progress</Text>
        <Text style={styles.certDate}>Expected: March 2024</Text>
      </View>
      <View style={styles.certificationItem}>
        <Text style={styles.certTitle}>OWASP Top 10 Certification</Text>
        <Text style={styles.certStatus}>Planned</Text>
        <Text style={styles.certDate}>Target: April 2024</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Plus size={20} color="#10b981" />
        <Text style={styles.addButtonText}>Add Certification</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'experience':
        return renderExperience();
      case 'certifications':
        return renderCertifications();
      default:
        return <Text style={styles.placeholderText}>Section content coming soon...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>CV Builder</Text>
          <Text style={styles.subtitle}>Build your professional profile</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={20} color={isEditing ? "#10b981" : "#94a3b8"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Eye size={20} color="#94a3b8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CV Sections Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sectionsNav}>
        {cvSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionTab,
              activeSection === section.id && styles.activeSectionTab
            ]}
            onPress={() => setActiveSection(section.id)}
          >
            <section.icon 
              size={18} 
              color={activeSection === section.id ? "#ffffff" : "#94a3b8"} 
            />
            <Text style={[
              styles.sectionTabText,
              activeSection === section.id && styles.activeSectionTabText
            ]}>
              {section.title}
            </Text>
            {section.completed && (
              <CheckCircle size={14} color="#10b981" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderSectionContent()}
      </ScrollView>

      {/* CV Preview Card */}
      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>CV Completion</Text>
        <View style={styles.completionBar}>
          <View style={[styles.completionFill, { width: '60%' }]} />
        </View>
        <Text style={styles.completionText}>60% complete • 2 of 4 sections done</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionsNav: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 8,
  },
  activeSectionTab: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  sectionTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
  },
  activeSectionTabText: {
    color: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionContent: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  experienceItem: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  company: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
    marginTop: 4,
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
  jobDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#cbd5e1',
    marginTop: 12,
    lineHeight: 20,
  },
  certificationItem: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  certTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  certStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#f59e0b',
    marginTop: 4,
  },
  certDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10b981',
    borderStyle: 'dashed',
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },
  previewCard: {
    backgroundColor: '#1e293b',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 12,
  },
  completionBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    marginBottom: 8,
  },
  completionFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  completionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
  },
});