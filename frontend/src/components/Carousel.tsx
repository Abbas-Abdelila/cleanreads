"use client"
import Tag from '@/types/Tag/Tag'
import React, { useState, useRef, useCallback } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

type Props = {
    data: Array<any>
    width?: number,
    setActive?: any,
    height?: number,
    sizeType?: "px" | "rem" | "%"
}

export default function Carousel({ width, height, data, sizeType, setActive }: Props) {
    const [activeTags, setActiveTags] = useState<Array<number>>([])
    const [leftEnd, setLeftEnd] = useState<boolean>(false)
    const [rightEnd, setRightEnd] = useState<boolean>(false)
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleLeftScroll = () => {
        if (carouselRef.current) {
            if (carouselRef.current.scrollLeft > 0) {
                carouselRef.current.scrollLeft -= 100;
                setLeftEnd(false)
                setRightEnd(false)
            } else {
                setLeftEnd(true)
                setRightEnd(false)
            }
        }
    }

    const handleRightScroll = () => {
        if (carouselRef.current) {
            const containerWidth = carouselRef.current.clientWidth;
            const contentWidth = carouselRef.current.scrollWidth;
            const scrollLeft = carouselRef.current.scrollLeft;
            const maxScrollLeft = contentWidth - containerWidth;
            const scrollRight = maxScrollLeft - scrollLeft;

            if (scrollRight <= 1) {
                setRightEnd(true);
                setLeftEnd(false);
            } else {
                carouselRef.current.scrollLeft += 100;
                setLeftEnd(false);
                setRightEnd(false);
            }
        }
    };

    const handleClick = (id: number) => {
        setActiveTags([id])
        setActive(id)
    }


    const type = useCallback(() => {
        let type = sizeType;
        if (!sizeType)
            type = "px"
        return type;
    }, [sizeType])

    return (
        <div className={`
        ${width ? `lg:w-[${width}${type()}]` : `lg:w-[500px]`} 
        ${height ? `h-[${height}${type()}]` : `h-28`} 
        flex items-center justify-between
        w-[100%]
        `}>

            <span
                onClick={(e) => handleLeftScroll()}
                className={`text-4xl cursor-pointer ${leftEnd ? 'text-gray-400' : 'text-[#292929]'}`}>
                <KeyboardArrowLeftIcon />
            </span>

            <div
                ref={carouselRef}
                className={`
        w-full
        relative
        overflow-scroll
        scrollbar-hide
        flex 
        mx-2
        items-center
        carousel-container`}>
                {
                    data.map((tag: Tag) => (
                        <p
                            key={tag.tagId}
                            onClick={() => handleClick(tag.tagId)}
                            className={`py-4 px-2 ${activeTags.includes(tag.tagId) && "border-b text-[#080808]"} s
                        carousel-item border-gray-950 cursor-pointer
                        hover:text-[#080808]
                        text-gray-500
                        leading-[8px]
                        `}>
                            {tag.name}
                        </p>
                    ))
                }

            </div>
            <span
                onClick={(e) => handleRightScroll()}
                className={`text-4xl cursor-pointer ${rightEnd ? 'text-gray-400' : 'text-[#292929]'}`}>
                <KeyboardArrowRightIcon />
            </span>
        </div>
    )
}
