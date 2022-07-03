import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';

Flex.propTypes = {
    //Space Props
    /** Margin and padding props accept numbers 0-4 for values from the spacing scale [ 0, 8, 16, 32, 64 ].
     * Numbers greater than 4 will be used as pixel values. Negative values can be used for negative margins.
     * Strings can be passed for other CSS values, e.g. mx='auto' */
    /** Defines margin of component */
    margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines margin-top of component */
    marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines margin-right of component */
    marginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines margin-bottom of component */
    marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines margin-left of component */
    marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines margin-x of component */
    marginX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines margin-x of component */
    marginY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines padding of component */
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines padding-top of component */
    paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines paddingRight of component */
    paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines padding-bottom of component */
    paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines padding-left of component */
    paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines padding-x of component */
    paddingX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines padding-x of component */
    paddingY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for margin */
    m: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for marginTop */
    mt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for marginRight */
    mr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for marginBottom */
    mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for marginLeft */
    ml: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for marginX */
    mx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for marginY */
    my: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for padding */
    p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for paddingTop */
    pt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for paddingRight */
    pr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for paddingBottom */
    pb: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for paddingLeft */
    pl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for paddingX */
    px: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** alias for paddingY */
    py: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //Layout Props
    /** Defines width of component */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines height of component */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines min-width of component */
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines max-width of component */
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines min-height of component */
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines max-height of component */
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //Typography Props
    /** Defines font-family of component */
    fontFamily: PropTypes.string,
    /** Defines font-size of component */
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines font-weight of component */
    fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines line-height of component */
    lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines letter-spacing of component */
    letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Defines font-style of component */
    fontStyle: PropTypes.string,
    /** Defines text-align of component */
    textAlign: PropTypes.string,
    //Color Props
    /** Defines color of component */
    color: PropTypes.string,
    /** Defines background-color of component */
    backgroundColor: PropTypes.string,
    /** Defines opacity of component */
    opacity: PropTypes.number,
    //Flexbox Props
    /** Defines align-items of component */
    alignItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    /** Defines align-content of component */
    alignContent: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between', 'stretch']),
    /** Defines justify-items of component */
    justifyItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    /** Defines justify-content of component */
    justifyContent: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between']),
    /** Defines flex-wrap of component */
    flexWrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    /** Defines flex-direction of component */
    flexDirection: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    /** Defines flex of component */
    flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines flex-grow of component */
    flexGrow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines flex-shrink of component */
    flexShrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines flex-basis of component */
    flexBasis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines justify-self of component */
    justifySelf: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    /** Defines align-self of component */
    alignSelf: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    /** Defines order of component */
    order: PropTypes.number
};

Box.propTypes = {
    ...Flex.propTypes
};

export { Flex, Box };
