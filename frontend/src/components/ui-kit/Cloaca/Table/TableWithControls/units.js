import React, { useContext, useMemo } from 'react';
import styled from '@emotion/styled';
import Tabs from 'lib-ui/Tabs';
import Tab from 'lib-ui/Tabs/Tab';
import Cell from '../Cell';
import ColFilter from '../ColFilter';

import { ControlsContext } from 'lib-ui/Table/utils';
import Checkbox from 'lib-ui/Checkbox';
import { handleCheck, getTotalChecked } from './utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100%;
    ${({ wrapperStyle, ...restProps }) => applyEmotionStyle(wrapperStyle, restProps)};
`;

const TabsWrapper = styled.div`
    display: flex;
    align-items: center;
    ${({ tabsWrapperStyle, ...restProps }) => applyEmotionStyle(tabsWrapperStyle, restProps)};
`;

const BottomControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    margin-top: 20px;
    flex-direction: ${({ showPaginator }) => (!showPaginator ? 'row-reverse' : 'row')};
    ${({ controlsWrapperStyle, ...restProps }) => applyEmotionStyle(controlsWrapperStyle, restProps)};
`;

const StyledTabs = styled(Tabs)`
    margin-left: 15px;
    ${({ tabsStyle, ...restProps }) => applyEmotionStyle(tabsStyle, restProps)};
`;

const AbsolutePositioner = styled.span`
    display: block;
    position: relative;
    tr & > * {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const PerPageTabs = ({
    tabsCaption,
    onTabChange,
    tabsWrapperStyle,
    tabsStyle,
    tabs: propTabs,
    entriesOnDisplay: activeTab
}) => {
    const tabs = useMemo(() => {
        return Array.isArray(propTabs) ? Object.assign(...propTabs.map((tab) => ({ [tab]: tab }))) : propTabs;
    }, [propTabs]);
    return (
        <TabsWrapper {...{ tabsWrapperStyle }}>
            {tabsCaption}
            <StyledTabs {...{ activeTab, onTabChange, tabsStyle }}>
                {Object.keys(tabs).map((tab) => {
                    return <Tab {...{ tab: Number(tab), key: tab, children: tabs[tab] }} />;
                })}
            </StyledTabs>
        </TabsWrapper>
    );
};

const getCheckedStatus = (key, tableSection, allCheck, sumCell) => {
    if (sumCell) return getTotalChecked(allCheck);
    return allCheck[tableSection] ? allCheck[tableSection][key] : false;
};
const CellWithCheckbox = ({ originalRowKey, tableSection, isSelectable, sumCell, ...restProps }) => {
    const { allCheck, setAllCheck } = useContext(ControlsContext);
    const checked = useMemo(() => getCheckedStatus(originalRowKey, tableSection, allCheck, sumCell), [
        originalRowKey,
        tableSection,
        allCheck,
        sumCell
    ]);
    return (
        <Cell {...{ tableSection, ...restProps }} disableEllipsisOverflow={true}>
            <AbsolutePositioner>
                <Checkbox
                    disabled={!sumCell && isSelectable === false}
                    checked={checked}
                    onCheckChange={(event) =>
                        handleCheck({
                            allCheck,
                            setAllCheck,
                            tableSection,
                            originalRowKey,
                            sumCell,
                            event
                        })
                    }
                />
            </AbsolutePositioner>
        </Cell>
    );
};

const defaultLastCollCells = {
    thead: (
        <Cell key={'lastCell'} showInColFilter={false}>
            <AbsolutePositioner>
                <ColFilter />
            </AbsolutePositioner>
        </Cell>
    ),
    tbody: <Cell key={'lastCell'} />,
    tfoot: <Cell key={'lastCell'} />
};
const defaultFirstCollCells = {
    thead: <CellWithCheckbox key={'firstCell'} sumCell={true} showInColFilter={false} />,
    tbody: <CellWithCheckbox key={'firstCell'} />,
    tfoot: <Cell key={'firstCell'} />
};

export { Wrapper, BottomControlsWrapper, PerPageTabs, defaultFirstCollCells, defaultLastCollCells };
