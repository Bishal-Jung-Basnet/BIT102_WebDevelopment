import React from 'react'
import HeroSection from '../components/Hero'
import CategoryBrowse from '../components/CategoryBrowse'
import GameSections from '../components/GameSections'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <CategoryBrowse />
        <GameSections />
    </div>
  )
}

export default Home