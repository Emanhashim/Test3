import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import './pagination.css'
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loading from "../merchant/Loading";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUser] = useState([]);
  const jwt =JSON.parse(localStorage.getItem('jwt'));

  const mex =JSON.parse(localStorage.getItem('message'));
  const [sortState, setSortState] = useState("none");
  const [pageNumber, setPageNumber] = useState(0);
const [query , SetQuery]= useState("");
const [searchTerm, SetserchTerm]=useState("")
const [searchTermx, SetserchTermx]=useState("")
  useEffect(() => {
    loadUsers();
  }, []);
  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  
  const displayUsers = users
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method:(a, b) => (a.firstName> b.firstName ? 1 : -1) },
    descending: { method: (a, b) => (a.firstName> b.firstName ? -1 : 1) },
  };
  const loadUsers = async () => {
    setLoading(true);
    const result = await axios.get("http://198.199.67.201:8080/Api/Accounts/User",{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).finally(() => {
      setLoading(false);
  });;
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
    await axios.delete(`http://198.199.67.201:8080/Api/Accounts/User/${id}`,{ headers: {
      'Content-Type':'application/json',
            "Accept":"application/json",
            "Authorization":`Bearer ${jwt}`
    }}).then((response) => {
      // Success 🎉
    
      console.log(response);
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
  if (loading) {
    return <Loading/>;
  }
// () => deleteUser(user.id)
  return (
    <div className="container">
        
      <div className="py-5"> 
      <div class="ribbon ribbon-top-rightx"><span> Customers</span></div>
    
        <div className="search__bar12">
        <div > <input   icon="search" className="search__bar4" style={{outline:'none' , background: 'transparent' }}  type="search" placeholder="Search" onChange={(e)=> SetserchTerm(e.target.value)} />
        
        </div>
        </div>
        <Link className="btn btn-outline-light" to="/signupU">
      <button className="btn btn-success">Add User</button>
     </Link>
        <table class="table border shadow" id="table-to-xls">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">BirthDay</th>
              <th scope="col">Blocked</th>
              <th>Action</th>
            
            </tr>
          </thead>
          <tbody>
            {users.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if(
                val.firstName.toLowerCase().includes(searchTerm.toLowerCase())|| val.username.includes(searchTerm)|| val.email.includes(searchTerm)){
                  return val;
                }
            }).sort(sortMethods[sortState].method).slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.birthday}</td>
                 <td>{user.blocked ? "True" : "False"}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-warning"
                    to={`/users/edit/${user.id}`}
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
                        swal(`You have delete ${deleteUser(user.id)} ${user.username} Successfully`, {
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

export default Home;
