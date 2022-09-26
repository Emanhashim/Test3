import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FaSearch } from "react-icons/fa";
import "./agent.css"
import Loading from "../merchant/Loading";
const Agentx = () => {
 
const [searchTerm, SetserchTerm]=useState("")
const [pageNumber, setPageNumber] = useState(0);
const [query , SetQuery]= useState("");


const [users, setUser] = useState([]);
const [loading, setLoading] = useState(false);
const data = [5,1,6,9,3];



  useEffect(() => {
    loadUsers();
  }, []);
  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  
  const displayUsers = users
  const pageCount = Math.ceil(users.filter((users) => {
    if (searchTerm === "") {
      return users;
    } else if (
      users.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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
setLoading(true)
    const result = await axios.get("http://198.199.67.201:8080/Api/Accounts/Agents",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {
      setLoading(false);
  });
    setUser(result.data.reverse());
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
    await axios.delete(`http://198.199.67.201:8080/Api/Accounts/Agent/${id}`,{ headers: {
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
  
    });
    loadUsers();
  };
  const sort = users.sort(sortMethods[sortState].method)
  console.log(sort)
  
// () => deleteUser(user.id)


if (loading) {
  return <Loading/>;
}
  return (
    <div className="container">
        <div className="search__bar">
          
         
         
    </div>
      <div className="py-5"> 
    
        <div class="ribbon ribbon-top-rightx"><span>Bazra Agents</span></div>

        <div className="search__bar12">
        <div > <input className="search__bar4" style={{outline:'none' , background: 'transparent' }} type="text" placeholder="Search"  onChange={(e) => {
              SetserchTerm(e.target.value);
              changePage({ selected: 0 });
            }} /></div>
        </div>
        <Link className="btn btn-outline-light" to="/signup">
      <button className="btn btn-success">Add Agent</button>
     </Link>
    
        <table class="table border shadow"  id="table-to-xls">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Company Name</th>
              <th scope="col">Licence Number</th>
              <th scope="col">Business Number</th>
             
              <th>Action</th>
            
            </tr>
          </thead>
          <tbody>
          {users.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.firstName.toLowerCase().includes(searchTerm.toLowerCase())|| val.username.includes(searchTerm)|| val.licenceNumber.includes(searchTerm)){
                  return val;
                }
            }).sort(sortMethods[sortState].method).slice(pagesVisited, pagesVisited + usersPerPage).map((user, index,i) => (
              <tr>
                <th  scope="row">{index + 1}</th>
                <td key={i}>{user.firstName}</td>
                <td>{user.username}</td>
                <td>{user.companyName}</td>
                <td>{user.licenceNumber}</td>
                <td>{user.businessLNum}</td>
                
                <td>
                  <Link class="btn btn-primary mr-2" to={`/agents/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-warning"
                    to={`/agents/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-info"
                    onClick={() => swal({
                      title: "Are you sure?",
                      text: `  ${user.username}`,
                
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                      })
                      .then((willDelete) => {
                      if (willDelete) {
                        swal(`${blockUser(user.id)} ${mex} `, {
                          icon: "success",
                        });
                      } else {
                        swal("You Have Cancelled your Block!");
                      }
                      })}
                    
                  >
                    Freez
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => swal({
                      title: "Are you sure?",
                      text: `Do You Want To Delete This Account ${user.username}`,
                
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                      })
                      .then((willDelete) => {
                      if (willDelete) {
                        swal(` ${deleteUser(user.id)}You have deleted ${user.username} Successfully`, {
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
      </div>
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

export default Agentx;
