import React from 'react'
import { View, Button, Text } from 'react-native'
import { add } from 'react-native-reanimated'
import { useWalletConnect } from 'react-native-walletconnect'
import t from 'tailwind-rn'

export default function WalletConnection() {
  const { createSession, killSession, session } = useWalletConnect()
  const hasWallet = !!session.length
  const address = session.address || process.env.DEFAULT_WALLET_ADDRESS
  return (
    <View style={t('items-center py-6')}>
      {!hasWallet && false ? (
        <Button title="Connect Wallet" onPress={createSession} />
      ) : (
        <>
          <View style={t('bg-blue-200 px-3 py-1 rounded-full')}>
            {address && (
              <Text style={t('text-blue-800 w-28 font-semibold')}>
                {process.env.DEFAULT_WALLET_ADDRESS?.substring(0, 7)}...
                {process.env.DEFAULT_WALLET_ADDRESS?.substring(
                  address.length - 4
                )}
              </Text>
            )}
          </View>
          <Button title="Disconnect" onPress={killSession} />
        </>
      )}
    </View>
  )
}
