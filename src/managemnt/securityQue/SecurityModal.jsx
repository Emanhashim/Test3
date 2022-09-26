import React,{useState,useEffect} from 'react'
import { Form, Field } from "@leveluptuts/fresh";
import "./Securitystyles.css";
import "./ModalSQ.css"
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { FaMoneyBillAlt,} from "react-icons/fa";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {BsFillImageFill} from "react-icons/bs";
import scrollreveal from "scrollreveal";
import ReactImageMagnify from "react-image-magnify";
import ReactLanguageSelect from "react-languages-select";
import 'react-languages-select/scss/react-languages-select.scss'
import SecurityView from './SecurityView';
import CornerRibbon from "react-corner-ribbon";
export default function SecurityModal({ setOpenModal }) {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "500px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .Sfresh-form
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
 


  const jwt =JSON.parse(localStorage.getItem('jwt'));
  console.log(jwt)
    const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [question, setQuestion] = useState("");
  const [descriptionx, setDescriptionx] = useState("");
  const [imgData, setImgData] = useState(null);
  const [user, setUser] = useState({
    question: "",
  
   });
 
 
  const [IValue , setIvalue]= useState("")
  const message =JSON.parse(localStorage.getItem('message'));
     
  
        const history = useHistory();
      const[date, setDate]=useState("")
      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = (data) => {
      
        submitForm ();
     
     
       
      }
      
  const Navgate=()=>{
    window.location.reload(true)
  }
  async function  submitForm  ()  {
       
        const account={question}
 
        let item={question};
       const options={
            method:'POST',
            headers:{
      
                'Content-Type':'application/json',
                "Accept":"application/json",
                "Authorization":`Bearer ${jwt}`
               
            },
            body:JSON.stringify(item)
            
        }
        const url ="http://198.199.67.201:8080/Api/Question/CreateQuestion"
        try{
         const response= await fetch(url,options);
         const result =await response.json();
         
          const total=result
          console.log(result)
       console.log(total)
      
       localStorage.setItem('message', JSON.stringify(result['message']))
      const mess= localStorage.getItem('message')
      
      

         
       
      if(response.ok){
        console.log("successful")
        
        swal("Successfully Added");
        
     
       setQuestion('') 
        
      }else{
        console.log("failed")
      swal("Failed", mess, "error")
      }
      }catch(error) {
        console.error(error);
      }
      };
   
    
    
      const validateSelectedFile = () => {
        const MIN_FILE_SIZE = 20 // 1MB
        const MAX_FILE_SIZE = 5120 // 5MB
    
        if (!selectedFile) {
          setErrorMsg("Please choose a file");
          setIsSuccess(false)
          return
        }
    
        const fileSizeKiloBytes = selectedFile.size / 1024
    
        if(fileSizeKiloBytes < MIN_FILE_SIZE){
          setErrorMsg("File size is less than minimum limit");
          setIsSuccess(false)
          return
        }
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
          setErrorMsg("File size is greater than maximum limit");
          setIsSuccess(false)
          return
        }
    
        setErrorMsg("")
        setIsSuccess(true)
      };
     
     
   
      return (
        <div className="modalBackgroundx" >
            
         <div className ='Sfresh-form'>
        
            <form  onSubmit={handleSubmit(onSubmit)}>
              <Link to="/SecurityV">
              <h1 className='sideXButtonSecurity'  onClick={() => {
              setOpenModal(false);
            }} style={{backgroundColor: isHovering ? 'transparent' : '',
            color: isHovering ? 'red' : '', }}   
            onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            
              <AiOutlineCloseCircle/></h1>
              </Link>
                <h1 className='promo'></h1>
              
                
     <FontAwesomeIcon icon="lock" className="fa" />
        <label>Security Question</label>    
        <div class="ribbon ribbon-top-left"><span style={{fontSize:"8px" }}>Security Registration</span></div>
 <div className='Sfresh-field-wrapper'>
   
 <div className='fresh-field-wrapper'>
<input type="text" className= "Sfresh-input " placeholder='Enter Your Security Question' value={question}
 {...register("title", { required: { value: true, message: "Please Enter Your Question", }, maxLength: { value: 50, message: " maximum  50 characters" }, minLength: { value: 5, message: " must have at least 5 characters" },
  pattern: { value: /^[ a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, message: "Invalid Expresion", } })}
  onChange={(e) => setQuestion(e.target.value)} 
 />
  {errors.title&& <p className="text-error" >{errors.title.message}</p>}
 
 </div>
 

 </div>
 <FontAwesomeIcon icon="globe" className="fa" />
 <ReactLanguageSelect 
      names={"international"}
      defaultLanguage="en"
      searchable={true}
      customLabels={{"en": "EN-US", "fr": "FR", "de": "DE", "it": "IT"}}
     

    
      /> 

 <div className='fresh-field-wrapper'>
 <button onClick={handleSubmit(onSubmit)} className="Sfresh-button"  >Add</button>

 </div>


 
 
            </form>
           
 </div>
         </div>
            
          );
          
        }