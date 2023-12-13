import React from 'react';
import ReactSpinnersBeatLoader from 'react-spinners/BeatLoader';
import { useSelector } from 'react-redux';

const BeatLoader = () => {
  const beatLoader = useSelector((state) => state.Alerts.beatLoader);

  return beatLoader ? <ReactSpinnersBeatLoader color="#000068" loading={true} size={10} /> : null;
};

export default BeatLoader;
