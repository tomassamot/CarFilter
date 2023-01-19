import {useState, useCallback} from "react";
import "./DropButton.css";

interface Props{
    setIsOpened: Function
    //selectedAmount: number;
    optionsChecked: boolean[]
    optionsCheckedSetters: Function[]
    selectedAmount: number
    setSelectedAmount: Function
}
export default function DropButton(props : Props){
    const [currentBackgroundColor, setCurrentBackgroundColor] = useState("white");
    const [currentBorderColor, setCurrentBorderColor] = useState("darkgray");
    const [currentFontColor, setCurrentFontColor] = useState("black");
    const [isClicked, setIsClicked] = useState(false);
    const [clearFocusInterval, setClearFocusInterval] = useState(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(()=>updateState({}), []);
    
    
    const handleMouseOver = ()=>{
        if(!isClicked){
            setCurrentBorderColor("black");
        }
        else{
            setCurrentBackgroundColor("#2f2f2f");
            setCurrentBorderColor("black");
        }
        
    }
    const handleMouseOut = ()=>{
        if(!isClicked){
            setCurrentBorderColor("darkgray");
        }
        else{
            setCurrentBackgroundColor("#717070");
            setCurrentBorderColor("darkgray");
        }  
    }
    const handleClick = (event : any)=>{
        var currentTarget = event.currentTarget;
        if(!isClicked){
            setCurrentBackgroundColor("#2f2f2f");
            setCurrentFontColor("white");
            setIsClicked(true);
            props.setIsOpened(true);
            let focusInterval = setInterval(()=>{
                currentTarget.focus();
                if(clearFocusInterval){
                    setClearFocusInterval(false);
                    clearInterval(focusInterval);
                }
            },200)
        }
        else{
            setCurrentBackgroundColor("white");
            setCurrentFontColor("black");
            setIsClicked(false);
            props.setIsOpened(false);
        }
    }
    const handleBlur = (event : any)=>{
        if(event.relatedTarget === null && isClicked){
            setCurrentBackgroundColor("white");
            setCurrentFontColor("black");
            setIsClicked(false);
            props.setIsOpened(false);
            
            setClearFocusInterval(true);
        }
    }
    const handleRemoveClick = ()=>{
        let removedAmount=0;
        for(let i = 0;i<props.optionsCheckedSetters.length;i++){
            if(props.optionsChecked[i] === true){
                props.optionsCheckedSetters[i](false);
                removedAmount++;
            }
        }
        props.setSelectedAmount(props.selectedAmount-removedAmount);
    }
    const selectedFilterAmount = ()=>{
        let amount=0;
        props.optionsChecked.map((optionChecked)=>{
            if(optionChecked === true){
                amount++;
            }
        })
        return amount;
    }
    return(
        <>
        <div className="inner-column-wrapper" style={{backgroundColor: currentBackgroundColor, borderColor: currentBorderColor, color: currentFontColor}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick} onBlur={handleBlur} tabIndex={0}>
            <div className="text-wrapper">
                <div className="text-column-wrapper">
                    <b>More</b>
                    {
                        selectedFilterAmount() > 0 ?
                            (<div>
                                <b>{selectedFilterAmount()} selected</b>
                            </div>)
                        :
                            ""
                    }
                </div>
                {
                    selectedFilterAmount() > 0 ?
                        <span onClick={()=>{handleRemoveClick();forceUpdate();}}>
                            <b>X</b>
                        </span>
                    :
                        !isClicked ?
                            (<b>V</b>)
                        :
                            (<b>^</b>)
                }
            </div>
        </div>
        </>
    )
}