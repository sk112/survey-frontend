import { useNavigate } from "react-router-dom"


export default function OtherSurvey(){

    let navigate = useNavigate();


    return (
        <div>
            <div>
            Successfully Submitted Survey.
            </div>

            <div>
                <button onClick={(e) => navigate("/")}>
                    Another Survey
                </button>
            </div>
        </div>
    )

}