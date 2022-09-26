
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
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
        name:"",
        email: "faker.internet.email()",
        phone:" faker.phone.phoneNumber()",
        jobTitle: "faker.name.jobTitle()",
        company:" faker.company.companyName()",
        joinDate: "faker.date.past().toLocaleDateString('en-US')",
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}

function TranHistory() {
  const jwt =JSON.parse(localStorage.getItem('jwt'));
const summaryw=JSON.parse(localStorage.getItem('summary'));
console.log(summaryw)
  fetch("http://192.168.1.14:8080/api/Accounts/Transaction", {
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>FromAccountNumber</TableCell>
            <TableCell className={classes.tableHeaderCell}>AccountNumber</TableCell>
            <TableCell className={classes.tableHeaderCell}>transactionAmount</TableCell>
            <TableCell className={classes.tableHeaderCell}>transactionDateTime</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaryw.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((summaryw) => (
            <TableRow key={summaryw.fromAccountNumber}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={summaryw.name} src='.' className={classes.fromAccountNumber}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.accountNumber}>{summaryw.accountNumber}</Typography>
                         
                      </Grid>
                      
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{summaryw.fromAccountNumber}</Typography>
                  <Typography color="textSecondary" variant="body2">{summaryw.transaction_type}</Typography>
                </TableCell>
              <TableCell>{summaryw.transactionAmount}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((summaryw.transaction_type === 'Active' && 'green') ||
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
                        ((summaryw.transaction_type === 'Deposit' && 'green') ||
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
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={summaryw.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default TranHistory;