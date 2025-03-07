import { Stylesheet } from 'cytoscape'
import styled, { DefaultTheme, css } from 'styled-components'

import TraderIcon from 'assets/img/Trader.svg'
import CowProtocolIcon from 'assets/img/CoW-protocol.svg'
import DexIcon from 'assets/img/Dex.svg'
import { MEDIA } from 'const'
import { Dropdown } from 'apps/explorer/components/common/Dropdown'
import { ArrowIconCSS } from 'components/icons/cssIcons'

export const FloatingWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.6rem;
  z-index: 1;
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.6rem;

  @media ${MEDIA.mediumDown} {
    flex-direction: column;
    top: 2.4rem;
    right: 0.8rem;
    gap: 0.6rem;
  }
`

const FloatingButton = css`
  cursor: pointer;
  color: ${({ theme }): string => theme.white};
  height: 3rem;
  border: 1px solid ${({ theme }): string => theme.borderPrimary};
  border-radius: 0.5rem;
  background: ${({ theme }): string => theme.bg2};

  &:hover {
    transition: all 0.2s ease-in-out;
    color: ${({ theme }): string => theme.textActive1};
  }
  @media ${MEDIA.mediumDown} {
    min-width: 3rem;
    span {
      display: none;
    }
  }
`
export const ResetButton = styled.button`
  ${FloatingButton}
  min-width: 6.586rem;
  transition: all 0.2s ease-in-out;
`
export const LayoutButton = styled.span`
  ${FloatingButton}
  display: flex;
  color: ${({ theme }): string => theme.textPrimary1};
  font-size: ${({ theme }): string => theme.fontSizeDefault};
  font-weight: normal;
  white-space: nowrap;
  align-items: center;
  padding: 0 0.6rem 0 0.6rem;
`

export const DropdownWrapper = styled(Dropdown)`
  &.dropdown-container {
    ${ArrowIconCSS}
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    & div:first-child {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      @media ${MEDIA.mediumDown} {
        justify-content: center;
      }
    }
    > .dropdown-options {
      min-width: 7rem;
    }
  }
`

export function STYLESHEET(theme: DefaultTheme): Stylesheet[] {
  return [
    {
      selector: 'node[label]',
      style: {
        label: 'data(label)',
        color: theme.textSecondary1,
        height: 50,
        width: 50,
        'background-color': theme.bg2,
      },
    },

    {
      selector: 'edge[label]',
      style: {
        label: 'data(label)',
        width: 2,
        'target-arrow-shape': 'triangle',
        'target-arrow-color': theme.grey,
        'curve-style': 'unbundled-bezier',
        color: theme.black,
        'line-color': theme.grey,
        'line-opacity': 0.8,
        'text-background-color': theme.labelTextOpen,
        'text-background-opacity': 1,
        'text-background-padding': '4px',
        'text-background-shape': 'roundrectangle',
        'font-size': '16px',
        'min-zoomed-font-size': 8,
      },
    },
    {
      selector: 'edge[label].many-bidirectional',
      style: {
        'curve-style': 'bezier',
        'font-size': '15px',
        'text-background-padding': '3px',
      },
    },
    {
      selector: 'edge[label].sell',
      style: {
        'line-color': theme.red1,
        'target-arrow-color': theme.red1,
      },
    },
    {
      selector: 'edge[label].buy',
      style: {
        'line-color': theme.green1,
        'target-arrow-color': theme.green1,
      },
    },
    {
      selector: 'edge[label].hover',
      style: {
        width: 3,
        'line-color': theme.orange1,
        'target-arrow-color': theme.orange1,
        'text-background-color': theme.orange,
        color: theme.white,
      },
    },
    {
      selector: 'node[type="trader"]',
      style: {
        'background-image': `url(${TraderIcon})`,
        'text-valign': 'bottom',
        'text-margin-y': 8,
      },
    },
    {
      selector: 'node[type="dex"]',
      style: {
        'background-image': `url(${DexIcon})`,
        'text-max-width': '5rem',
        'text-valign': 'bottom',
        'text-margin-y': 8,
      },
    },
    {
      selector: 'node[type="cowProtocol"]',
      style: {
        'background-image': `url(${CowProtocolIcon})`,
        height: '90',
        width: '90',
        'text-valign': 'bottom',
        'text-margin-y': 8,
      },
    },
    {
      selector: 'node[type="networkNode"]',
      style: {
        'border-style': 'dashed',
        'border-opacity': 0.8,
        opacity: 0.8,
      },
    },
  ]
}
