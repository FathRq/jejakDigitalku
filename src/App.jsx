import { SessionProvider, useSession } from "./context/SessionContext";
import { POST_TEST, PRE_TEST } from "./data/questions";
import { Finish } from "./screens/Finish";
import { Home } from "./screens/Home";
import { Landing } from "./screens/Landing";
import { ProfileSetup } from "./screens/ProfileSetup";
import { Report } from "./screens/Report";
import { ScenarioScreen } from "./screens/ScenarioScreen";
import { Survey } from "./screens/Survey";
import { TestScreen } from "./screens/TestScreen";

function ScreenRouter() {
  const { step, completePreTest, completePostTest, preTest } = useSession();

  switch (step) {
    case "pretest":
      return <TestScreen mode="pre" questions={PRE_TEST} onComplete={completePreTest} />;
    case "profile":
      return <ProfileSetup />;
    case "home":
      return <Home />;
    case "scenario":
      return <ScenarioScreen />;
    case "report":
      return <Report />;
    case "posttest":
      return (
        <TestScreen
          mode="post"
          questions={POST_TEST}
          onComplete={completePostTest}
          compareScore={preTest.score}
        />
      );
    case "survey":
      return <Survey />;
    case "finish":
      return <Finish />;
    case "landing":
    default:
      return <Landing />;
  }
}

export default function App() {
  return (
    <SessionProvider>
      <ScreenRouter />
    </SessionProvider>
  );
}
