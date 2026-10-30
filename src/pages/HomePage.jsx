import React from 'react';
import Marquee from '../components/home/Marquee';
import ShowroomRack from '../components/showroom/ShowroomRack';
import FeaturedCollection from '../components/home/FeaturedCollection';
import CategorySection from '../components/home/CategorySection';
import CustomTeeTeaser from '../components/home/CustomTeeTeaser';
import FabricStory from '../components/home/FabricStory';
import LookbookSection from '../components/home/LookbookSection';

export default function HomePage({ setActivePage, onNavigateProduct, setSelectedCategory }) {
  return (
    <div className="w-full">
      {/* 1. Flagship Showroom Entrance & Live Clothing Rail */}
      <ShowroomRack
        onNavigateProduct={onNavigateProduct}
        onShopClick={() => {
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onCustomClick={() => {
          setActivePage('customize');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isHero={true}
      />

      {/* 2. Infinite Marquee */}
      <Marquee />

      {/* 4. Featured Editorial Collection */}
      <FeaturedCollection
        onNavigateProduct={onNavigateProduct}
        onShopClick={() => {
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Asymmetric Shop by Category */}
      <CategorySection
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onCustomClick={() => {
          setActivePage('customize');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. Custom T-Shirt Section CTA */}
      <CustomTeeTeaser
        onCustomClick={() => {
          setActivePage('customize');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. 240 GSM Fabric Engineering Story */}
      <FabricStory />

      {/* 7. Street Lookbook & Verified Reviews */}
      <LookbookSection />
    </div>
  );
}
