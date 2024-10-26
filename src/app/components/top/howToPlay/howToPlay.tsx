"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const HowToPlay = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      content: (
        <div className='flex bg-[url("/image/startmenu.png")] h-[600px] w-[870px] bg-cover justify-center items-center'>
          <div className='mb-10'>
            <h2 className='text-center text-3xl'>1.業務を開始</h2>
            <Image className='w-[450px] mt-6' src="/image/exmypage.png" alt="" width={400} height={300}/>
            <p className='mt-2 text-center'>
              あなたの仕事がここから始まります！！<br />
              まずはマイページのスタートボタンを押してみましょう！
            </p>
          </div>
        </div>
      ),
    },

    {
      content: (
        <div className='flex bg-[url("/image/startmenu.png")] h-[600px] w-[870px] bg-cover justify-center items-center'>
          <div className='mb-10'>
            <h2 className='text-center text-3xl'>2.トピックを選択</h2>
            <Image className='w-[450px] mt-6' src="/image/exselect.png" alt="" width={400} height={300}/>
            <p className='mt-2 text-center'>
              今日の業務を行うトピックをここで入力しよう<br />
              好きなジャンルの本棚で仕事しよう！
            </p>
          </div>
        </div>
      ),
    },

    {
      content: (
        <div className='flex bg-[url("/image/startmenu.png")] h-[600px] w-[870px] bg-cover justify-center items-center'>
          <div className='mb-10'>
            <h2 className='text-center text-3xl'>3.本の所在を判別</h2>
            <Image className='w-[450px] mt-6' src="/image/exgame.png" alt="" width={400} height={300}/>
            <p className='mt-2 text-center'>
              お客さんの要望の本が今あるかどうかを確認<br />
              あれば「貸出」、なければ「貸出中」を選択！
            </p>
          </div>
        </div>
      ),
    },

    {
      content: (
        <div className='flex bg-[url("/image/startmenu.png")] h-[600px] w-[870px] bg-cover justify-center items-center'>
          <div className='mb-10'>
            <h2 className='text-center text-3xl'>4.スコア発表</h2>
            <Image className='w-[450px] mt-6' src="/image/exresult.png" alt="" width={400} height={300}/>
            <p className='mt-2 text-center'>
              時間内に正しくこなせた業務に応じてスコアが出る<br />
              何度も挑戦してハイスコアを目指そう！
            </p>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="slider-container relative w-full h-full">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={prevSlide === (onclick) ? { opacity: 1, x: -5 } : { opacity: 1, x: 10}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {slides[currentSlide].content}
      </motion.div>

      <div className='items-center justify-center flex gap-48'>
        <Button
          className="transform -translate-y-1/2 p-2 bg-[#808080] w-16"
          onClick={prevSlide}
        >
          Prev
        </Button>

        <Button
          className="transform -translate-y-1/2 p-2 bg-[#808080] w-16"
          onClick={nextSlide}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default HowToPlay;
