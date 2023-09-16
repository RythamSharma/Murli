import logo from './logo.svg';
import './App.css';
import LetterForm from './components/LetterForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>MURLI :- The Web App To Connect With Lord Krishna</h1>
    </header>
      <main className="App-main">
        {/* Render the LetterForm and LetterDisplay components here */}
        <LetterForm />
       
      </main>
      <footer className="App-footer">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>

    </div>
  );
}

export default App;
