import * as React from 'react';

export enum MatchTypes {
  CaseSensitive,
  WholeWord,
  Regex
}

export interface IMatchTextProps {
  text: string | number;
  searchString: string;
  matchTypes?: MatchTypes[]
}

declare class MatchText extends React.Component<IMatchTextProps, any> {}

export default MatchText;
