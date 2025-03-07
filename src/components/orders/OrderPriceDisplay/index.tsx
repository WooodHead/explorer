import React, { useState } from 'react'
import styled from 'styled-components'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import BigNumber from 'bignumber.js'

import { calculatePrice, formatSmart, invertPrice, safeTokenName, TokenErc20 } from '@gnosis.pm/dex-js'

import Icon from 'components/Icon'
import {
  HIGH_PRECISION_DECIMALS,
  HIGH_PRECISION_SMALL_LIMIT,
  NO_ADJUSTMENT_NEEDED_PRECISION,
} from 'apps/explorer/const'

const Wrapper = styled.span`
  display: flex;
  align-items: center;
`

export type Props = {
  buyAmount: string | BigNumber
  buyToken: TokenErc20
  sellAmount: string | BigNumber
  sellToken: TokenErc20
  isPriceInverted?: boolean
  showInvertButton?: boolean
}

export function OrderPriceDisplay(props: Props): JSX.Element {
  const {
    buyAmount,
    buyToken,
    sellAmount,
    sellToken,
    isPriceInverted: initialInvertedPrice = false,
    showInvertButton = false,
  } = props

  const [isPriceInverted, setIsPriceInverted] = useState(initialInvertedPrice)
  const invert = (): void => setIsPriceInverted((curr) => !curr)

  const calculatedPrice = calculatePrice({
    denominator: { amount: buyAmount, decimals: buyToken.decimals },
    numerator: { amount: sellAmount, decimals: sellToken.decimals },
  })
  const displayPrice = (isPriceInverted ? invertPrice(calculatedPrice) : calculatedPrice).toString(10)
  const formattedPrice = formatSmart({
    amount: displayPrice,
    precision: NO_ADJUSTMENT_NEEDED_PRECISION,
    smallLimit: HIGH_PRECISION_SMALL_LIMIT,
    decimals: HIGH_PRECISION_DECIMALS,
  })

  const buySymbol = safeTokenName(buyToken)
  const sellSymbol = safeTokenName(sellToken)

  const [baseSymbol, quoteSymbol] = isPriceInverted ? [sellSymbol, buySymbol] : [buySymbol, sellSymbol]

  return (
    <Wrapper>
      {formattedPrice} {quoteSymbol} for {baseSymbol}
      {showInvertButton && <Icon icon={faExchangeAlt} onClick={invert} />}
    </Wrapper>
  )
}
