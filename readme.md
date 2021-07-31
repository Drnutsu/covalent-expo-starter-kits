# Expo Covalent Starter Kits

This project is starter kits and boilerplate for anyone whose want to create Dapps connection with React Native Cross platform technology.

The Starter kits already provide your the template and example code for

- Expo generated project, fully customization components and helpers provided by expo. with really great development experience, debugging by expo's tools.

> Expo ReactNative web version is not supported yet, due to react native walletConnect library lib isn't support for react native web version.

- Connect the wallet with `walletConnect` library with react native version.
- Covalent API Provider and Hooks for use it more easier.
  - class-A, class-B, Price feeder, and so on.
- React Query for better caching strategies, and fully customization ability.
- Fast & Fully customized Themes and and styles with react native tailwind.

You can use this boilderplate for kickstart your own project & do the Hackathon as well.

## Covalent APIs

with covalent api wrapper and hooks that I already prepare for you to reduce time for implement data feeder preparation.

All Covalent API Categories Implemented.

- Class A API : All smart contracts and tokens level information.
- Class B API : All Dapps level, DEX, Pool and so on.
- Pricing : All Tokens Price feed for oracle.

for more detail please check : [Covalent API's official document](https://www.covalenthq.com/docs/api) as the reference.

## Wallet Connection

We use react-native wallet connection library for connect user wallet on the mobile phone.
for more detail please check: [Wallet Connect React Native document](https://docs.walletconnect.org/quick-start/dapps/react-native) as the reference

## Local Run

- Install dependencies

  ```
  yarn install
  ```

- Set the value of the `COVALENT_ENDPOINT`, `COVALENT_API_KEY`, `DEFAULT_WALLET_ADDRESS` variable. please check the .env file format at [.env.example](https://github.com/Drnutsu/covalent-expo-starter-kits/blob/master/.env.example) file (don't forgot to rename `.env.example` to `.env`), then edit the required environment variable to be yours.

  - `COVALENT_ENDPOINT`: colvalent endpoint.
  - `COVALENT_API_KEY`: colvalent api keys.
  - `DEFAULT_WALLET_ADDRESS`: default wallet address, for faster development experience.

- Run the expo development tool kits with

  ```
  yarn start
  ```

  you can check more detail about expo development at [Expo Development Mode](https://docs.expo.dev/workflow/development-mode/)

  > For running the iOS,Android emulator version, please make sure that you already run the Android/iOS emulator first before click on "Run on Android" and "Run on iOS" on the expo console.

<br>

## Example

```javascript
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import BigNumber from 'bignumber.js'
import { Card } from 'react-native-paper'
import { getTokenBalancesData } from '../blockchain/class-a'
import { binanceChainId } from '../blockchain/constants'

const LeftContent = (url) => <Avatar.Image size={36} source={url} />

export default function () {
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
      {(data?.items || []).map((coin) => (
        <Card key={coin?.contract_ticker_symbol}>
          <Card.Title
            title={coin.contract_ticker_symbol}
            subtitle={coin.contract_name}
            left={(props) => <LeftContent url={coin.logo_url} {...props} />}
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
    </View>
  )
}
```
