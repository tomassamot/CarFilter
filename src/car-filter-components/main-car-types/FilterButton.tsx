import {useState, useEffect} from "react";
import { CarType } from "car-filter-components/CarFilter"
import "./FilterButton.css";

interface Props{
    mainCarType: CarType
    optionsChecked: boolean[]
    optionsCheckedSetters: Function[]
    index:number
    selectedAmount: number
    setSelectedAmount: Function
}
export default function FilterButton(props : Props){
    const [currentBackgroundColor, setCurrentBackgroundColor] = useState("white");
    const [currentBorderColor, setCurrentBorderColor] = useState("darkgray");
    const [currentFontColor, setCurrentFontColor] = useState("black");
    const [showPrice, setShowPrice] = useState(false);
    
    useEffect(()=>{
        if(!props.optionsChecked[props.index]){
            setCurrentBackgroundColor("white");
            setCurrentFontColor("black");
        }
        else{
            setCurrentBackgroundColor("#2f2f2f");
            setCurrentFontColor("white");
        }
    }, [props.optionsChecked[props.index]])

    const handleMouseOver = ()=>{
        if(!props.optionsChecked[props.index]){
            setCurrentBorderColor("black");
        }
        else{
            setCurrentBackgroundColor("#2f2f2f");
            setCurrentBorderColor("black");
        }
        setShowPrice(true);
    }
    const handleMouseOut = ()=>{
        if(!props.optionsChecked[props.index]){
            setCurrentBorderColor("darkgray");
        }
        else{
            setCurrentBackgroundColor("#717070");
            setCurrentBorderColor("darkgray");
        } 
        setShowPrice(false);
    }
    const handleClick = ()=>{
        if(!props.optionsChecked[props.index]){
            setCurrentBackgroundColor("#2f2f2f");
            setCurrentFontColor("white");
            props.setSelectedAmount(props.selectedAmount+1);
        }
        else{
            setCurrentBackgroundColor("white");
            setCurrentFontColor("black");
            props.setSelectedAmount(props.selectedAmount-1);
        }
        props.optionsCheckedSetters[props.index](!props.optionsChecked[props.index])
    }
    return(
        <>
        <div className="outer-column-wrapper">
            {
                showPrice ?
                    (
                        <div className="price-tag-popup">
                            {props.mainCarType.priceTag}
                        </div>
                    )
                :
                    ""
            }
            <div className="inner-column-wrapper" style={{backgroundColor: currentBackgroundColor, borderColor: currentBorderColor, color: currentFontColor}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
                <img src={props.mainCarType.pictureUrl}/>
                <b>{props.mainCarType.name}</b>
            </div>
        </div>

        </>
    )
}