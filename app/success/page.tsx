"use client";

import { useComposeCast } from '@coinbase/onchainkit/minikit';
import { useSearchParams } from 'next/navigation';
import { minikitConfig } from "../../minikit.config";
import styles from "./page.module.css";

export default function Success() {
  const searchParams = useSearchParams();
  const { composeCastAsync } = useComposeCast();
  
  const tokenAddress = searchParams.get('address');
  const tokenName = searchParams.get('name');
  const tokenSymbol = searchParams.get('symbol');
  
  const handleShare = async () => {
    try {
      const text = tokenAddress 
        ? `🚀 I just minted my token "${tokenName}" (${tokenSymbol}) on Base network! Check it out on TokenMinter: ${process.env.NEXT_PUBLIC_URL}`
        : `🎉 Successfully used ${minikitConfig.miniapp.name}! ${process.env.NEXT_PUBLIC_URL}`;
      
      const result = await composeCastAsync({
        text: text,
        embeds: [process.env.NEXT_PUBLIC_URL || ""]
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
      } else {
        console.log("User cancelled the cast");
      }
    } catch (error) {
      console.error("Error sharing cast:", error);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>
      
      <div className={styles.content}>
        <div className={styles.successMessage}>
          <div className={styles.checkmark}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.checkmarkStem}></div>
              <div className={styles.checkmarkKick}></div>
            </div>
          </div>
          
          <h1 className={styles.title}>
            {tokenAddress ? `🎉 Token Minted Successfully!` : `Welcome to ${minikitConfig.miniapp.name.toUpperCase()}!`}
          </h1>
          
          {tokenAddress ? (
            <div className={styles.tokenDetails}>
              <p className={styles.subtitle}>
                Your token <strong>&quot;{tokenName}&quot;</strong> ({tokenSymbol}) has been successfully deployed on Base network!
              </p>
              <div className={styles.tokenInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Token Name:</span>
                  <span className={styles.value}>{tokenName}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Symbol:</span>
                  <span className={styles.value}>{tokenSymbol}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Contract Address:</span>
                  <span className={styles.value}>{tokenAddress.slice(0, 10)}...{tokenAddress.slice(-8)}</span>
                </div>
              </div>
              <a 
                href={`https://basescan.org/tx/${tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.explorerLink}
              >
                View on BaseScan
              </a>
            </div>
          ) : (
            <p className={styles.subtitle}>
              You&apos;re in! We&apos;ll notify you as soon as we launch.<br />
              Get ready to experience the future of onchain marketing.
            </p>
          )}

          <button onClick={handleShare} className={styles.shareButton}>
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
}
