import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import scrollreveal from "scrollreveal";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const TransferViewId= () => {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "right",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      container py-4
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  const jwt =JSON.parse(localStorage.getItem('jwt'));
  const [searchTerm, SetserchTerm]=useState("")
  const [pageNumber, setPageNumber] = useState(0);
  const [sortState, setSortState] = useState("none");
  const [users, setUser] = useState([{
    accountNumber: "",
    fromAccountNumber: "",
    transactionAmount: "",
    transactionDateTime: "",
    transaction_type: "",
    transactionId: "",
  }]);
  const {user_id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
 


const changePage = ({ selected }) => {
  setPageNumber(selected);
};
  const pageCount = Math.ceil(users.filter((users) => {
    if (searchTerm === "") {
      return users;
    } else if (
      users.accountNumber.includes(searchTerm)|| users.transactionDateTime.includes(searchTerm)
    ) {
      return users;
    }
    return false;
  }).length / usersPerPage);

  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method:(a, b) => (a.accountNumber> b.accountNumber ? 1 : -1) },
    descending: { method: (a, b) => (a.accountNumber> b.accountNumber ? -1 : 1) },
  };
  const loadUser = async () => {
    
    const res = await axios.get(`http://198.199.67.201:8080/Api/Accounts/AllAccounts/${user_id}`
    ,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }})
    ;
    setUser(res.data);
    console.log(res.data)
    console.log(res)
    
  };
  return (
    <div className="container py-3">
      <Link className="btn btn-primary" to="/Trasnfers">
        back to Home
      </Link>
   
      <div className="search__bar12">
        <div > <input className="search__bar4" id="searchOne" style={{outline:'none' , background: 'transparent', display:'inline'}} type="text" placeholder="Search"onChange={(e) => {
              SetserchTerm(e.target.value);
              changePage({ selected: 0 });
            }} /></div>
        </div>
        <div class="ribbon ribbon-top-rightx"><span style={{fontSize:"13px" }}>Transfers</span></div>
        <div className="search__bar12">
        <div > <input className="search__bar4" id="searchTwo" style={{outline:'none' , background: 'transparent', display:'inline' }} type="date" placeholder="Search"onChange={(e) => {
              SetserchTerm(e.target.value);
              changePage({ selected: 0 });
            }} /></div>
         
        </div>
        <Link className="btn btn-outline-light">
      <button className="btn btn-success"></button>
     </Link>
      <table class="table border shadow"  id="table-to-xls">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              
              <th scope="col">From Your AccountNumber</th>
              <th scope="col">To AccountNumber</th>
              <th scope="col">TransactionAmount</th>
              <th scope="col">DateTime</th>
              <th scope="col">Type</th>
             
          
            
            </tr>
          </thead>
          <tbody>
            {users.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.accountNumber.includes(searchTerm)|| val.transactionDateTime.includes(searchTerm)){
                  return val;
                }
            }).sort(sortMethods[sortState].method).slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.fromAccountNumber}</td>
                <td>{user.accountNumber}</td>
                <td>{user.transactionAmount}</td>
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
        <option value="ascending">Numerical order</option>
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
      <ReactPaginate
        rowsPerPageOptions={[5, 10, 15,20,25]}
        previousLabel={"Previous"}
        nextLabel={"Next"}
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

export default TransferViewId;
