import React from 'react'
import Hero from '../components/Hero';
import FeaturedDestination from '../components/FeaturedDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import RecommendedHotels from '../components/RecommendedHotels';
//<></> fragment
const Home = () => {
    return (
        <>
            <Hero />
            <RecommendedHotels />
            <FeaturedDestination />
            <ExclusiveOffers />
            <Testimonials />
            <Newsletter />
        </>
    )
}

export default Home