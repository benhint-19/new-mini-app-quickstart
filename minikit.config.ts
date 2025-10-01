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
    header: "eyJmaWQiOjEzNTQ5NjgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgzNzFGOEJhMmNFMEI2OEJiOTU3QmVFMzg2NDgyNzU5MzVDODc1NTJDIn0",
    payload: "eyJkb21haW4iOiJuZXctbWluaS1hcHAtcXVpY2tzdGFydC1jb3JhbC52ZXJjZWwuYXBwIn0",
    signature: "MHg1ODE2NmNlODE1YzExM2YwNDlkZTAwODJlOWVjNzY0OTNlYzMwOGY2NDY4MTBiMThiYmMwYThjNDY5NGIxYzAwNTQ5MWM4ZDY4NzFiZTY5M2E1ODk2NzBjNjNkNDQ2MmQwZDgyZGYwNTkxOWYyNzgwYTYwZTgzY2RkM2MzYTRlNTFj"
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
    primaryCategory: "utility",
    tags: ["defi", "tokens", "base", "minting", "erc20"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Deploy your token in seconds",
    ogTitle: "Mint on Base",
    ogDescription: "Create and deploy your own ERC-20 token on Base network with ease",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

