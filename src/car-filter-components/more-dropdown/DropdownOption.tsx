import {useState} from "react";
import { CarType } from "car-filter-components/CarFilter"

interface Props{
    moreCarType: CarType
    isChecked: boolean
    setIsChecked: Function
    selectedAmount: number
    setSelectedAmount: Function    
}
export default function DropdownOption(props : Props){

    const handleCheckboxChange = ()=>{
        if(props.isChecked){
            props.setSelectedAmount(props.selectedAmount-1);
        }
        else{
            props.setSelectedAmount(props.selectedAmount+1);
        }
        props.setIsChecked(!props.isChecked);
    }
    return(
        <div className="dropdown-option" tabIndex={0}>
            <div className="inner-wrapper">
                <input type="checkbox" onChange={handleCheckboxChange} tabIndex={0} checked={props.isChecked}/>
                <div className="option-image">
                    <img src={props.moreCarType.pictureUrl} tabIndex={0}/>
                </div>
                <div className="option-name">
                    <span tabIndex={0}>{props.moreCarType.name}</span>
                </div>
                <div className="option-price-tag">
                    <span className="price-tag" tabIndex={0}>{props.moreCarType.priceTag}</span>
                </div>
            </div>
        </div>
    )
}