import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

// Components
import TabItem from 'components/common/Tabs/TabItem'
import TabContent from 'components/common/Tabs/TabContent'
export { default as TabIcon } from 'components/common/Tabs/TabIcon'

type TabId = number
export enum IndicatorTabSize {
  small = 0.1,
  big = 0.2,
}
export type TabBarExtraContent = React.ReactNode

export interface TabItemInterface {
  readonly tab: React.ReactNode
  readonly content: React.ReactNode
  readonly id: TabId
}

export interface TabTheme {
  readonly activeBg: string
  readonly activeBgAlt: string
  readonly inactiveBg: string
  readonly activeText: string
  readonly inactiveText: string
  readonly activeBorder: string
  readonly inactiveBorder: string
  readonly letterSpacing: string
  readonly fontWeight: string
  readonly fontSize: string
  readonly borderRadius: boolean
  readonly indicatorTabSize: IndicatorTabSize
}
export interface Props {
  readonly className?: string
  readonly tabItems: TabItemInterface[]
  readonly tabTheme: TabTheme
  readonly defaultTab?: TabId
  readonly extra?: TabBarExtraContent
  readonly extraPosition?: 'top' | 'bottom'
  onChange?: (activeId: TabId) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  > div {
    display: flex;
    flex-flow: row nowrap;
    padding: 0;
    justify-content: space-between;
    width: 100%;
  }
`

export const TabList = styled.div`
  /* stylelint-disable no-empty-block */
`

export const DEFAULT_TAB_THEME: TabTheme = {
  activeBg: 'var(--color-transparent)',
  activeBgAlt: 'initial',
  inactiveBg: 'var(--color-transparent)',
  activeText: 'var(--color-text-primary)',
  inactiveText: 'var(--color-text-secondary2)',
  activeBorder: 'var(--color-text-primary)',
  inactiveBorder: 'none',
  fontSize: 'var(--font-size-default)',
  fontWeight: 'var(--font-weight-normal)',
  letterSpacing: 'initial',
  borderRadius: false,
  indicatorTabSize: IndicatorTabSize.small,
}

interface ExtraContentProps {
  extra?: TabBarExtraContent
}

const ExtraContent = ({ extra }: ExtraContentProps): JSX.Element | null => {
  if (!extra) return null

  return <div className="tab-extra-content">{extra}</div>
}

const Tabs: React.FC<Props> = (props) => {
  const {
    tabTheme = DEFAULT_TAB_THEME,
    tabItems,
    defaultTab = 1,
    extra: tabBarExtraContent,
    extraPosition = 'top',
    onChange,
  } = props

  const [activeTab, setActiveTab] = useState(defaultTab)

  const onTabClick = useCallback(
    (key: TabId): void => {
      setActiveTab(key)
      onChange?.(key)
    },
    [onChange],
  )

  useEffect(() => {
    if (activeTab !== defaultTab) {
      onTabClick(defaultTab)
    }
  }, [activeTab, defaultTab, onTabClick])

  return (
    <Wrapper>
      <TabList role="tablist" className="tablist">
        {tabItems.map(({ tab, id }) => (
          <TabItem key={id} id={id} tab={tab} onTabClick={onTabClick} isActive={activeTab === id} tabTheme={tabTheme} />
        ))}
        {extraPosition === 'top' && <ExtraContent extra={tabBarExtraContent} />}
      </TabList>
      <TabContent tabItems={tabItems} activeTab={activeTab} />
      {extraPosition === 'bottom' && <ExtraContent extra={tabBarExtraContent} />}
    </Wrapper>
  )
}

export default Tabs

export function getTabTheme(tabStyles: Partial<TabTheme> = {}): TabTheme {
  return {
    ...DEFAULT_TAB_THEME,
    ...tabStyles,
  }
}
