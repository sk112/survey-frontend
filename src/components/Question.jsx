import { useCallback, useState } from "react";
import clearSvg from './../assets/icons8-close-30.svg';
import './Questions.css';

export function Question({ q: question, index, setAnswers, varname}){

    // const question = useMemo(() => q, [q])
    const [check, setCheck] = useState(null);

    const checkHandler = useCallback((event) => {
        setCheck(prev => {
            setAnswers(prevD => {
                
                let newD = {};

                Object.assign(newD, prevD)
                newD['answers'][varname] = event.target.value
                
                return newD;
            })            
            
            return event.target.id;
        })

        // setCheck(event.target.id);
    }, [varname, setAnswers])

    const ClearHandler = (event) => {
        setCheck(prev => {
            return null;
        })
        setAnswers(prevD => {
                
            let newD = {};

            Object.assign(newD, prevD)
            delete newD['answers'][varname];

            return newD;
        })
    }

    return (
        <>
                <td key={"question"+index} className="mw-50 w-50">
                        <b>{index}. {question.questiontext}</b>
                </td>
                {/* <td key={"option"+index}> */}
                    {
                        [...Array(7)].map((v, i) => {
                            let option = "option"+ (i+1);
                            let id = "option"+(index+1) +""+ (i+1);
                            return (
                                <td className="text-center">
                                    <input type="radio" id={id} value={question[option]} onChange={checkHandler} checked={(check !== null && check === id)?true:false}/>
                                </td>
                            )
                        })
                    }
                    <td className="text-center">
                        <button className="clear" onClick={ClearHandler} style={{border: "none", backgroundColor: 'unset', width: "100px"}}>
                            <img src={clearSvg} alt="clear"></img>
                        </button>
                    </td>
                {/* </td> */}
        </>
    )

}