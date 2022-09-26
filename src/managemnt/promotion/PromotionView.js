import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "./styles.css";
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FaSearch } from "react-icons/fa";
import ModalProm from "./promotionRegistration";
import CornerRibbon from "react-corner-ribbon";
import Loading from "../../components1/merchant/Loading";
const PromoView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  const summaryw = JSON.parse(localStorage.getItem('promotions'));
  console.log(summaryw)
  const[loading , setLoading]=useState(false)
const [searchTerm, SetserchTerm]=useState("")
const [pageNumber, setPageNumber] = useState(0);
const [query , SetQuery]= useState("");

const [users, setUsers] = useState((summaryw== undefined?"-":summaryw).slice(0, 50));
function add8Dots(strings, limit)
{
  const dots = "...";
  if(strings.length > limit)
  {
    // you can also use substr instead of substring
    strings = strings.substr(0,limit) + dots;
  }

    return strings;
}
function add4Dots(string, limit)
{
  var dots = "...";
  if(string.length > limit)
  {
    // you can also use substr instead of substring
    string = string.substring(0,limit) + dots;
  }

    return string;
}

const myStyle={
  width: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis !important"
}

  useEffect(() => {
    loadUsers();
  }, []);
  const usersPerPage = 11;
  const pagesVisited = pageNumber * usersPerPage;
  
  const displayUsers = users
  const pageCount = Math.ceil(summaryw== null||summaryw==""?"-":summaryw.filter((summaryw) => {
    if (searchTerm === "") {
      return summaryw;
    } else if (
      summaryw.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return summaryw;
    }
    return false;
  }).length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const mex =JSON.parse(localStorage.getItem('message'));

console.log(mex)
  
  const [buttonText, setButtonText] = useState('Click');
  const [sortState, setSortState] = useState("none");
  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method:(a, b) => (a.title> b.title ? 1 : -1) },
    descending: { method: (a, b) => (a.title> b.title ? -1 : 1) },
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true)
    const result = await axios.get("http://198.199.67.201:8080/Api/Promotion/All",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
            
    }}).then((response) => {
      // Success 🎉
      
      localStorage.setItem('promotions', JSON.stringify(response.data.promotions))
      const mess= localStorage.getItem('promotions')
      console.log(mess)
      console.log(response.data.promotions);
  }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
     
    }).finally(()=>{
      setLoading(false)
    })
   
  };
  const blockUser = async id => {
    const result = await axios.get(`http://198.199.67.201:8080/Api/Accounts/Block/${id}`,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
            
    }}).then((response) => {
      // Success 🎉
      localStorage.setItem('message', JSON.stringify(response.data.message))
      const mess= localStorage.getItem('message')
      console.log(mess)
      console.log(response.data.message);
  }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
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

  const deleteUser = async id => {
    await axios.delete(`http://198.199.67.201:8080/Api/Promotion/${id}`,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).then((response) => {
      // Success 🎉
      
  }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  
    });;
    loadUsers();
  };
  const sort = summaryw== null||summaryw==""?"-":summaryw.sort(sortMethods[sortState].method)
  console.log(sort)
  
// () => deleteUser(user.id)
if (loading){
  return <Loading/>
}
  return (
    <div className="container">
       
       <div class="ribbon ribbon-top-right"><span>Promotion</span></div>
        <div className="search__bar">
          
         
         
    </div>
    
      <div className="py-10"> 
   
        <div className="App">
    
     
      {modalOpen && <ModalProm setOpenModal={setModalOpen} />}
    </div>
        <div className="search__bar12">
        <div > <input className="search__bar4" style={{outline:'none' , background: 'transparent' }} type="text" placeholder="Search" onChange={(e) => {
              SetserchTerm(e.target.value);
              changePage({ selected: 0 });
            }} /></div>
        </div>
        <button
       className="btn btn-success"
        onClick={() => {
          setModalOpen(true);
        }}
      >
       Add Promotion
      </button>
    
        <table class="table border shadow mw-100"  id="table-to-xls">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">PromoID</th>
              <th scope="col">Expiration Date</th>
              <th scope="col">Description</th>
              <th scope="col" >Picture</th>
              <th scope="col">Status</th>
              <th >Action</th>
            
            </tr>
          </thead>
          <tbody>
            {summaryw== null||summaryw==""?"-":summaryw.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
            }).sort(sortMethods[sortState].method).slice(pagesVisited, pagesVisited + usersPerPage).reverse().map((user, index) => (
              <tr>
                <th  scope="row">{index + 1}</th>
                <td>{user.title}</td>
                <td>{user.id}</td>
                <td>{user.expirationDate}</td>
                
                <td >{add8Dots(user.description , 10)}</td>
                <td >{add8Dots(user.picture , 10)}</td>
                
                <td>{user.status? "True" : "False"}</td>
                <td>
                 
                  <Link
                    class="btn btn-warning btn-sm"
                    to={`/Promos/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link className="btn btn-primary btn-sm" to={`/Promos/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-danger btn-sm"
                    onClick={() => swal({
                      title: "Are you sure?",
                      text: `Do You Want To Delete This Promotion ${user.title}`,
                
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                      })
                      .then((willDelete) => {
                      if (willDelete) {
                        swal(` ${deleteUser(user.id)}You have deleted ${user.title} Successfully`, {
                          icon: "success",
                        });
                      } else {
                        swal("You Canceled your Delete!");
                      }
                      })}
                  >
                   
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <select className="search__bar3" defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>Sort</option>
        <option value="ascending">Alphabetical</option>
        <option value="descending">Descending</option>
      </select>
        
      </div>
    
    </div>
  );
};

export default PromoView;