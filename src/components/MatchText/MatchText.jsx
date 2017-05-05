import _ from 'lodash';
import React from 'react';

import './MatchText.scss';

/**
 * Performs a case-insensitive search against an input string and highlights
 * the matches.
 * 
 * Matches can be selected with css using `.ui-128__match-text--match`.
 * "Unmatched" text can also be selected using `.ui-128__match-text--unmatched`.
 */
const MatchText = ({ text, searchString }) => {
  const textString = _.toString(text);

  if (/\S+/.test(searchString)) {
    const searchExp = new RegExp(_.escapeRegExp(searchString), 'ig');
    const unmatchedPieces = textString.split(searchExp);
    const matchedPieces = textString.match(searchExp);

    const unmatched = _.map(unmatchedPieces, (str, i) => (
      <span className="ui-128__match-text--unmatched" key={`unmatched/${str}/${i}`}>{str}</span>
    ));

    const matched = _.map(matchedPieces, (str, i) => (
      <span className="ui-128__match-text--matched" key={`matched/${str}/${i}`}>{str}</span>
    ));

    const components = _.chain(unmatched).zip(matched).flatten().value();

    return (
      <span className="ui-128 ui-128__match-text">{components}</span>
    );
  }

  return (
    <span className="ui-128 ui-128__match-text">{textString}</span>
  );
};

MatchText.propTypes = {
  /**
   * The text string to be searched.
   */
  text: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,
  
  /**
   * The search string to search for.
   */
  searchString: React.PropTypes.string.isRequired
};

export default MatchText;
