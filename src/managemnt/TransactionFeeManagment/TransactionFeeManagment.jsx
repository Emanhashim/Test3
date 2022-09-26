import React,{useState,useEffect} from 'react'
import { Form, Field } from "@leveluptuts/fresh";
import "./Bankstyles.css";
import "./ModalSQ.css"
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { FaMoneyBillAlt,FaFile} from "react-icons/fa";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {BsFillImageFill} from "react-icons/bs";
import scrollreveal from "scrollreveal";
import ReactImageMagnify from "react-image-magnify";
import ReactLanguageSelect from "react-languages-select";
import 'react-languages-select/scss/react-languages-select.scss'


import CornerRibbon from "react-corner-ribbon";
import {RiMoneyDollarCircleLine, RiBankLine } from "react-icons/ri";
export default function TransactionFeeManagment() {
  const [spinner, setSpinner] = useState(false); 
  const [isHovering, setIsHovering] = useState(false);
  const MAX_COUNT = 5;
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
      .Sfresh-formBank
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);


    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    swal(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
        console.log(uploaded)
    }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }


  const jwt =JSON.parse(localStorage.getItem('jwt'));
  console.log(jwt)
   
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, SetName] = useState("");
  const [descriptionx, setDescriptionx] = useState("");
  const [imgData, setImgData] = useState(null);
  const [user, setUser] = useState({
    question: "",
  
   });
 const [data , setData]= useState("");
   const handleChange = e => {    
    setData({
            ...data,
            files: [...data.files, ...e.target.files],
          });
        }
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
    setSpinner(true)
        const account={name}
 
        let item={name};
       const options={
            method:'POST',
            headers:{
      
                'Content-Type':'application/json',
                "Accept":"application/json",
                "Authorization":`Bearer ${jwt}`
               
            },
            body:JSON.stringify(item)
            
        }
        const url ="http://198.199.67.201:8080/Api/Bank/CreateBank"
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
        SetName('');
       
        
      }else{
        console.log("failed")
      swal("Failed", mess, "error")
      }
      }catch(error) {
        console.error(error);
      }
      };
   
    
    
    
     
     

      return (
        <div >
          
         <div className ='Sfresh-formBank'>
                          
            <form >
       
              <h1 className='sideXButton'  onClick={() => {
            
            }} style={{ backgroundColor: isHovering ? 'transparent' : '',
            color: isHovering ? 'red' : '', }}   
            onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            
              <AiOutlineCloseCircle/></h1>
             

 <div className='Sfresh-field-wrapper'>
 <div class="ribbonBank ribbon-top-leftBank"><span style={{fontSize:"10px" }}>Transaction_Fee</span></div>
 <RiBankLine style={{ color: "#ffc107", fontSize: "15px" ,position: "2px" }}/>
                <label>Set Transaction Fee</label>    
 <div className='fresh-field-wrapper'>

<input type="text" className= "Sfresh-inputBank " placeholder='Set Transaction_Fee' value={name}
 {...register("bank", { required: { value: true, message: "Please Enter Bank Name", }, maxLength: { value: 50, message: " maximum  50 characters" }, minLength: { value: 5, message: " must have at least 5 characters" },
  pattern: { value: /^[ a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, message: "Invalid Expresion", } })}
  onChange={(e) => SetName(e.target.value)} 
 />
  {errors.bank&& <p className="text-error" >{errors.bank.message}</p>}
 
 </div>


 </div>

 <div className="row">
        {
        images.map((url)=>{
            return (
                <div className="col-sm-1">
                <div className="card">
                <img src={url} />
                </div>
                </div>
            )
        })
        }
        
        </div>

 <div className='fresh-field-wrapper'>
 <button onClick={handleSubmit(onSubmit)} className="fresh-buttonBank"  >Submit</button>

 </div>


 
 
            </form>
           
 </div>
         </div>
            
          );
          
        }