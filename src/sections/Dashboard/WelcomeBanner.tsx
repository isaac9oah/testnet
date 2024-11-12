import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../hooks/useUserStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const shadowEffect = 'drop-shadow(0 4px 3px rgba(0,0,0,.07)) drop-shadow(0 2px 2px rgba(0,0,0,.06))';

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: row;
    width: 100%;
    padding-top: 0 !important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    background: #ffffffdf;
    transition: background-color 0.2s ease;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }
`;

const Welcome = styled.div`
  background: linear-gradient(-45deg, #ffb07c, #ff3e88, #2969ff, #ef3cff, #ff3c87);
  background-size: 300% 300%;
  animation: backgroundGradient 30s ease infinite, welcome-fade-in 0.5s ease;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  filter: ${shadowEffect};

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 0;
    & > div {
      padding: 40px;
    }
  }
`;

const GalleryContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet {
    background: #ccc;
  }

  .swiper-pagination-bullet-active {
    background: #000;
  }
`;

const slides = [
  { href: '/raffle', src: 'https://mediatrix.imgix.net/uploads/0af94c3d-813f-4f8a-84de-f55d0b41f6d2.png?auto=format,compress' },
  { src: 'https://mediatrix.imgix.net/uploads/d19c9ba0-5f60-4dea-ae52-3b8de6963f0b.jpg?auto=format,compress' },
  { href: '/free', src: 'https://mediatrix.imgix.net/uploads/9367507c-c3c5-4149-9617-00abfb14cf1f.jpg?auto=format,compress' },
  { href: '/weekly-race', src: 'https://mediatrix.imgix.net/uploads/16b9a114-ed04-4a1e-a4ce-53c0d9993c8a.jpg?auto=format,compress' },
  // Add additional slide objects as needed
];

export function WelcomeBanner() {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const store = useUserStore();

  const copyInvite = () => {
    if (!wallet.connected) {
      walletModal.setVisible(true);
      return;
    }
    store.set({ userModal: true });
  };

  return (
    <Welcome>
      <div>
        <h1>Welcome to Gamba v2 👋</h1>
        <p>A fair, simple and decentralized casino on Solana.</p>
      </div>
      <Buttons>
        <button aria-label="Copy Invite" onClick={copyInvite}>
          💸 Copy Invite
        </button>
        <button aria-label="Add Liquidity" onClick={() => window.open('https://v2.gamba.so/', '_blank')}>
          🚀 Add Liquidity
        </button>
        <button aria-label="Join Discord" onClick={() => window.open('https://discord.gg/HSTtFFwR', '_blank')}>
          💬 Discord
        </button>
      </Buttons>
      <GameGallery />
    </Welcome>
  );
}

function GameGallery() {
  return (
    <GalleryContainer>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="index_myGameItem_dFwXW">
              <a href={slide.href || '#'} target="_blank" rel="noopener noreferrer">
                <img src={slide.src} alt={`Slide ${index + 1}`} style={{ width: '100%', borderRadius: '10px' }} />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </GalleryContainer>
  );
}
