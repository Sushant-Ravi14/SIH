import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header / Navigation area */}
        <View style={styles.header}>
          <Typography variant="h3" style={{ fontWeight: '800', letterSpacing: 2 }}>WIX.ED</Typography>
          <Typography variant="small" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>Menu</Typography>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Typography variant="hero" align="center" style={styles.heroTitle}>
            Elevate Your Business Strategy.
          </Typography>
          <Typography variant="bodyLarge" align="center" style={styles.heroSubtitle}>
            Expert consulting and comprehensive courses designed to take your firm to the next level.
          </Typography>
          <View style={styles.buttonGroup}>
            <Button title="View Courses" style={styles.mainButton} />
            <Button title="Our Services" variant="outline" style={styles.mainButton} />
          </View>
        </View>

        {/* Highlight Section (e.g. Services) */}
        <View style={styles.servicesSection}>
          <Typography variant="small" style={styles.sectionLabel}>WHAT WE DO</Typography>
          <Typography variant="h2" style={styles.sectionTitle}>
            Strategic insights for modern challenges.
          </Typography>
          
          <View style={styles.card}>
            <Typography variant="h3" style={styles.cardTitle}>Executive Coaching</Typography>
            <Typography variant="body">
              One-on-one sessions aimed at refining leadership skills and strategic vision.
            </Typography>
            <Button title="Learn More" variant="ghost" style={styles.ghostButton} textStyle={styles.ghostButtonText} />
          </View>

          <View style={styles.card}>
            <Typography variant="h3" style={styles.cardTitle}>Online Masterclasses</Typography>
            <Typography variant="body">
              Comprehensive modules covering management, finance, and operational efficiency.
            </Typography>
            <Button title="Learn More" variant="ghost" style={styles.ghostButton} textStyle={styles.ghostButtonText} />
          </View>
        </View>

        {/* Testimonial Section */}
        <View style={styles.testimonialSection}>
          <Typography variant="h2" align="center" style={styles.quoteMark}>"</Typography>
          <Typography variant="h3" align="center" style={styles.testimonialText}>
            The editorial approach to their consulting completely transformed how we communicate our brand value to stakeholders.
          </Typography>
          <Typography variant="body" align="center" style={styles.testimonialAuthor}>
            — Jane Doe, CEO of TechCorp
          </Typography>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Typography variant="h2" align="center" style={{ marginBottom: 24 }}>Ready to transform?</Typography>
          <Button title="Book a Consultation" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 80,
    alignItems: 'center',
  },
  heroTitle: {
    marginBottom: 24,
  },
  heroSubtitle: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
  },
  mainButton: {
    width: '100%',
  },
  servicesSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionLabel: {
    letterSpacing: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 40,
  },
  card: {
    backgroundColor: colors.background,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    marginBottom: 12,
  },
  ghostButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 24,
    alignItems: 'flex-start',
  },
  ghostButtonText: {
    textDecorationLine: 'underline',
  },
  testimonialSection: {
    paddingHorizontal: 32,
    paddingVertical: 80,
    backgroundColor: colors.background,
  },
  quoteMark: {
    fontSize: 60,
    color: colors.accent,
    marginBottom: -20,
  },
  testimonialText: {
    fontStyle: 'italic',
    marginBottom: 24,
    lineHeight: 32,
  },
  testimonialAuthor: {
    fontWeight: '600',
  },
  footerSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  }
});
