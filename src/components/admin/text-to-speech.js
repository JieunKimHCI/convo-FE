import React from 'react';
import { useSpeechSynthesis } from "react-speech-kit";

/** A component that manages pitch, rate, and voiceIndex value collection for text-to-speech. */
const TextToSpeech = ({ text, pitch, setPitch, rate, setRate, voiceIndex, setVoiceIndex }) => {

  const onEnd = () => {
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

  return (
    <div>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <form>
        <h3>Voice Settings</h3>
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
            {speaking ? (
              <button type="button" onClick={cancel}>
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
                disabled={text === ""}
              >
                Speak
              </button>
            )}
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default TextToSpeech;