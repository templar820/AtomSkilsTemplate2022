import * as React from 'react';

export interface GridProps {
    //Space Props
    /** Margin and padding props accept numbers 0-4 for values from the spacing scale [ 0, 8, 16, 32, 64 ].
     * Numbers greater than 4 will be used as pixel values. Negative values can be used for negative margins.
     * Strings can be passed for other CSS values, e.g. mx='auto' */
    /** Defines margin of component */
    margin?: number | string;
    /** Defines margin-top of component */
    marginTop?: number | string;
    /** Defines margin-right of component */
    marginRight?: number | string;
    /** Defines margin-bottom of component */
    marginBottom?: number | string;
    /** Defines margin-left of component */
    marginLeft?: number | string;
    /** Defines margin-x of component */
    marginX?: number | string;
    /** Defines margin-x of component */
    marginY?: number | string;
    /** Defines padding of component */
    padding?: number | string;
    /** Defines padding-top of component */
    paddingTop?: number | string;
    /** Defines paddingRight of component */
    paddingRight?: number | string;
    /** Defines padding-bottom of component */
    paddingBottom?: number | string;
    /** Defines padding-left of component */
    paddingLeft?: number | string;
    /** Defines padding-x of component */
    paddingX?: number | string;
    /** Defines padding-x of component */
    paddingY?: number | string;
    /** alias for margin */
    m?: number | string;
    /** alias for marginTop */
    mt?: number | string;
    /** alias for marginRight */
    mr?: number | string;
    /** alias for marginBottom */
    mb?: number | string;
    /** alias for marginLeft */
    ml?: number | string;
    /** alias for marginX */
    mx?: number | string;
    /** alias for marginY */
    my?: number | string;
    /** alias for padding */
    p?: number | string;
    /** alias for paddingTop */
    pt?: number | string;
    /** alias for paddingRight */
    pr?: number | string;
    /** alias for paddingBottom */
    pb?: number | string;
    /** alias for paddingLeft */
    pl?: number | string;
    /** alias for paddingX */
    px?: number | string;
    /** alias for paddingY */
    py?: number | string;
    //Layout Props
    /** Defines width of component */
    width?: number | string;
    /** Defines height of component */
    height?: number | string;
    /** Defines min-width of component */
    minWidth?: number | string;
    /** Defines max-width of component */
    maxWidth?: number | string;
    /** Defines min-height of component */
    minHeight?: number | string;
    /** Defines max-height of component */
    maxHeight?: number | string;
    //Typography Props
    /** Defines font-family of component */
    fontFamily?: string;
    /** Defines font-size of component */
    fontSize?: number | string;
    /** Defines font-weight of component */
    fontWeight?: number | string;
    /** Defines line-height of component */
    lineHeight?: number | string;
    /** Defines letter-spacing of component */
    letterSpacing?: number | string;
    /** Defines font-style of component */
    fontStyle?: string;
    /** Defines text-align of component */
    textAlign?: string;
    //Color Props
    /** Defines color of component */
    color?: string;
    /** Defines background-color of component */
    backgroundColor?: string;
    /** Defines opacity of component */
    opacity?: number;
    //Flexbox Props
    /** Defines align-items of component */
    alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    /** Defines align-content of component */
    alignContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
    /** Defines justify-items of component */
    justifyItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    /** Defines justify-content of component */
    justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between';
    /** Defines flex-wrap of component */
    flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
    /** Defines flex-direction of component */
    flexDirection?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
    /** Defines flex of component */
    flex?: number | string;
    /** Defines flex-grow of component */
    flexGrow?: number | string;
    /** Defines flex-shrink of component */
    flexShrink?: number | string;
    /** Defines flex-basis of component */
    flexBasis?: number | string;
    /** Defines justify-self of component */
    justifySelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    /** Defines align-self of component */
    alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    /** Defines order of component */
    order?: number;
}

declare const Flex: React.ComponentType<GridProps>;
declare const Box: React.ComponentType<GridProps>;

export { Flex, Box };
