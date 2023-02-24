import React, { useState } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";
import styled from 'styled-components';
import "./text-to-speech.css";

const Container = styled.div`
border-radius: 10px;
background-color: lightgrey;
padding: 20px;
margin: 0 20px 20px 20px;
max-width: 300px;
button {
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
  text-align: center;
  width: 100%;
}
h2 {
  margin-top: 0;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}
select,
textarea {
  font-size: 16px;
  margin-bottom: 12px;
  width: 100%;
}
textarea {
  border: 1px solid darkgrey;
  border-radius: 10px;
  padding: 8px;
  resize: none;
}
`;

const TextToSpeech = ({ text, setIntervention, setShowIntervention }) => {

  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // setIntervention("I'm done!");
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  const styleFlexRow = { display: 'flex', flexDirection: 'row' };
  const styleContainerRatePitch = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  };

  const closeModal = () => {
    setShowIntervention(false);
  }

  return (
    <div>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        onClick={closeModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <Container>
        <form>
          <h2>Intervention</h2>
          {!supported && (
            <p>
              Oh no, it looks like your browser doesn&#39;t support text-to-speech.
            </p>
          )}
          {supported && (
            <React.Fragment>
              <label htmlFor="voice">Voice</label>
              <select
                id="voice"
                name="voice"
                value={voiceIndex || ''}
                onChange={(event) => {
                  setVoiceIndex(event.target.value);
                }}
              >
                <option value="">Default</option>
                {voices.map((option, index) => (
                  <option key={option.voiceURI} value={index}>
                    {`${option.lang} - ${option.name}`}
                  </option>
                ))}
              </select>
              <div style={styleContainerRatePitch}>
                <div style={styleFlexRow}>
                  <label htmlFor="rate">Rate: </label>
                  <div className="rate-value">{rate}</div>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  defaultValue="1"
                  step="0.1"
                  id="rate"
                  onChange={(event) => {
                    setRate(event.target.value);
                  }}
                />
              </div>
              <div style={styleContainerRatePitch}>
                <div style={styleFlexRow}>
                  <label htmlFor="pitch">Pitch: </label>
                  <div className="pitch-value">{pitch}</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  defaultValue="1"
                  step="0.1"
                  id="pitch"
                  onChange={(event) => {
                    setPitch(event.target.value);
                  }}
                />
              </div>
              <label htmlFor="message">Intervention</label>
              <div>
                {text}
              </div>
              {speaking ? (
                <button type="button" onClick={cancel}>
                  Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => speak({ text, voice, rate, pitch })}
                >
                  Speak
                </button>
              )}
            </React.Fragment>
          )}
        </form>
      </Container>
    </div>
  );
};

export default TextToSpeech;