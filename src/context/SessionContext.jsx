/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { INITIAL_SCORES, applyChoice } from "../lib/scoring";
import { clearSession, loadSession, saveSession } from "../lib/storage";

const SessionContext = createContext(null);

const initialState = {
  version: 1,
  step: "landing",
  participantCode: "",
  profile: null,
  scores: { ...INITIAL_SCORES },
  preTest: { answers: [], correct: null, total: 5, score: null },
  postTest: { answers: [], correct: null, total: 5, score: null },
  results: {},
  activeScenarioId: null,
  scenarioRun: null,
  survey: { sus: [], satisfaction: [], feedback: "" },
  susScore: null,
  submitStatus: null,
  startedAt: null,
  completedAt: null,
};

function resolveStep(state) {
  if (state.step === "landing") return "landing";
  if (!state.participantCode) return "landing";
  if (state.preTest.score == null && !["pretest", "profile"].includes(state.step)) {
    return "pretest";
  }
  if (!state.profile && !["pretest", "profile"].includes(state.step)) {
    return "profile";
  }
  if (state.step === "scenario" && !state.scenarioRun) return "home";
  if (["report", "posttest"].includes(state.step) && !Object.keys(state.results).length) {
    return "home";
  }
  if (state.step === "finish" && !state.completedAt) return "survey";
  return state.step;
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      const merged = { ...initialState, ...action.payload };
      return { ...merged, step: resolveStep(merged) };
    }
    case "SET_CODE":
      return { ...state, participantCode: action.code };
    case "START":
      return {
        ...state,
        participantCode: action.code,
        startedAt: state.startedAt ?? new Date().toISOString(),
        step: "pretest",
      };
    case "PRE_TEST_DONE":
      return {
        ...state,
        preTest: {
          ...state.preTest,
          answers: action.answers,
          correct: action.correct,
          total: action.total,
          score: action.score,
        },
        step: "profile",
      };
    case "PROFILE_DONE":
      return { ...state, profile: action.profile, step: "home" };
    case "GO":
      return { ...state, step: action.step };
    case "OPEN_SCENARIO": {
      const existing =
        state.scenarioRun?.scenarioId === action.id ? state.scenarioRun : null;

      return {
        ...state,
        activeScenarioId: action.id,
        scenarioRun:
          existing ??
          {
            scenarioId: action.id,
            phase: "story",
            index: 0,
            choiceId: null,
            before: { ...state.scores },
            after: null,
            delta: null,
          },
        step: "scenario",
      };
    }
    case "SAVE_RUN":
      return { ...state, scenarioRun: action.run };
    case "CHOOSE": {
      const { choiceId, delta } = action;
      const after = applyChoice(state.scores, delta, Boolean(state.profile?.isPublic));
      return {
        ...state,
        scores: after,
        scenarioRun: {
          ...state.scenarioRun,
          phase: "consequence",
          choiceId,
          after,
        },
      };
    }
    case "FINISH_SCENARIO": {
      const run = state.scenarioRun;
      const scenarioId = action.id ?? run?.scenarioId;
      if (!scenarioId) return { ...state, step: "home", scenarioRun: null };

      return {
        ...state,
        results: {
          ...state.results,
          [scenarioId]: {
            choiceId: run?.choiceId,
            before: run?.before ?? state.scores,
            after: state.scores,
            completedAt: new Date().toISOString(),
          },
        },
        activeScenarioId: null,
        scenarioRun: null,
        step: "home",
      };
    }
    case "CLOSE_SCENARIO":
      // Keep scenarioRun so the participant can resume from the home screen.
      return {
        ...state,
        activeScenarioId: null,
        step: "home",
      };
    case "POST_TEST_DONE":
      return {
        ...state,
        postTest: {
          ...state.postTest,
          answers: action.answers,
          correct: action.correct,
          total: action.total,
          score: action.score,
        },
        step: "survey",
      };
    case "SET_SURVEY":
      return { ...state, survey: action.survey };
    case "FINISH":
      return {
        ...state,
        susScore: action.susScore,
        submitStatus: action.submitStatus,
        completedAt: action.completedAt ?? new Date().toISOString(),
        step: "finish",
      };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export function SessionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (fallback) => {
    const stored = loadSession();
    if (!stored) return fallback;
    const merged = { ...fallback, ...stored };
    return { ...merged, step: resolveStep(merged) };
  });

  useEffect(() => {
    saveSession(state);
  }, [state]);

  const startSession = useCallback(
    (code) => dispatch({ type: "START", code: code.trim().toUpperCase() }),
    [],
  );

  const completePreTest = useCallback((result) => {
    dispatch({ type: "PRE_TEST_DONE", ...result });
  }, []);

  const saveProfile = useCallback((profile) => {
    dispatch({ type: "PROFILE_DONE", profile });
  }, []);

  const openScenario = useCallback((id) => {
    dispatch({ type: "OPEN_SCENARIO", id });
  }, []);

  const saveRun = useCallback((run) => {
    dispatch({ type: "SAVE_RUN", run });
  }, []);

  const chooseOption = useCallback((choiceId, delta) => {
    dispatch({ type: "CHOOSE", choiceId, delta });
  }, []);

  const finishScenario = useCallback((id) => {
    dispatch({ type: "FINISH_SCENARIO", id });
  }, []);

  const closeScenario = useCallback(() => {
    dispatch({ type: "CLOSE_SCENARIO" });
  }, []);

  const completePostTest = useCallback((result) => {
    dispatch({ type: "POST_TEST_DONE", ...result });
  }, []);

  const saveSurvey = useCallback((survey) => {
    dispatch({ type: "SET_SURVEY", survey });
  }, []);

  const go = useCallback((step) => {
    dispatch({ type: "GO", step });
  }, []);

  const finish = useCallback((payload) => {
    dispatch({ type: "FINISH", ...payload });
  }, []);

  const reset = useCallback(() => {
    clearSession();
    dispatch({ type: "RESET" });
  }, []);

  const completedScenarioIds = useMemo(
    () => Object.keys(state.results),
    [state.results],
  );

  const value = useMemo(
    () => ({
      ...state,
      completedScenarioIds,
      completedCount: completedScenarioIds.length,
      allScenariosDone: completedScenarioIds.length >= 3,
      startSession,
      completePreTest,
      saveProfile,
      openScenario,
      saveRun,
      chooseOption,
      finishScenario,
      closeScenario,
      completePostTest,
      saveSurvey,
      go,
      finish,
      reset,
    }),
    [
      state,
      completedScenarioIds,
      startSession,
      completePreTest,
      saveProfile,
      openScenario,
      saveRun,
      chooseOption,
      finishScenario,
      closeScenario,
      completePostTest,
      saveSurvey,
      go,
      finish,
      reset,
    ],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return context;
}
