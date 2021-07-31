import * as React from 'react'
import { SafeAreaView, ScrollView, View, Text, Button } from 'react-native'
import BigNumber from 'bignumber.js'
import { useQuery } from 'react-query'
import {
  Avatar,
  ActivityIndicator,
  Card,
  Title,
  Paragraph
} from 'react-native-paper'
import { useWalletConnect } from 'react-native-walletconnect'

import t from 'tailwind-rn'

import WalletConnection from '../components/WalletConnection'
import { getPancakeSwapV2BalancesData } from '../blockchain/class-b'
import { binanceChainId } from '../blockchain/constants'

const LeftContent = ({ url, props }) => (
  <Avatar.Image size={36} source={url} {...props} />
)

export default function FarmScreen() {
  const { session } = useWalletConnect()
  const address = session.address || process.env.DEFAULT_WALLET_ADDRESS
  const { isLoading, error, data } = useQuery('farm', () =>
    getPancakeSwapV2BalancesData(
      { address, chain_id: binanceChainId },
      {
        key: process.env.COVALENT_API_KYC
      }
    )
  )

  return (
    <View>
      <SafeAreaView style={t('h-full flex justify-center')}>
        {isLoading ? (
          <ActivityIndicator size="large" animating={true} />
        ) : (
          <ScrollView style={t('px-6')}>
            <WalletConnection />
            {(data?.pancakeswap?.balances || []).map((coin, index) => (
              <Card key={index} style={t('my-3')}>
                <Card.Title
                  title={coin.contract_ticker_symbol}
                  subtitle={coin.contract_name}
                  left={(props) => (
                    <View style={t('flex flex-row justify-evenly')}>
                      <LeftContent url={coin?.token_0?.logo_url} {...props} />
                      <LeftContent url={coin?.token_1?.logo_url} {...props} />
                    </View>
                  )}
                />
                <Card.Content>
                  <Title>Pool : </Title>
                  <Paragraph>
                    {coin?.pool_token?.contract_ticker_symbol}
                  </Paragraph>
                </Card.Content>
                <Card.Content>
                  <Title>Total Supply</Title>
                  <Paragraph>
                    {new BigNumber(coin?.pool_token?.total_supply)
                      .shiftedBy(-coin?.pool_token?.contract_decimals || -8)
                      .toFormat(coin?.pool_token?.contract_decimals || 8)}
                  </Paragraph>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  )
}
