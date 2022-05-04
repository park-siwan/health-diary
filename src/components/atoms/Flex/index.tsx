import React from 'react';
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { colors } from '../../../constants/colors';

interface flexMapSig {
  [props: string]: string;
}
const flexMap: flexMapSig = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
  center: 'center',
};
interface FlexStyleProps {
  // [x: string]: string | object | undefined | number;
  ai: string;
  jc: string;
  type?: string;
  flex?: string;
  margin?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  width?: string;
  height?: string;
  column?: string;
  bgColor?: string;
  pd?: number;
  border?: string;
  br?: number;
  wrap?: boolean;
}
const FlexStyle = styled.div<FlexStyleProps>`
  display: flex;
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'nowrap')};
  justify-content: ${(props) => flexMap[props.jc] || 'center'};
  align-items: ${(props) => flexMap[props.ai] || 'center'};
  /* flex:1는 flex-grow: 1; flex-shrink: 1; flex-basis: 0%; 의 생략형*/

  flex: ${(props) => props.flex};
  margin-top: ${(props) => props.mt};
  margin-bottom: ${(props) => props.mb};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  margin: ${(props) => props.margin};
  padding-top: ${(props) => props.pt};
  padding-bottom: ${(props) => props.pb};
  padding-left: ${(props) => props.pl};
  padding-right: ${(props) => props.pr};

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  flex-direction: ${(props) => props.column};
  background-color: ${(props) => props.bgColor || ''};
  padding: ${(props) => props.pd + 'px' || ''};
  border: ${(props) => props.border || ''};
  border-radius: ${(props) => props.br + 'px' || ''};
`;

interface FlexProps {
  type?: [string?, string?];
  children?: any;
  jc?: string;
  ai?: string;
  flex?: string;
  margin?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  column?: boolean;
  value?: any;
  className?: string;
  style?: any;
  css?: SerializedStyles;
  bgColor?: string;
  pd?: number;
  border?: string;
  br?: number;
  wrap?: boolean;
}
export default function Flex({
  type,
  jc,
  ai,
  children,
  margin,
  mt = '0',
  mb = '0',
  ml = '0',
  mr = '0',
  pt = '0',
  pb = '0',
  pl = '0',
  pr = '0',
  flex,
  width,
  height,
  fullWidth,
  fullHeight,
  column,
  value,
  className = '',
  style,
  bgColor,
  pd,
  border,
  br, //border-radius
  wrap,
}: FlexProps) {
  //tag 선택
  let TagChange;
  if (value) {
    TagChange = FlexStyle.withComponent(value);
  } else {
    TagChange = FlexStyle.withComponent('div');
  }
  //width height 설정
  let widthSet;
  let heightSet;
  if (width) {
    widthSet = width + 'px';
  } else if (fullWidth) {
    widthSet = '100%';
  } else {
    widthSet = 'auto';
  }
  if (typeof height === 'number') {
    heightSet = height + 'px';
  } else if (fullHeight) {
    heightSet = '100%';
  } else if (typeof height === 'string') {
    heightSet = height;
  } else {
    heightSet = 'auto';
  }
  const spaceList = [mt, mr, mb, ml, pt, pr, pb, pl, margin];

  spaceList.forEach((item, index) =>
    typeof item === 'number'
      ? (spaceList[index] = item + 'px')
      : (spaceList[index] = item)
  );

  return (
    <TagChange
      className={`FlexComponent ${className}`}
      jc={jc || 'center'}
      ai={ai || 'center'}
      margin={spaceList[8]}
      mt={spaceList[0]}
      mr={spaceList[1]}
      mb={spaceList[2]}
      ml={spaceList[3]}
      pt={spaceList[4]}
      pb={spaceList[5]}
      pl={spaceList[6]}
      pr={spaceList[7]}
      width={widthSet}
      height={heightSet}
      flex={flex}
      column={(column && 'column') || 'row'}
      style={style}
      bgColor={bgColor || ''}
      pd={pd}
      border={border}
      br={br}
      wrap={wrap}
    >
      {children}
    </TagChange>
  );
}
