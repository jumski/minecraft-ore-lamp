import './App.css';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState({ r: 255, g: 0, b: 0 });

  function onPickedColor(color) {
    setColor(color.rgb);
    console.log(color.rgb);
  }

  return (
    <div className="App">
      <SketchPicker color={color} onChange={onPickedColor}/>
    </div>
  );
}

export default App;
