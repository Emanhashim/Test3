
import React ,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./Form1.css"
import scrollreveal from "scrollreveal";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {BiRotateLeft } from "react-icons/bi";
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

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 1500,
     
    },
    tableContainer: {
        borderRadius: 15,
        margin: '0.001px 100px 10px 10px',
        maxWidth: 1500,
       
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

let summaryw = [], STATUSES = ['Active', 'Pending', 'Blocked'];
for(let i=0;i<14;i++) {
    summaryw[i] = {
        name: "",
        email:"",
        phone: "",
        jobTitle: "",
        company: "",
        joinDate: "",
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}

function MTable() {

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .form-containerxc
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
 
  const jwt =JSON.parse(localStorage.getItem('jwt'));
const summaryw=JSON.parse(localStorage.getItem('summary'));
console.log(summaryw)
const [users, setUsers] = useState(summaryw.slice(0, 50));
const [query , SetQuery]= useState("");
console.log(summaryw.filter(summaryw=>summaryw.fromAccountNumber.includes("10")))
  fetch("http://198.199.67.201:8080/Api/Accounts/AllTransactions", {
  method: "GET",
   headers: {
    'Content-Type':'application/json',
          "Accept":"application/json",
          "Authorization":`Bearer ${jwt}`
  }
})
.then(response => response.json())
.then(response => {
    localStorage.setItem('summary', JSON.stringify(response['summary']));
    const summary = localStorage.getItem('summary')
      console.log(summary)
      
   
    
  this.setState({
    friends: response
    
  })
 
})
.catch(err => { console.log(err); 
});
 
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const reloadPage = () => {
    window.location.reload()
  }
  return (
    <div className='form-containerxc'>
      <div className="search__bar12">

          <input className="search__bar1" type="text" placeholder="Search" onChange={(e)=> SetQuery(e.target.value)} />
         
          <h4 className="search__bar" ></h4> 
     
    </div>

    <TableContainer component={Paper} className={classes.tableContainer}>
   
      <Table className={classes.table} aria-label="simple table" id="table-to-xls">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>FromAccountNumber</TableCell>
            <TableCell className={classes.tableHeaderCell}>To Account</TableCell>
            <TableCell className={classes.tableHeaderCell}> Amount</TableCell>
            <TableCell className={classes.tableHeaderCell}>DateTime</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaryw.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(summaryw=>summaryw.transactionDateTime.includes(query)).map((summaryw, index) => (
            <TableRow key={summaryw.fromAccountNumber}>
              <TableCell>
             
                  <Grid container>
              
                      <Grid item lg={2}>
                          <Avatar alt={summaryw.name} src='.' className={classes.fromAccountNumber}/>
                          {index+1}
                      </Grid>
                      
                      <Grid item lg={10}>
                          <Typography className={classes.accountNumber}>{summaryw.accountNumber}</Typography>
                         
                      </Grid>
                      
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{summaryw.fromAccountNumber}</Typography>
            
                </TableCell>
              <TableCell>{summaryw.transactionAmount}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((summaryw.transaction_type === 'Active' && 'green' ) ||
                        (summaryw.transaction_type === 'Pending' && 'blue') ||
                        (summaryw.transaction_type === 'Blocked' && 'orange'))
                    }}
                  >{summaryw.transactionDateTime}</Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((summaryw.transaction_type === 'Deposit' && 'green' )||
                        (summaryw.transaction_type === 'Transfer' && 'blue') ||
                        (summaryw.transaction_type === 'withdraw' && 'orange'))
                    }}
                  >{summaryw.transaction_type}</Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15,20,25]}
            component="div"
            count={summaryw.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export To Excel"
        color="white"
      />
    </TableContainer>
    </div>
  );
}

export default MTable;