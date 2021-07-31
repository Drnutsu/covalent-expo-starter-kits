import React from 'react'
import { useQuery } from 'react-query'
import BigNumber from 'bignumber.js'
import { SafeAreaView, ScrollView } from 'react-native'
import t from 'tailwind-rn'
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator
} from 'react-native-paper'
import { useWalletConnect } from 'react-native-walletconnect'

import { View } from '../components/Themed'
import WalletConnection from '../components/WalletConnection'
import { getTokenBalancesData } from '../blockchain/class-a'
import { binanceChainId } from '../blockchain/constants'

const LeftContent = (url) => <Avatar.Image size={36} source={url} />

export default function BalanceScreen() {
  const { session } = useWalletConnect()
  const address = session.address || process.env.DEFAULT_WALLET_ADDRESS
  const { isLoading, data } = useQuery('balance', () =>
    getTokenBalancesData(
      { address, chain_id: binanceChainId },
      {
        key: process.env.COVALENT_API_KEY
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
            {(data?.items || []).map((coin) => (
              <Card key={coin?.contract_ticker_symbol} style={t('my-3')}>
                <Card.Title
                  title={coin.contract_ticker_symbol}
                  subtitle={coin.contract_name}
                  left={(props) => (
                    <LeftContent url={coin.logo_url} {...props} />
                  )}
                />
                <Card.Content>
                  <Title>Balance</Title>
                  <Paragraph>
                    {new BigNumber(coin.balance)
                      .shiftedBy(-coin?.contract_decimals || -8)
                      .toFormat(coin?.contract_decimals || 8)}
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
