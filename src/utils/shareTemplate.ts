export function generateLearningPost({
  userName,
  topics,
  period = 'today',
  achievements = [],
}: {
  userName: string;
  topics: string[];
  period?: string;
  achievements?: string[];
}) {
  const topicsList = topics.map(t => `• ${t}`).join('\n');
  const achievementsList = achievements.length
    ? `\n\nAchievements:\n${achievements.map(a => `🏆 ${a}`).join('\n')}`
    : '';

  return (
    `🚀 ${userName} - My Learning Journey Update (${period})\n\n` +
    `Today I focused on:\n${topicsList}` +
    achievementsList +
    `\n\n#LearninGo #LifelongLearning #MyLearningJourney`
  );
}
