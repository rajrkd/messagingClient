import React from 'react';
import axios from 'axios';


class InstagramAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            instagramAccounts:[],
            linkedAccounts:[]
        }
    }
    //navigateTo(path) {
    //    this.props.history(path);
    //}
    //history = useNavigate();
    async getAccounts(req,res) {
        this.setState({ loading: true})
        try {
            const token = localStorage.getItem('token');
            console.log("get token ", token);
            
            const response = await axios.get('http://localhost:5000/accounts/igPages',
                    { headers: { 'Content-Type': 'application/json','Authorization': token } });
            console.log("Respo ",response.data);
            const result = await response.data
            this.setState({
                        loading:false,
                        instagramAccounts:result
            });
                  
        }
        catch(e) {
            console.log("error while fetching instagram accounts",e);
        }
    }
    componentDidMount() {
        this.getAccounts();
    }
    handleAddAccounts = (accounts,e) => { 
        e.preventDefault();      
        console.log("got ",accounts);
        
        const token = localStorage.getItem('token');
        //console.log("tt ",token);
        if (accounts.length > 0) {
            var response =  axios.post('http://localhost:5000/accounts/add-igAccount', {accounts },
                { headers: { 'Content-Type': 'application/json','Authorization': token }});
            console.log("some ", response.data);
        //this.navigateTo('/dashboard');
        }
        else {
                console.log("Nothing to Add");
                alert("No accounts to Add!. Back to Main Page");
        }
        //return <redirect to='/dashboard'/>;
        window.location.href='/dashboard';
    };

    render() {
        
        const { instagramAccounts } = this.state;
        var unsavedAccounts = [];
        var ids = JSON.parse(localStorage.getItem('accountIds'));
        console.log("ids ",ids);
        
        if (instagramAccounts.length > 0) {
            var idx = 0;
            for (var i=0; i < instagramAccounts.length; i++) {
                var count = 0;
                for (var j=0; j< ids.length; j++) { //check if account already saved
                    console.log(ids[j], ' id ', instagramAccounts[i].id);
                    var igid = ids[j].toString();
                    var instaid = instagramAccounts[i].id;
                    if (instaid === igid){
                        console.log("id in");
                        count += 1;  
                    } 
               }
               if (count === 0) { // account not added, so add it to unsaved accounts
                console.log("index ",idx);
                unsavedAccounts[idx] = instagramAccounts[i];
                idx += 1;
               }
            }
            //this.setState ({
           //    linkedAccounts : unsavedAccounts
           // });
        }
        else {
            unsavedAccounts = "";
        }
        ids = "";
        //unsavedAccounts = Object.entries(unsavedAccounts);
        console.log("ac ",unsavedAccounts);    
        return(
        <div>
          <h3><p> Your Instagram Accounts.</p></h3><br/>
          <form id="acctForm" onSubmit={(e) =>this.handleAddAccounts(unsavedAccounts,e)}>
          <table border={3} width={'50%'}>
            <thead><tr><th> Instagram Id</th>
            <th> Instagram Username</th>
            </tr></thead><tbody>
            {
                unsavedAccounts.length ?
                unsavedAccounts.map((recipient,idx) => (
                <tr key={recipient.id}><td>{recipient.id}</td><td> {recipient.username}</td></tr>
                ))

                : <tr><td>Loading ...</td></tr>           
            }
            </tbody>
            </table>
            <button name="add" type="submit">Add Instagram Accounts</button>
            </form>
        </div>
        );
    }

}
export default InstagramAccounts;
/*
{ 
    this.unsavedAccounts.length ?
    this.unsavedAccounts.map((recipient,idx) => (
  <tr key={recipient.id}><td>{recipient.id}</td><td> {recipient.username}</td></tr>
))

 : <tr><td>Loading ...</td></tr>

}*/