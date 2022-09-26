import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { BiGroup,BiArrowFromBottom } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import * as ReactBootStrap from 'react-bootstrap'
import Loading from "../merchant/Loading";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import{ 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 }from '@material-ui/core';
const TransferHome= () => {
  
  const mexx =JSON.parse(localStorage.getItem('message'));
console.log(mexx)
const resp = null;
let summaryw = JSON.parse(localStorage.getItem('accounts')||null);

  const jwt =JSON.parse(localStorage.getItem('jwt'));
 
  console.log(summaryw)
  const [users, setUsers] = useState();

  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading]=useState(false)
  const [searchTerm, SetserchTerm]=useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [query , SetQuery]= useState("");
console.log(users)
  useEffect(() => {
    loadUsers();
  }, []);
  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;
  
  const displayUsers = users
  const pageCount = Math.ceil(summaryw==null?"-":summaryw.filter((users) => {
    console.log(summaryw)
    if (searchTerm === "") {
      return users;
    } else if (
      users.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()|| users.type.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return users;
    }
    return false;
  }).length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const loadUsers = async () => {
    setLoading(true);

    const result = await axios.get("http://198.199.67.201:8080/Api/Accounts/AllAccounts/",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
            
    }}).finally(() => {
      setLoading(false);
  }).then((response) => {
      // Success 🎉
      setErrorMessage('');
      localStorage.setItem('accounts', JSON.stringify(response.data.accounts))
      const mess= localStorage.getItem('accounts')
      console.log(mess)
      console.log(response.data.message);
  }).catch(function (error) {
   

      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        setErrorMessage(error.message);
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
      localStorage.setItem('summary', JSON.stringify(response.data.message))
      const mess= localStorage.getItem('summary')
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
    await axios.delete(`http://198.199.67.201:8080/Api/Accounts/AllTransactions/`,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).then((response) => {
      // Success 🎉
      
  }

  ).catch(function (error) {
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
  
    });
    loadUsers();
  };
// () => deleteUser(user.id)
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPageNumber(0);
};
if (loading) {
  return <Loading/>;
}
const renderErrorMessage = () => {
  return(
    <div>
           <h1>{`Something went wrong: ${errorMessage}`}</h1>
    </div>
  )
}

  return (
    
    <div className="container">
          {errorMessage.length && renderErrorMessage()}
      <div className="py-5"> 
      
      <div class="ribbon ribbon-top-rightx"><span style={{fontSize:"13px" }}>Transfers</span></div>
    
        <div className="search__bar12">
        <div > <input className="search__bar4" style={{outline:'none' , background: 'transparent' }} type="text" placeholder="Search"onChange={(e) => {
              SetserchTerm(e.target.value);
              changePage({ selected: 0 });
            }} /></div>
        </div>
        <Link className="btn btn-outline-light">
      <button className="btn btn-success"></button>
     </Link>
        <table class="table border shadow">
          <thead class="table-dark">
            <tr>
           
              <th>Action</th>
              <th scope="col">#</th>
              <th scope="col">User id</th>
              <th scope="col">Type</th>
              <th scope="col">AccountNumber </th>
              <th scope="col">Balance</th>
              <th scope="col">Commission</th>
              <th scope="col">Daily</th>
            
              <th scope="col">Blocked</th>
           
              
              
            
            </tr>
          </thead>
          <tbody>
            {summaryw==null?"-":summaryw.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) || val.type.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
            }).slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
              <tr>
               
                <td>
                  <Link className="btn btn-primary mr-2" to={`/Trasnfers/${user.user_id}`}>
                    View
                  </Link>
                 
                
                </td>
                <th scope="row">{index + 1}</th>
                <td>{user.user_id}</td>
                <td>{user.type}</td>
                <td>{user.accountNumber}</td>
                <td>{user.balance}</td>
                <td>{user.commission}</td>
                <td>{user.daily}</td>
               
                <td>{user.blocked ? "True" : "False"}</td>
                
                
                
              
              </tr>
            ))}
          </tbody>
        </table>
        <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export To Excel"
        color="white"
      />
      </div>
      <ReactPaginate
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TransferHome;
