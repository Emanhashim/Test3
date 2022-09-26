import React,{useEffect,useState} from "react";
import "./PromotionModalStyle.css";
import scrollreveal from "scrollreveal";
import "./promoStyle.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { FaMoneyBillAlt,} from "react-icons/fa";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {BsFillImageFill} from "react-icons/bs";
import CornerRibbon from "react-corner-ribbon";
import Loading from "../../components1/merchant/Loading";
function ModalProm({ setOpenModal }) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    function onLoad() {
      // delay for demo only
      setTimeout(() => setIsLoading(false), 1000);
  
     // setIsLoading(false)
    }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const sr = scrollreveal({
          origin: "top",
          distance: "80px",
          duration: 2000,
          reset: false,
        });
        sr.reveal(
          `
          .fresh-formPro
        `,
          {
            opacity: 0,
            interval: 100,
          }
        );
      }, []);
      const jwt =JSON.parse(localStorage.getItem('jwt'));
  console.log(jwt)
  const [loading, setLoading]= useState(false)
    const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [picturex, setPicturex] = useState(null);
  const [imgData, setImgData] = useState(null);
  const message =JSON.parse(localStorage.getItem('message'));
      const [picture, setPicture] = useState("");
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [expirationDate ,SetExpirationDate]= useState("")
        const history = useHistory();
      const[date, setDate]=useState("")
      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = (data) => {
        validateSelectedFile();
        console.log(data,picture)
        submitForm ();
     
     
       
      }
      
  const Navgate=()=>{
    window.location.reload(true)
  }
      const submitForm = () => {
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description);
        formData.append("expirationDate", expirationDate);
        formData.append("picture", picture);
        formData.append("file", selectedFile);
       console.log(formData)
        axios
          .post("http://198.199.67.201:8080/Api/Promotion/CreatePromotion",formData, {
            headers: {
              'Content-Type':'Auto',
              "Authorization":`Bearer ${jwt}`,
            }})
          .then((res) => {
           
            swal("Successfully created", "success", {
              buttons: false,
              timer: 9000,
            })
            
            console.log(res)
            setPicture('');
            setTitle('');
            SetExpirationDate('');
            setDescription('')
            localStorage.setItem('message', JSON.stringify(res.data.message))
            const mess= localStorage.getItem('message')
            console.log(mess)
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
               localStorage.setItem('message', JSON.stringify(error.response.data['message']))
            const messx= localStorage.getItem('message')
            console.log('message',messx)
              console.log(error.response.data);
              swal(`${messx}`)
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
           
          })
      };
   
      const handleFileChange = (e) => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
          }
        if(e.target.files.length > 0){
          setSelectedFile(e.target.files[0]);
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
      console.log(handleFileChange)
  return (
      
    <div className="modalBackgroundPro" >

        <div className ='fresh-formPro'>     
        <div class="ribbon ribbon-top-left"><span style={{fontSize:"10px" }}>Promotion Registration</span></div>


        <form onSubmit={handleSubmit(onSubmit)}>
       
              <h1 className='sideXButtonPromotion'  onClick={() => {
              setOpenModal(false);
            }} style={{backgroundColor: isHovering ? 'transparent' : '',
            color: isHovering ? 'red' : '', }}   
            onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            
              <AiOutlineCloseCircle/></h1>
      
                <h1 className='promo'></h1>
              
                
             
          <div className='fresh-field-wrapper'> 
         
          <div className='fresh-field-wrapper'>
                <img className= "fresh-inputxPro" 
     
  
        src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
        style={{ display: isLoading ? "block" : "none" }}
      />
                <img className= "fresh-inputx" src={imgData}    style={{ display: isLoading ? "none" : "block" }}
        onLoad={onLoad} />
              <BsFillImageFill style={{ color: "#ffc107" }}/> <input type="file"  placeholder='Enter Amount'    {...register("photo", {
    required: {
      value: true,
      message: "Please Enter Your Photo",
      }
        })}
    
         onChange={handleFileChange} 
    
         />
          {errors.photo && <p className="text-error">{errors.photo.message}</p>}
        </div>
           <div className="space-between">
          
           
          </div>
          {isSuccess ? <p className="success-message">Validation successful</p> : null}
          <p className="text-error">{errorMsg}</p>
      </div>  <FontAwesomeIcon icon="user" className="fa" />
        <label>Title</label>    

        <div className='fresh-field-wrapper'>
              <input maxLength = "20" type="text" className= "fresh-inputPro" placeholder='Enter Your title' 
      {...register("title", {
        required: {
      value: true,
      message: "Please Enter Your Title",
     },
      maxLength: {
      value: 20,
      message: " maximum  20 characters"
          },
          minLength: {
            value: 5,
            message: " must have at least 5 characters"
                }
       })}
        onChange={(e) =>setTitle(e.target.value)} 
         />
             {errors.title&& <p className="text-error" >{errors.title.message}</p>}

           </div>
          <FontAwesomeIcon icon="lock" className="fa" />
           <label>Set Expiration Date</label>
 <div className='fresh-field-wrapper'>
<input type="date" className= "fresh-inputPro" placeholder='Enter Your title' value={expirationDate}
 {...register("date", { required: true, maxLength: 10 })}
 onChange={(e) =>SetExpirationDate(e.target.value)} 
 />
  
 {errors.date&& <p className="text-error">Enter Date</p>}
 </div>

 <FontAwesomeIcon icon="envelope" className="fa" />
 <label>Description</label>  
 <div className='fresh-field-wrapper'>
<input type="text" className= "fresh-input-textareaPro" placeholder='' value={description}
  {...register("Description", {
    required: {
      value: true,
      message: "Please Enter Your Description",
    },
    maxLength: {
      value: 100,
      message: " maximum 100 characters"
          },
          minLength: {
            value: 10,
            message: " must have at least 10 characters"
                }
  })}
 onChange={(e) =>setDescription(e.target.value)} 
 />
  {errors.Description&& <p className="text-error" >{errors.Description.message}</p>}
 
 </div>
 

 <div className='fresh-field-wrapper'>
 <button type='submit' className="fresh-buttonPro"  ><label>Add</label></button>
 </div>
 <div className='fresh-field-wrapper'>


 </div>
  </form>
    </div>
    </div>
  );
}

export default ModalProm;
