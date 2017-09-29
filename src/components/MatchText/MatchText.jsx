import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './MatchText.scss';

/**
 * Performs a case-insensitive search against an input string and highlights
 * the matches.
 *
 * Matches can be selected with css using `.ui-128__match-text--match`.
 * "Unmatched" text can also be selected using `.ui-128__match-text--unmatched`.
 */
function MatchText({ text, searchString }) {
  const textString = _.toString(text);

  if (/\S+/.test(searchString)) {
    const searchExp = new RegExp(_.escapeRegExp(searchString), 'ig');
    const unmatchedPieces = textString.split(searchExp);
    const matchedPieces = textString.match(searchExp);

    const unmatched = _.map(unmatchedPieces, (str, i) => (
      <span className="ui-128__match-text--unmatched" key={`unmatched/${str}/${i}`}>
        {str}
      </span>
    ));

    const matched = _.map(matchedPieces, (str, i) => (
      <span className="ui-128__match-text--matched" key={`matched/${str}/${i}`}>
        {str}
      </span>
    ));

    const components = _.chain(unmatched)
      .zip(matched)
      .flatten()
      .value();

    return <span className="ui-128 ui-128__match-text">{components}</span>;
  }

  return <span className="ui-128 ui-128__match-text">{textString}</span>;
}

MatchText.propTypes = {
  /**
   * The text string to be searched.
   */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * The search string to search for.
   */
  searchString: PropTypes.string.isRequired
};

export default MatchText;
