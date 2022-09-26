import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CornerRibbon from "react-corner-ribbon";
import { FaSearch } from "react-icons/fa";
import Loading from "../merchant/Loading";
const TransactionFee= () => {
const [searchTerm, SetserchTerm]=useState("")
const [pageNumber, setPageNumber] = useState(0);

const [query , SetQuery]= useState("");
const summaryw = JSON.parse(localStorage.getItem('transaction'));

const [users, setUser] = useState(summaryw.slice(0, 50));
const [loading, setLoading] = useState(false);
const totalTransactionfee= JSON.parse(localStorage.getItem('totalTransactionfee' == undefined?"-":'totalTransactionfee'))
  useEffect(() => {
    loadUsers();
  }, []);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  const displayUsers = users
  const pageCount = Math.ceil(users.filter((users) => {
    if (searchTerm === "") {
      return users;
    } else if (
      users.fromAccountNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
  
  const jwt =JSON.parse(localStorage.getItem('jwt'));

  const [buttonText, setButtonText] = useState('Click');
  const [sortState, setSortState] = useState("none");
  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method:(a, b) => (a.firstName> b.firstName ? 1 : -1) },
    descending: { method: (a, b) => (a.firstName> b.firstName ? -1 : 1) },
  };
  useEffect(() => {
    loadUsers();
  }, []);


 
  const loadUsers = async () => {
    setLoading(true);
    const res = await axios.get("http://198.199.67.201:8080/Api/Accounts/AllTransactions/",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {
      setLoading(false);
  }).then((response) => {
    // Success 🎉
    
    localStorage.setItem('transaction', JSON.stringify(response.data.transaction))
    const mess= localStorage.getItem('transaction')
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
    await axios.delete(`http://198.199.67.201:8080/Api/Accounts/Merchant/${id}`,{ headers: {
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
  const sort = users.sort(sortMethods[sortState].method)
  console.log(sort)
  
// () => deleteUser(user.id)

if (loading) {
  return <Loading/>;
}
  return (
    <div className="container rounded-pill"  >
       
      <div className="py-5"> 
          <div className="search__bar">
          
         
         
    </div>
 
    <div class="ribbon ribbon-top-right"><span> Transfer</span></div>
        <div className="search__bar12">
        <div > <input className="search__bar4" style={{outline:'none' , background: 'transparent' }} type="text" placeholder="Search" onChange={(e) => {
              SetserchTerm(e.target.value);
              changePage({ selected: 0 });
            }} /></div>
        </div>
       
    
   
    
        <table class="table shadow-lg p-3 mb-5 bg-white rounded "  id="table-to-xls">
          <thead class="table-dark border-warning ">
            <tr>
              <th scope="col">#</th>
                 
              <th scope="col">From Account Number</th>
              <th scope="col">To Account Number</th>
              <th scope="col">Transaction Amount</th>
              <th scope="col">Transaction Fee</th>
              <th scope="col">DateTime</th>
              <th scope="col">Type</th>
            
            </tr>
          </thead>
          <tbody>
            {users.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.accountNumber.includes(searchTerm)|| val.fromAccountNumber.includes(searchTerm)){
                  return val;
                }
            }).sort(sortMethods[sortState].method).slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.fromAccountNumber}</td>
                <td>{user.accountNumber}</td>
                <td>{user.transactionAmount}</td>
                <td>{user.transactionAmount * (1 - 0.99)}</td>
                <td>{user.transactionDateTime}</td>
                <td class="badge badge-primary" style={{
                        backgroundColor: 
                        ((user.transaction_type === 'Deposit' && 'green') ||
                        (user.transaction_type === 'Transfer' && 'blue') ||
                        (user.transaction_type === 'withdraw' && 'orange'))
                    }}>{user.transaction_type}</td>
            
                
                <td>
               
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
       
      </div>
      <button className="btn btn-success rounded-2 shadow-lg">Total Transfer Fee <h4>{totalTransactionfee}</h4></button>
      <ReactPaginate
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
  );
};

export default TransactionFee;
