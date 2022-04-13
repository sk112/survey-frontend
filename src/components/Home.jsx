import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {Question} from './Question';

export default function Home(){
    const [id, setId] = useState(null);
    const [questions, setQuestions] = useState(() => []);
    const [answers, setAnswers] = useState(() => {});
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      
        fetch('http://localhost:5002/questions')
        .then((resp) => resp.json())
        .then(result => {
            console.log(result);
            setId(result.id);
            setQuestions(result.questions);
            setTotal(result.total)
        })
    }, [])
  
    useEffect(() => {
      console.log("answers", answers)
    }, [answers])
    let navigate = useNavigate();

    useEffect(() => {
        let answers = {}
        answers['id'] = id;
        answers['questions'] = {};

        questions.forEach((e, i) => {
            answers['questions'][e['varname']] = e
        });

        answers['answers'] = {};
        setAnswers(answers)
    }, [questions, id, setAnswers])

    const submitHandler = () => {
        
        let keys = Object.keys(answers['answers'])

        console.log(keys.length, Object.keys(questions).length)
        console.log(keys, Object.keys(questions))
        
        if(keys.length !== Object.keys(questions).length){
            alert('Answer all questions!!')
            return
        }

        let request = {}
        request['u_id'] = id;
        request['as'] = []
        for(let k of Object.keys(answers['answers'])){
            request['as'].push({"u_id": id, "q_id": answers['questions'][k]['varname'], "answer": answers['answers'][k]})
        }
        
        console.log('Submit: ', JSON.stringify(request))
        fetch("http://localhost:5002/submit", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(request) // body data type must match "Content-Type" header
          })
          .then(response => response.json())
          .then(data => {
              console.log(data)
              if(data['success'] === true){
                    navigate("/other")
              }
          })
          .catch(err => console.log('Error: ', err))
    }

    return (
        <table class="table table-bordered container">
            {
            questions.map((question, index) => {
                return (
                   <tr key={question['varname']+index}>
                        <Question q={question} index={index+1} varname={question['varname']} setAnswers={setAnswers}/>
                   </tr>
                )
            })
            }
            <button onClick={submitHandler}>Submit</button>
        </table>
    )
}