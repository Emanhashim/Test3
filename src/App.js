import DashboardApp from "./components/DashboardApp";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';

import AdminTransferx from "./components/AdminTransferx";
import LoginMA from "./components/login/LoginAdmin";
import SignupAM from "./components/signUp/SignupAgent.js"

import MTable from "./MTable";
import UserForm from "./formStep/UserForm";
import Mangemntx from "./managemnt/Mangemntx";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Threshold from "./managemnt/Threshold";
import AddUser from "./components1/users/AddUser";
import EditUser from "./components1/users/EditUser";
import User from "./components1/users/User";
import Home from "./components1/pages/Home";
import About from "./components1/pages/About";
import Contact from "./components1/pages/Contact";
import Navbar from "./components1/layout/Navbar";

import AddAgent from "./components1/agent/AddAgent";
import AgentView from "./components1/agent/AgentView";
import Agentx from "./components1/agent/Agentx";
import EditAgent from "./components1/agent/EditAgent";

import AddMerchant from "./components1/merchant/AddMerchant"
import MerchantHome from "./components1/merchant/MerchantHome";

import MerchantMainView from "./components1/merchant/MerchantMainView";

import EditMerchant from "./components1/merchant/EditMerchant";

import Signup from "./components/signUp/Signup";
import SignupM from "./components/signUp/SignupMerchant";
import TransferHome from "./components1/TransferPerHisto/TransferHome";
import TransferViewId from "./components1/TransferPerHisto/TransferViewId";

import PromoView from "./managemnt/promotion/PromotionView";
import PromoEdit from "./managemnt/promotion/PromotionEdit";

import SecurityView from "./managemnt/securityQue/SecurityView";

import SecurityQues from "./managemnt/securityQue/SecurityQues"
import PromoList from"./managemnt/promotion/PromotionList"
import SecurityEdit from"./managemnt/securityQue/SecurityEdit"
import DashMangent from "./managemnt/DashMangent";
import BankAdd from "./managemnt/bankmanagemnt/BankAdd"
import BankListView from "./managemnt/bankmanagemnt/BankListView";
import Icons from "./Icons";
import Loading from "./components1/merchant/Loading";
import TransactionFee from "./components1/transactionFee/TransactionFee";
import LoginApi from "./components/api/LoginApi";
import "./index.css"
import SettingList from "./components/settings/SettingList"
import SettingMangmentStyle from "./components/settings/SettingMangmentStyle";
import Api from "./components/api/Api";
import AuthenticationType from "./components/settings/Authentication/AuthenticationType"
import AuthenticationListView from "./components/settings/Authentication/AuthenticationListView";
import TransactionFeeManagment from"./managemnt/TransactionFeeManagment/TransactionFeeManagment"
function App() {
  const jwt = localStorage.getItem('jwt');
 if(!jwt){
  return <LoginMA/>
 }
  
  return (
    
    <>


      <div className="dashboard">
      <Router>

      <Sidebar />
 
      <Switch>

          <Route exact path="/home1" component={Home} />
          <Route exact path="/about" component={About} />
        
          <Route exact path="/myagent" component={Agentx} />
          <Route exact path="agents/add/" component={AddAgent} />
          <Route exact path="/agents/edit/:id" component={EditAgent} />
          <Route exact path="/agents/:id" component={AgentView} />
          
          <Route exact path="/mymerchant" component={MerchantHome} />
          <Route exact path="merchants/add/" component={AddMerchant} />
          <Route exact path="/merchants/edit/:id" component={EditMerchant} />
          <Route exact path="/merchants/:id" component={MerchantMainView} />


          <Route exact path="/Trasnfers" component={TransferHome} />
          <Route exact path="/Trasnfers/:user_id" component={TransferViewId} />

          <Route exact path="/contact" component={Contact} />
          <Route exact path="users/add/" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />
  
      <Route path='/signup' component={SignupAM} />  
      <Route path='/signupm' component={SignupM} /> 
      <Route path='/signupU' component={Signup} /> 
   
      <Route path='/amt' component={AdminTransferx} /> 
      
      <Route path='/logina' component={LoginMA} />  
      <Route path='/dashboard' component={DashboardApp} /> 
      <Route path='/Mtable' component={MTable} />
      <Route path='/Mangemnt' component={Mangemntx} />
      <Route path='/dashManagent' component={DashMangent} />
      <Route path='/UserForm' component={UserForm} />
      <Route path='/Threshold' component={Threshold} />

     
      <Route path='/PromoView' component={PromoView} />
      <Route exact path="/Promos/edit/:id" component={PromoEdit} />
      <Route exact path="/Promos/:id" component={PromoList} />

      <Route path='/Security' component={SecurityQues} />
      <Route path='/SecurityV' component={SecurityView} />
      <Route path='/Securitys/edit/:id' component={SecurityEdit} />

      <Route path='/Bank' component={BankAdd} />
      <Route path='/BankListView' component={BankListView} />
      <Route path='/Icons' component={Icons} />

      <Route path='/Api' component={Api} />
      <Route path='/Transaction_Fee' component={TransactionFee} />
      <Route path='/TransactionFeeManagment' component={TransactionFeeManagment} />


      <Route path='/SettingList' component={SettingList} />
      <Route path='/SettingtStyle' component={SettingMangmentStyle} />
      <Route path='/AuthenticationType' component={AuthenticationType} />
      <Route path='/AuthenticationListView' component={AuthenticationListView} />



      TransactionFeeManagment
        </Switch>
        </Router>
      </div>
      
  
    </>
  );
}

export default App;
