import Calendar from "./components/Calendar";

const now = new Date();

function App() {
  return <Calendar date={now} />
}

export default App;
