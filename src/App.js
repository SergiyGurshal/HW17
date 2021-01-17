import './App.css'
import Timer from './Timer'

function App() {
  return (
    <div className="App">
      <Timer
        time="10"
        autostart={true}
        onTick={(time) => console.log('Залишилось часу: ' + time)}
        step="2"
        onTimeEnd={() => console.log('Час вийшов!')}
        onTimeStart={(timeLeft) => console.log('Таймер запущено!')}
        onTimePause={(timeLeft) => console.log('Таймер на паузі!')}
      />
    </div>
  )
}

export default App
