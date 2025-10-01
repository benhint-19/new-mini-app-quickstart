# TokenMinter - Base Network Token Creation dApp

A Farcaster Mini App that allows users to create and deploy their own ERC-20 tokens on Base network in seconds.

## Features

- 🚀 **Quick Token Creation**: Deploy ERC-20 tokens with a simple form
- 🔗 **Base Network Integration**: Built specifically for Base mainnet
- 📱 **Farcaster Native**: Seamless experience within Farcaster
- 🎨 **Modern UI**: Beautiful, responsive interface
- ✅ **Transaction Tracking**: Real-time transaction status and BaseScan links
- 🔒 **Secure**: Uses industry-standard OpenZeppelin contracts

## Token Parameters

The app allows users to configure:
- **Token Name**: Full name of the token
- **Symbol**: Short ticker symbol (2-10 characters)
- **Total Supply**: Number of tokens to mint
- **Decimals**: Number of decimal places (0-18, 18 is standard)
- **Description**: Optional description for the token

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OnChainKit API key from [Coinbase Developer Portal](https://portal.cdp.coinbase.com/products/onchainkit)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd new-mini-app-quickstart
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_URL=http://localhost:3000
```

### Deploy TokenFactory Contract (Required)

Before users can mint tokens, you need to deploy the TokenFactory contract to Base network:

1. Install Hardhat dependencies:
```bash
npm install @nomicfoundation/hardhat-toolbox
```

2. Set up deployment environment:
```env
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here
```

3. Deploy to Base testnet (recommended first):
```bash
npm run deploy:base-testnet
```

4. Deploy to Base mainnet:
```bash
npm run deploy:base
```

5. Update the factory address in `app/page.tsx`:
```typescript
const factoryAddress = "YOUR_DEPLOYED_FACTORY_ADDRESS";
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Smart Contract Details

### TokenFactory Contract

The `TokenFactory` contract is deployed once and allows users to create new ERC-20 tokens:

- **Function**: `createToken(name, symbol, decimals, totalSupply)`
- **Gas Cost**: ~2-3M gas per token creation
- **Security**: Uses OpenZeppelin's audited ERC-20 implementation

### SimpleToken Contract

Each created token is an instance of `SimpleToken`:
- Standard ERC-20 functionality
- Configurable decimals
- Total supply minted to creator
- No additional features (keeping it simple and gas-efficient)

## Farcaster Integration

This mini app is configured for Farcaster with:
- Frame metadata for proper display
- User authentication via Farcaster
- Share functionality to promote tokens
- Mobile-optimized interface

## Network Configuration

- **Primary**: Base Mainnet (Chain ID: 8453)
- **Testnet**: Base Sepolia (Chain ID: 84532)
- **Explorer**: [BaseScan](https://basescan.org)

## Security Considerations

- Factory contract is upgradeable by owner
- Token creation requires gas fees
- Users retain full control of created tokens
- No admin functions on individual tokens

## Deployment Checklist

- [ ] Deploy TokenFactory to Base mainnet
- [ ] Update factory address in frontend
- [ ] Set up OnChainKit API key
- [ ] Configure environment variables
- [ ] Test token creation flow
- [ ] Submit to Farcaster Mini Apps directory

## Support

For issues or questions:
- Check the [OnChainKit documentation](https://docs.cdp.coinbase.com/onchainkit/)
- Review [Farcaster Mini Apps guide](https://miniapps.farcaster.xyz/)
- Visit [Base network docs](https://docs.base.org/)

## License

MIT License - see LICENSE file for details.