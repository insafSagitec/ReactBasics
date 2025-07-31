import logo from './logo.svg';
import './App.css';
import BankHoliday from './Components/BankHoliday';
import CarManuFacturer from './Components/Car/CarManufacturer';
import BankHolidayAI from './Components/BankholidayAI';
import GuessTheNumber from './Components/GuessTheNumber';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <GuessTheNumber />
        {/* <BankHoliday /> */}
        {/* <BankHolidayAI /> */}
        {/* <CarManuFacturer /> */}
      </div>
    </div>
  );
}

export default App;
