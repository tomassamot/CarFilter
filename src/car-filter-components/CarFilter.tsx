import React, { useState, useEffect } from 'react';
import MainCarTypes from "./main-car-types/MainCarTypes";
import MoreDropdown from './more-dropdown/MoreDropdown';
import "./CarFilter.css";

export interface CarType{
    name: string
    pictureUrl: string
    priceTag: string
}
export default function CarFilter(){
    const mainCarTypes : CarType[] = [
        {name: "Small", pictureUrl: "/01_mini_white.png", priceTag: "$222+"},
        {name: "Medium", pictureUrl: "/02_economy_white.png", priceTag: "$238+"},
        {name: "Large", pictureUrl: "/03_standard_white.png", priceTag: "$245+"},
        {name: "SUV", pictureUrl: "/05_suv-small_white.png", priceTag: "$274+"}
    ];
    const moreCarTypes : CarType[] = [
        {name: "Van", pictureUrl: "/11_van_white.png", priceTag: "$358"},
        {name: "Pickup Truck", pictureUrl: "/12_truck_white.png", priceTag: "$323"},
        {name: "Luxury", pictureUrl: "/04_premium.png", priceTag: "$458"},
        {name: "Convertible", pictureUrl: "/08_convertible_white.png", priceTag: "$778"}
    ];

    const [selectedAmount, setSelectedAmount] = useState(0);

    const initializeOptionsChecked = (carTypes : CarType[])=>{
        let tempOptionsChecked : boolean[] = [];
        for(let i = 0;i<carTypes.length;i++){
            tempOptionsChecked.push(false);
        }
        return tempOptionsChecked;
    }
    const initializeOptionsCheckedSetters = (optionsChecked : boolean[], carTypes : CarType[])=>{
        let tempOptionsCheckedSetters : Function[] = [];
        for(let i = 0;i<carTypes.length;i++){
            tempOptionsCheckedSetters.push((newVal : boolean)=>optionsChecked[i] = newVal);
        }
        return tempOptionsCheckedSetters;
    }
    const [mainOptionsChecked, ,] = useState<boolean[]>(initializeOptionsChecked(mainCarTypes));
    const [mainOptionsCheckedSetters, ,] = useState<Function[]>(initializeOptionsCheckedSetters(mainOptionsChecked, mainCarTypes));

    const [moreOptionsChecked, ,] = useState<boolean[]>(initializeOptionsChecked(moreCarTypes));
    const [moreOptionsCheckedSetters, ,] = useState<Function[]>(initializeOptionsCheckedSetters(moreOptionsChecked, moreCarTypes));
    const [, updateState] = useState({});
    const forceUpdate = React.useCallback(()=>updateState({}), []);

    const handleReset = ()=>{
        mainOptionsCheckedSetters.map((setter : Function)=>{
            setter(false);
        })
        moreOptionsCheckedSetters.map((setter : Function)=>{
            setter(false);
        })
        setSelectedAmount(0);
    }
    return(
        <>
        
        <div className="column-wrapper">
            <div className="wrapper">
                <span>
                    <b>Car type</b>
                </span>
                {
                    selectedAmount > 0 ?
                        (
                            <span onClick={()=>{handleReset();forceUpdate();}} className="reset-btn">
                                <b>Reset</b>
                            </span>
                        )
                    :
                        ""
                }
                
            </div>
            <div className='wrapper'>
                <MainCarTypes
                    mainCarTypes={mainCarTypes}
                    optionsChecked={mainOptionsChecked}
                    optionsCheckedSetters={mainOptionsCheckedSetters}
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                />
                <MoreDropdown
                    moreCarTypes={moreCarTypes}
                    optionsChecked={moreOptionsChecked}
                    optionsCheckedSetters={moreOptionsCheckedSetters}
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                />
            </div>
        </div>
        </>
    );
}