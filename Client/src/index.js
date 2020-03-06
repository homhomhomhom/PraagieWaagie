import React from 'react'
import ReactDOM from 'react-dom'
import firebase from './firebase'
import App from './Components/App'
import {
    BrowserRouter as Router,
    Switch, 
    Route,
    withRouter
} from 'react-router-dom'
import * as ServiceWorker from './serviceWorker'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import rootReducer from './reducers'
import {setUser, clearUser} from './actions'
import Spinner from './Spinner'
import Login from './Components/auth/Login'
import "semantic-ui-css/semantic.min.css";
import Register from './Components/auth/Register'
import Account from './Components/screens/Account/Account'
const store = createStore(rootReducer)
class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.props.setUser(user)
                this.props.history.push('/')
            }else{
                this.props.history.push('/owo')
                this.props.clearUser()
            }
        })
    }


    render(){
        return this.props.isLoading ? (
            <Spinner />
        ) : (
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/owo" component={Login} />
                <Route path="/umu" component={Register}/>
                <Route path="/omae" component={Account}/>
            </Switch>
        )
    }
}

const mapStateFromProps = state =>({
    isLoading: state.user.isLoading
}) 

const RootWithAuth = withRouter (
    connect(
        mapStateFromProps,
        {setUser, clearUser}
    )(Root)
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
ServiceWorker.unregister()