import '../style/App.css';
import {Map} from './Map';
import { Chat } from './Chat';

function App() {
  return (
    <div className="App">
      <div className="map-container">
        <Map labels={[
            { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
            { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
            { name: 'New York', lat: 40.7128, lng: -74.0060 },
        ]}/>
      </div>
      <div className="chat-container">
        <Chat/>
      </div>
    </div>
  );
}

export default App;
