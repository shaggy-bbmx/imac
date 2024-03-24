import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import cpu from '../public/img/cpu.jpg'
import keyboard from '../public/img/keyboard.png'
import mouse from '../public/img/mouse.jpg'
import hand from '../public/img/hand.png'
import Image from 'next/image';







const Code = () => {


    const [pointerDistance, setPointerDistance] = useState(-300) // safely assuming that pointer is below the bottom of view port

    const [scrollOpacity, setScrollOpacity] = useState(1)
    const [displacement, setDisplacement] = useState(1900) // things are normal for dispalcement > 1800
    const [scrollOpacity_2, setScrollOpacity_2] = useState(0)
    const [keyboardHeight, setKeyboardHeight] = useState(43) // 43vh being normal value
    const [keyBoardTop, setKeyBoardTop] = useState(0) // normal n=beign translate-y-0
    const [scale, setScale] = useState(1)
    const divRef = useRef(null)
    const keyboardRef = useRef(null)
    const [padding, setPadding] = useState(0)
    const [handBottom, setHandBottom] = useState(-10)
    const [handLeft, setHandLeft] = useState(40)



    const calculate = (p1, p2, d1, d2, scrollY) => {
        let a = (p1 - p2) / (d1 - d2)
        let b = (p2 * d1 - p1 * d2) / (d1 - d2)

        return a * scrollY + b
    }



    useEffect(() => {

        const handleScroll = () => {

            let factor = Math.ceil(divRef.current.getBoundingClientRect().bottom + window.scrollY)
            let actualScroll = window.scrollY - factor
            console.log('scroll', Math.ceil(actualScroll))


            const pointer = document.getElementById('pointer')

            const distanceOFPointer = -pointer.getBoundingClientRect().bottom

            setPointerDistance(distanceOFPointer)// '-' is used to make distance  positive if above viewport

            setPadding(keyboardRef.current.getBoundingClientRect().left)


            //calculation for opacity of text 'LIKE WE SAID' for change in position from 1850 to 1800.
            const opacity_2 = Math.min(1, Math.max(0, calculate(0, 1, 1600, 1700, actualScroll)))
            setScrollOpacity_2(opacity_2)

            setKeyboardHeight(Math.max(43, Math.min(60, calculate(43, 60, 500, 1500, actualScroll))))

            setScrollOpacity(Math.min(1, Math.max(0, calculate(1, 0, 250, 500, actualScroll))))



            if (actualScroll < 500) {
                setKeyBoardTop(38)
            } else if (actualScroll < 1500) {
                setKeyBoardTop(calculate(38, 20, 500, 1500, actualScroll))
            } else if (actualScroll < 2200) {
                if (window.innerWidth > 576) {
                    setKeyBoardTop(calculate(20, 90, 1500, 2200, actualScroll))
                } else {
                    setKeyBoardTop(calculate(20, 70, 1500, 2200, actualScroll))
                }
            } else {
                if (window.innerWidth > 576) {
                    setKeyBoardTop(90)
                } else {
                    setKeyBoardTop(70)
                }
            }


            setDisplacement(Math.max(0, Math.min(8, calculate(0, 8, 500, 1500, actualScroll))))
            setScale(Math.max(1, Math.min(1.5, calculate(1, 1.5, 500, 1500, actualScroll))))
            setHandBottom(Math.min(0, Math.max(-10, calculate(-10, 0, 2200, 2600, actualScroll))))

            let temp = keyboardRef.current.getBoundingClientRect().right / window.innerWidth * 100 - 35
            console.log('temp', temp)
            setHandLeft(Math.min(temp, Math.max(60, calculate(60, temp, 3160, 3260, actualScroll))))
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [])


    return (
        <div className='bg-gray-50  relative'>
            <div className="w-full h-[300vh] bg-orange-200 mb-32"></div>

            <div className='w-full h-[700vh] relative'>

                <div className="flex px-[5vw] sm:px-[10vw] md:pl-[5vw] xl:pl-[10vw]">
                    <p className="text-3xl md:text-5xl text-gray-900 font-semibold mb-2">Keep the colour going</p>
                </div>
                <div className="flex px-[5vw] sm:px-[10vw]  md:pl-[5vw] xl:pl-[10vw] mb-16">
                    <p id='pointer' className="text-3xl md:text-5xl text-green-800 font-semibold">all the way to your fingertips.</p>
                </div>


                <div ref={divRef} style={{ opacity: `${scrollOpacity}` }} id='paragraph' className="px-[5vw] sm:px-[10vw] md:pl-[40vw] md:pr-[5vw] xl:pr-[15vw] transition-opacity">
                    <p className="text-xl xl:text-2xl text-slate-500 font-semibold">
                        iMac features a colour-matched keyboard, mouse and trackpad. Magic Keyboard with Touch ID lets you easily and securely unlock your iMac, switch users and download apps.10 And Magic Mouse and Magic Trackpad make navigation comfortable and intuitive.
                    </p>
                </div>


                <div
                    style={{
                        top: `${keyBoardTop}vh`,
                        transform: `scaleY(${scale})`
                    }}
                    className={`flex w-full  pr-[4vw] lg:pr-[8vw] xl:pr-[15vw] justify-end space-x-4 mt-32 mb-[25vh] sm:mb-[40vh]  md:mb-[65vh] sticky h-[25vh] md:h-[35vh] lg:h-[43vh]    z-40 overflow-hidden transition-all`}>
                    <Image
                        style={{
                            right: `${4 * (1 - scrollOpacity)}rem`,
                            opacity: `${scrollOpacity}`
                        }}
                        className='h-full relative  transition-all' src={cpu} alt='cpu' />
                    <Image
                        style={{
                            transform: `scaleX(${scale})`
                        }}
                        ref={keyboardRef}
                        className='h-full relative   transition-all' src={keyboard} alt='keyboard' />
                    <Image
                        style={{
                            left: `${4 * (1 - scrollOpacity)}rem`,
                            opacity: `${scrollOpacity}`
                        }}
                        className='h-full relative transition-all' src={mouse} alt='mouse' />
                </div>

                <div
                    style={{
                        paddingLeft: `${Math.max(padding + 10, 20)}px`
                    }}
                    className='mb-[60vh] sm:mb-[80vh] md:mb-[120vh] sticky top-[30vh] md:top-16 z-30'>
                    <div
                        style={{ opacity: `${scrollOpacity_2}` }}
                        id='footer' className='text-3xl sm:text-5xl  text-gray-900 font-semibold '>Like we said.</div>
                    <div
                        style={{ opacity: `${pointerDistance > 1900 ? '1' : '0'}` }}
                        id='footer' className='text-[6rem] sm:text-[10rem]   md:text-[16rem] lg:text-[18rem]  text-green-900 font-bold '>Magic</div>
                </div>

                <div
                    style={{
                        bottom: `${handBottom}vh`,
                        left: `${handLeft}vw`
                    }}
                    className={`transition-all absolute  h-[60vh] w-[40vw] sm:w-[auto] lg:h-[120vh]  z-50`}>
                    <Image className='h-full' src={hand} alt='hand' />
                </div>

            </div>

            <div className="w-full h-[300vh] bg-orange-200 mb-32"></div>
        </div >
    )
}

export default Code
