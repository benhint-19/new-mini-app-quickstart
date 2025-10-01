"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { minikitConfig } from "../minikit.config";
import styles from "./page.module.css";

interface TokenParams {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  description: string;
}

// TokenFactory Contract ABI
const TOKEN_FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "symbol", "type": "string"},
      {"internalType": "uint8", "name": "decimals", "type": "uint8"},
      {"internalType": "uint256", "name": "totalSupply", "type": "uint256"}
    ],
    "name": "createToken",
    "outputs": [{"internalType": "address", "name": "tokenAddress", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": false, "internalType": "string", "name": "symbol", "type": "string"},
      {"indexed": false, "internalType": "uint8", "name": "decimals", "type": "uint8"},
      {"indexed": false, "internalType": "uint256", "name": "totalSupply", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "creator", "type": "address"}
    ],
    "name": "TokenCreated",
    "type": "event"
  }
] as const;

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  const { isConnected } = useAccount();
  const [tokenParams, setTokenParams] = useState<TokenParams>({
    name: "",
    symbol: "",
    decimals: 18,
    totalSupply: "",
    description: ""
  });
  const [error, setError] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const { data: hash, writeContract, isPending, error: contractError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const validateTokenParams = (params: TokenParams): string | null => {
    if (!params.name.trim()) return "Token name is required";
    if (!params.symbol.trim()) return "Token symbol is required";
    if (params.symbol.length < 2 || params.symbol.length > 10) return "Symbol must be 2-10 characters";
    if (!params.totalSupply || params.totalSupply === "0") return "Total supply must be greater than 0";
    if (params.decimals < 0 || params.decimals > 18) return "Decimals must be between 0 and 18";
    
    try {
      parseEther(params.totalSupply);
    } catch {
      return "Invalid total supply format";
    }
    
    return null;
  };

  const handleMintToken = async () => {
    setError("");
    setIsMinting(true);

    if (!isConnected) {
      setError("Please connect your wallet first");
      setIsMinting(false);
      return;
    }

    const validationError = validateTokenParams(tokenParams);
    if (validationError) {
      setError(validationError);
      setIsMinting(false);
      return;
    }

    try {
      // For this demo, we'll use a simple factory contract address
      // In production, you'd deploy your own factory contract
      const factoryAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual factory
      
      await writeContract({
        address: factoryAddress as `0x${string}`,
        abi: TOKEN_FACTORY_ABI,
        functionName: "createToken",
        args: [
          tokenParams.name,
          tokenParams.symbol,
          tokenParams.decimals,
          parseEther(tokenParams.totalSupply)
        ],
      });
    } catch (err) {
      setError(`Failed to mint token: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (isConfirmed && hash) {
      setIsMinting(false);
      // Navigate to success page with token details
      router.push(`/success?address=${hash}&name=${encodeURIComponent(tokenParams.name)}&symbol=${encodeURIComponent(tokenParams.symbol)}`);
    }
  }, [isConfirmed, hash, tokenParams.name, tokenParams.symbol]);

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>
      
      <div className={styles.content}>
        <div className={styles.tokenForm}>
          <h1 className={styles.title}>🚀 {minikitConfig.miniapp.name}</h1>
          
          <p className={styles.subtitle}>
            Create your own token on Base network in seconds!
          </p>

          {!isConnected ? (
            <div className={styles.connectWallet}>
              <p>Please connect your wallet to mint tokens</p>
              <p className={styles.networkInfo}>Network: Base Mainnet</p>
            </div>
          ) : (
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="tokenName">Token Name</label>
                <input
                  id="tokenName"
                  type="text"
                  placeholder="My Awesome Token"
                  value={tokenParams.name}
                  onChange={(e) => setTokenParams(prev => ({ ...prev, name: e.target.value }))}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="tokenSymbol">Symbol</label>
                <input
                  id="tokenSymbol"
                  type="text"
                  placeholder="MAT"
                  value={tokenParams.symbol}
                  onChange={(e) => setTokenParams(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                  className={styles.input}
                  maxLength={10}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="totalSupply">Total Supply</label>
                <input
                  id="totalSupply"
                  type="text"
                  placeholder="1000000"
                  value={tokenParams.totalSupply}
                  onChange={(e) => setTokenParams(prev => ({ ...prev, totalSupply: e.target.value }))}
                  className={styles.input}
                />
                <small className={styles.inputHint}>Enter the total number of tokens to mint</small>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="decimals">Decimals</label>
                <select
                  id="decimals"
                  value={tokenParams.decimals}
                  onChange={(e) => setTokenParams(prev => ({ ...prev, decimals: parseInt(e.target.value) }))}
                  className={styles.select}
                >
                  {Array.from({ length: 19 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <small className={styles.inputHint}>Number of decimal places (18 is standard)</small>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  placeholder="Describe your token..."
                  value={tokenParams.description}
                  onChange={(e) => setTokenParams(prev => ({ ...prev, description: e.target.value }))}
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}
              
              {contractError && <p className={styles.error}>Contract Error: {contractError.message}</p>}

              <button 
                type="button" 
                onClick={handleMintToken}
                className={styles.mintButton}
                disabled={isPending || isConfirming || isMinting}
              >
                {isPending ? "Preparing Transaction..." : 
                 isConfirming ? "Confirming Transaction..." :
                 isMinting ? "Minting Token..." : 
                 "Mint Token"}
              </button>

              {hash && (
                <div className={styles.transactionInfo}>
                  <p>Transaction Hash: {hash.slice(0, 10)}...{hash.slice(-8)}</p>
                  <a 
                    href={`https://basescan.org/tx/${hash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.explorerLink}
                  >
                    View on BaseScan
                  </a>
                </div>
              )}
            </form>
          )}

          <div className={styles.tokenPreview}>
            <h3>Token Preview</h3>
            {tokenParams.name && tokenParams.symbol && (
              <div className={styles.previewCard}>
                <div className={styles.tokenInfo}>
                  <span className={styles.tokenName}>{tokenParams.name}</span>
                  <span className={styles.tokenSymbol}>{tokenParams.symbol}</span>
                </div>
                <div className={styles.tokenDetails}>
                  <p>Supply: {tokenParams.totalSupply || "0"} tokens</p>
                  <p>Decimals: {tokenParams.decimals}</p>
                  {tokenParams.description && <p>Description: {tokenParams.description}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
