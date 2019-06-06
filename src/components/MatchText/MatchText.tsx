import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import './MatchText.scss';

const CASE_SENSITIVE = 'CaseSensitive';
const WHOLE_WORD = 'WholeWord';
const REGEX = 'Regex';

export interface IProps {
  text: string | number;
  searchString: string;
  matchTypes?: ReadonlyArray<'CaseSensitive' | 'WholeWord' | 'Regex'>;
}

/**
 * Performs a case-insensitive search against an input string and highlights
 * the matches.
 *
 * Matches can be selected with css using `.ui-128__match-text--match`.
 * "Unmatched" text can also be selected using `.ui-128__match-text--unmatched`.
 */
function MatchText({ text, searchString, matchTypes }: IProps) {
  const matchModesSet = new Set(matchTypes);
  const textString = _.toString(text);

  if (/\S+/.test(searchString)) {
    let searchExp;
    if (matchModesSet.has(REGEX)) {
      try {
        searchExp = new RegExp(searchString, 'g');
      } catch (e) {
        return <span className="ui-128 ui-128__match-text">{textString}</span>;
      }
    } else {
      const regexOptions = matchModesSet.has(CASE_SENSITIVE) ? 'g' : 'ig';
      const regexString = matchModesSet.has(WHOLE_WORD)
        ? `\\b${_.escapeRegExp(searchString)}\\b`
        : _.escapeRegExp(searchString);

      searchExp = new RegExp(regexString, regexOptions);
    }

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
  searchString: PropTypes.string.isRequired,
  /**
   * The modes to match on, array of 'CaseSensitive', 'Regex', and 'WholeWord'.
   */
  matchTypes: PropTypes.arrayOf(PropTypes.oneOf([REGEX, CASE_SENSITIVE, WHOLE_WORD]))
};

MatchText.defaultProps = {
  matchTypes: []
};

export default MatchText;
