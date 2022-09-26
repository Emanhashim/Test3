import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "./Securitystyles.css";
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SecurityModal from "./SecurityModal";
import { FaSearch } from "react-icons/fa";
import CornerRibbon from "react-corner-ribbon";

const SecurityView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  const summaryw = JSON.parse(localStorage.getItem('questions'));
  console.log(summaryw)
const [searchTerm, SetserchTerm]=useState("")
const [pageNumber, setPageNumber] = useState(0);
const [query , SetQuery]= useState("");

const [users, setUsers] = useState(summaryw.slice(0, 50));


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
  const pageCount = Math.ceil(users.filter((users) => {
    if (searchTerm === "") {
      return users;
    } else if (
      users.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return users;
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
    const result = await axios.get("http://198.199.67.201:8080/Api/Question/All",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
            
    }}).then((response) => {
      // Success 🎉
      
      localStorage.setItem('questions', JSON.stringify(response.data.questions))
      const mess= localStorage.getItem('questions')
      console.log(mess)
      console.log(response.data.questions);
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
    await axios.delete(`http://198.199.67.201:8080/Api/Question/${id}`,{ headers: {
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
        alert("faild")
        console.log(error.response.headers);
      } else if (error.request) {
        alert("faild")
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  
    });;
    loadUsers();
  };
  const sort = users.sort(sortMethods[sortState].method)
  console.log(sort)
  
// () => deleteUser(user.id)
  return (
    
    <div className="container">
  
            <div class="ribbon ribbon-top-right"><span>Question</span></div>
        <div className="search__bar">
          
    
        {modalOpen && <SecurityModal setOpenModal={setModalOpen} />}  
    </div>
    
      <div className="py-2"> 
     
      <div className="App">
      
      </div>
        <h1 className="main_headerP">  </h1>
        

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
   Add Question
      </button>
    
 
        <table class="table border shadow "  id="table-to-xls">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col">Language</th>
              <th scope="col">Status</th>
              
              <th >Action</th>
            
            </tr>
          </thead>
          <tbody>
            {summaryw.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
            }).sort(sortMethods[sortState].method).slice(pagesVisited, pagesVisited + usersPerPage).reverse().map((user, index) => (
              <tr>
                <td scope="row">{index + 1}</td>
                <td>{user.question}</td>
                <td>{user.language}</td>
                <td>{user.status? "Used" : " Unused"}</td>
                
                <td>
                 
                  <Link
                    class="btn btn-warning btn-sm"
                    to={`/Securitys/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-info btn-sm"
                    onClick={() => swal({
                      title: "Are you sure?",
                      text: `  ${user.username}`,
                
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                      })
                     }
                    
                  >
                    Freez
                  </Link>
                  <Link
                    class="btn btn-danger btn-sm"
                    onClick={() => swal({
                      title: "Are you sure?",
                      text: `Do You Want To Delete This Security Question ${user.question}`,
                
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                      })
                      .then((willDelete) => {
                      if (willDelete) {
                        swal(` ${deleteUser(user.id)}You have deleted ${user.question} Successfully`, {
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
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export To Excel"
        color="white"
      />
      <div className=""> <ReactPaginate
        rowsPerPageOptions={[5, 10, 15,20,25]}
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      
      </div>
     
      </div>
    
    </div>
  );
};

export default SecurityView;