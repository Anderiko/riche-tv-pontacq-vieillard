import '../style/App.css';
import {Map} from './Map';
import { Chat } from './Chat';

function App() {
  return (
    <div className="App">
      <div className="map-container">
        <Map position={[37.33462649252493, -122.00897348937217]}/>
      </div>
      <div className="chat-container">
        <Chat/>
      </div>
    </div>
  );
}

export default App;
