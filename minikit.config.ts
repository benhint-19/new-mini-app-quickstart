const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  baseBuilder: {
    allowedAddresses: ["0x80362593e356acce02CA6BE5324449b3c677E66e"]
  },
  miniapp: {
    version: "1",
    name: "TokenMinter", 
    subtitle: "Mint Your Token on Base", 
    description: "Create and deploy your own ERC-20 token on Base network",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#0052FF",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "defi",
    tags: ["defi", "tokens", "base", "minting", "erc20"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Deploy your token in seconds",
    ogTitle: "TokenMinter - Mint Tokens on Base",
    ogDescription: "Create and deploy your own ERC-20 token on Base network with ease",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

