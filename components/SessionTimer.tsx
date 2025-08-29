import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Pause, Square, Clock } from 'lucide-react-native';

interface SessionTimerProps {
  onSessionComplete?: (duration: number) => void;
  targetDuration?: number; // in minutes
}

export default function SessionTimer({ onSessionComplete, targetDuration = 45 }: SessionTimerProps) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        const now = Date.now();
        
        // Check for inactivity (more than 2 minutes without interaction)
        if (now - lastActivity > 120000) {
          handleStop();
          return;
        }

        setTime(time => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, time, lastActivity]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setLastActivity(Date.now());
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    setLastActivity(Date.now());
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    if (onSessionComplete && time > 0) {
      onSessionComplete(Math.floor(time / 60));
    }
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = Math.min((time / 60) / targetDuration, 1);

  return (
    <View style={styles.container}>
      <View style={styles.timerDisplay}>
        <Clock size={24} color="#10b981" />
        <Text style={styles.timeText}>{formatTime(time)}</Text>
        <Text style={styles.targetText}>/ {targetDuration} min</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {Math.floor((time / 60) / targetDuration * 100)}% of target completed
        </Text>
      </View>

      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Play size={20} color="#ffffff" />
            <Text style={styles.startButtonText}>Start Session</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.activeControls}>
            <TouchableOpacity 
              style={[styles.controlButton, isPaused && styles.pausedButton]} 
              onPress={handlePause}
            >
              <Pause size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
              <Square size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isActive && (
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionInfoText}>
            {isPaused ? 'Session paused' : 'Session active'}
          </Text>
          <Text style={styles.warningText}>
            Session will auto-stop after 2 minutes of inactivity
          </Text>
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
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  timeText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  targetText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  progressContainer: {
    marginBottom: 20,
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
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    textAlign: 'center',
  },
  controls: {
    alignItems: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  activeControls: {
    flexDirection: 'row',
    gap: 16,
  },
  controlButton: {
    backgroundColor: '#f59e0b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pausedButton: {
    backgroundColor: '#10b981',
  },
  stopButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  sessionInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
  },
  warningText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
});