import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MatchText from '../MatchText';

describe('MatchText Component', function() {
  it('should render without error', function() {
    const matchText = shallow(<MatchText text="" searchString="" />);

    expect(matchText).to.have.lengthOf(1);
  });

  it('should accept numbers for text prop without error', function() {
    const matchText = shallow(<MatchText text={2} searchString="2" />);

    expect(matchText).to.have.lengthOf(1);
  });

  it('should render matched items', function() {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="search" />);

    const matched = matchText.find({ className: 'ui-128__match-text--matched' });

    expect(matched.text()).to.equal('search');
  });

  it('should render unmatched items', function() {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="search" />);

    const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

    expect(unmatched).to.have.lengthOf(2);
  });

  it("shouldn't match or unmatch an empty search string", function() {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="" />);

    const matched = matchText.find({ className: 'ui-128__match-text--matched' });
    const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

    expect(matched).to.have.lengthOf(0);
    expect(unmatched).to.have.lengthOf(0);
  });
});
