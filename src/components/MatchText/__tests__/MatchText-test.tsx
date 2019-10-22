import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MatchText from '../MatchText';

describe('MatchText Component', () => {
  it('should render without error', () => {
    const matchText = shallow(<MatchText text="" searchString="" />);

    expect(matchText).to.have.lengthOf(1);
  });

  it('should accept numbers for text prop without error', () => {
    const matchText = shallow(<MatchText text={2} searchString="2" />);

    expect(matchText).to.have.lengthOf(1);
  });

  it('should render matched items', () => {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="search" />);

    const matched = matchText.find('.ui-128__match-text--matched');

    expect(matched.text()).to.equal('search');
  });

  it('should do a parial, case-insensitive match', () => {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="Sea" />);

    const matched = matchText.find('.ui-128__match-text--matched');

    expect(matched.text()).to.equal('sea');
  });

  it('should render unmatched items', () => {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="search" />);

    const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

    expect(unmatched).to.have.lengthOf(2);
  });

  it("shouldn't match or unmatch an empty search string", () => {
    const matchText = shallow(<MatchText text="A matchable search string..." searchString="" />);

    const matched = matchText.find('.ui-128__match-text--matched');
    const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

    expect(matched).to.have.lengthOf(0);
    expect(unmatched).to.have.lengthOf(0);
  });

  describe('Regex Matching', () => {
    it('should match on a regex', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="m." matchTypes={['Regex']} />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched.at(0).text()).to.equal('A ');
      expect(matched.at(0).text()).to.equal('ma');
      expect(unmatched.at(1).text()).to.equal('tchable search string...');
    });

    it('should handle an invalid regex', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="*" matchTypes={['Regex']} />
      );

      const component = matchText.find('.ui-128__match-text');

      expect(component.text()).to.equal('A matchable search string...');
    });

    it('should handle no match', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="m$" matchTypes={['Regex']} />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched).to.have.lengthOf(1);
      expect(matched).to.have.lengthOf(0);
    });
  });

  describe('Whole Word Matching', () => {
    it('should match on a whole word', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="search" matchTypes={['WholeWord']} />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched.at(0).text()).to.equal('A matchable ');
      expect(matched.at(0).text()).to.equal('search');
      expect(unmatched.at(1).text()).to.equal(' string...');
    });

    it('should not match if only a partial match', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="searc" matchTypes={['WholeWord']} />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched).to.have.lengthOf(1);
      expect(matched).to.have.lengthOf(0);
    });
  });

  describe('Case Sensitive Matching', () => {
    it('should match case sensitive', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="sea" matchTypes={['CaseSensitive']} />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched.at(0).text()).to.equal('A matchable ');
      expect(matched.at(0).text()).to.equal('sea');
      expect(unmatched.at(1).text()).to.equal('rch string...');
    });

    it('should not match if case does not match', () => {
      const matchText = shallow(
        <MatchText text="A matchable search string..." searchString="Searc" matchTypes={['CaseSensitive']} />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched).to.have.lengthOf(1);
      expect(matched).to.have.lengthOf(0);
    });
  });

  describe('Case Sensitive, Whole Word Matching', () => {
    it('should match case sensitive and whole word', () => {
      const matchText = shallow(
        <MatchText
          text="A matchable search string..."
          searchString="search"
          matchTypes={['CaseSensitive', 'WholeWord']}
        />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched.at(0).text()).to.equal('A matchable ');
      expect(matched.at(0).text()).to.equal('search');
      expect(unmatched.at(1).text()).to.equal(' string...');
    });

    it('should not match if case does not match', () => {
      const matchText = shallow(
        <MatchText
          text="A matchable search string..."
          searchString="Search"
          matchTypes={['CaseSensitive', 'WholeWord']}
        />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched).to.have.lengthOf(1);
      expect(matched).to.have.lengthOf(0);
    });

    it('should not match if partial word', () => {
      const matchText = shallow(
        <MatchText
          text="A matchable search string..."
          searchString="earch"
          matchTypes={['CaseSensitive', 'WholeWord']}
        />
      );

      const matched = matchText.find('.ui-128__match-text--matched');
      const unmatched = matchText.find({ className: 'ui-128__match-text--unmatched' });

      expect(unmatched).to.have.lengthOf(1);
      expect(matched).to.have.lengthOf(0);
    });
  });
});
