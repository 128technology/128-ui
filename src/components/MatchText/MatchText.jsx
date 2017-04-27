import _ from 'lodash';
import React from 'react';

import './MatchText.scss';

const MatchText = ({ text, searchString }) => {
  text = _.toString(text);
  searchString = _.escapeRegExp(searchString);

  if (/\S+/.test(searchString)) {
    const searchExp = new RegExp(searchString, 'ig');
    const unmatchedPieces = text.split(searchExp);
    const matchedPieces = text.match(searchExp);

    const unmatched = _.map(unmatchedPieces, (str, i) => (
      <span className="ui-128__matched-text--unmatched" key={`unmatched/${str}/${i}`}>{str}</span>
    ));

    const matched = _.map(matchedPieces, (str, i) => (
      <span className="ui-128__match-text--match" key={`matched/${str}/${i}`}>{str}</span>
    ));

    const components = _.chain(unmatched).zip(matched).flatten().value();

    return (
      <span className="ui-128 ui-128__match-text">{components}</span>
    );
  }

  return (
    <span className="ui-128 ui-128__match-text">{text}</span>
  );
};

MatchText.propTypes = {
  /**
   * The text string to be searched.
   */
  text: React.PropTypes.string.isRequired,
  
  /**
   * The search string to search for.
   */
  searchString: React.PropTypes.string.isRequired
};

export default MatchText;
