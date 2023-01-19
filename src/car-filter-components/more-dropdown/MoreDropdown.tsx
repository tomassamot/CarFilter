import {CarType} from "car-filter-components/CarFilter";
import {useState} from "react";
import "./MoreDropdown.css";
import DropButton from "./DropButton";
import DropdownOption from "./DropdownOption";

interface Props{
    moreCarTypes: CarType[]
    optionsChecked: boolean[]
    optionsCheckedSetters: Function[]
    selectedAmount: number
    setSelectedAmount: Function
}
export default function MoreDropdown(props : Props){
    const [isOpened, setIsOpened] = useState(false);

    let index = -1;
    return(
        <>
        <div className="more-dropdown">
            <DropButton
                setIsOpened={setIsOpened}
                optionsChecked={props.optionsChecked}
                optionsCheckedSetters={props.optionsCheckedSetters}
                selectedAmount={props.selectedAmount}
                setSelectedAmount={props.setSelectedAmount}
            />
            <div className="dropdown-content">
            {
                isOpened ?
                    props.moreCarTypes.map((moreCarType)=>{
                        index++;
                        return(
                            <DropdownOption
                                key={index}
                                moreCarType={moreCarType}
                                isChecked={props.optionsChecked[index]}
                                setIsChecked={props.optionsCheckedSetters[index]}
                                selectedAmount={props.selectedAmount}
                                setSelectedAmount={props.setSelectedAmount}
                            />
                        )
                    })
                : ""
            }
            </div>

        </div>
        </>
    )
}