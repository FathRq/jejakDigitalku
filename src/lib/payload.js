import { getScenario } from "../data/scenarios";
import { averageScore, getBadge } from "./scoring";

export function buildPayload(session) {
  const badge = getBadge(session.scores);
  const scenarioChoices = Object.entries(session.results).map(
    ([scenarioId, result]) => {
      const scenario = getScenario(scenarioId);
      const choice = scenario?.keputusan?.pilihan?.find(
        (option) => option.id === result.choiceId,
      );
      return {
        scenarioId,
        tema: scenario?.tema ?? "",
        choiceId: result.choiceId,
        choiceText: choice?.teks ?? "",
        scores: result.after,
      };
    },
  );

  const durationSeconds = session.startedAt
    ? Math.max(
        0,
        Math.round(
          (new Date(session.completedAt ?? Date.now()).getTime() -
            new Date(session.startedAt).getTime()) /
            1000,
        ),
      )
    : 0;

  return {
    timestamp: new Date().toISOString(),
    participantCode: session.participantCode,
    profile: {
      username: session.profile?.username ?? "",
      avatarId: session.profile?.avatarId ?? "",
      isPublic: Boolean(session.profile?.isPublic),
    },
    preTestScore: session.preTest.score,
    postTestScore: session.postTest.score,
    finalScores: session.scores,
    averageScore: averageScore(session.scores),
    badge: badge.title,
    scenarioChoices,
    susAnswers: session.survey.sus,
    susTotalScore: session.susScore,
    satisfactionAnswers: session.survey.satisfaction,
    feedback: session.survey.feedback,
    durationSeconds,
    completedAt: session.completedAt,
  };
}
