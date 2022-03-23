import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
  <div>
    <b>Please Speak Any Word or Sentence</b>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p><textarea rows='10' cols ='100' value={transcript}></textarea></p>
  </div>
  )
}
export default Dictaphone;