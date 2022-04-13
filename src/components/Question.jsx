import { useCallback, useState } from "react";
import styles from './Questions.module.css';

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
                <td key={"option"+index}>
                    {
                        [...Array(7)].map((v, i) => {
                            let option = "option"+ (i+1);
                            let id = "option"+(index+1) +""+ (i+1);
                            return (
                                <input type="radio"  id={id} value={question[option]} onChange={checkHandler} checked={(check !== null && check === id)?true:false}/>
                            )
                        })
                    }
                    {/* <div>
                        <button onClick={ClearHandler}>clear</button>
                    </div> */}
                </td>
        </>
    )

}