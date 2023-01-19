import {CarType} from "car-filter-components/CarFilter";
import {useState} from "react";
import "./MainCarTypes.css";
import FilterButton from "./FilterButton";

interface Props{
    mainCarTypes: CarType[]
    optionsChecked: boolean[]
    optionsCheckedSetters: Function[]
    selectedAmount: number
    setSelectedAmount: Function
}
export default function MainCarTypes(props : Props){

    let index = -1;
    return(
        <>
        <div className="wrapper">
            {
            props.mainCarTypes.map((mainCarType)=>{
                index++;
                return(
                    <FilterButton
                        key={index}
                        mainCarType={mainCarType}
                        optionsChecked={props.optionsChecked}
                        optionsCheckedSetters={props.optionsCheckedSetters}
                        index={index}
                        selectedAmount={props.selectedAmount}
                        setSelectedAmount={props.setSelectedAmount}
                    />
                )
            })
            }
        </div>
        </>
    )
}