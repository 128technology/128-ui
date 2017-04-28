import _ from 'lodash';
import React from 'react';

import './MatchText.scss';

const MatchText = ({ text, searchString }) => {
  const textString = _.toString(text);

  if (/\S+/.test(searchString)) {
    const searchExp = new RegExp(_.escapeRegExp(searchString), 'ig');
    const unmatchedPieces = textString.split(searchExp);
    const matchedPieces = textString.match(searchExp);

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
    <span className="ui-128 ui-128__match-text">{textString}</span>
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
