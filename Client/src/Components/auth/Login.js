import React from 'react'
import firebase from '../../firebase'
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Icon,
    Label,
    Modal
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ParticleContainer from '../Containers/ParticleContainer'
export default class Login extends React.Component{
    state = {
        email:"",
        password:"",
        errors:[],
        reset:false,
        loading:false,
        auth:firebase.auth(),
        usersRef:firebase.database().ref("users"),
        user: firebase.auth().currentUser,
        provider: new firebase.auth.GoogleAuthProvider()
    }
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)
    
    handleChange = event =>{
        this.setState({ [ event.target.name ]: event.target.value})
    }

    resetPassword = event =>{
        event.preventDefault()
        this.state.auth.sendPasswordResetEmail(this.state.email).then(() =>{
            console.log('Email send')
        }).catch(error =>{
            console.log(error)
        })
    }

    openReset = () => this.setState({reset:true})
    closeReset =() => this.setState({reset:false})

    handleSubmit = event =>{
        event.preventDefault()
        if(this.isFormValid(this.state)){
            this.setState({errors:[], loading:true})
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err =>{
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading:false
                    })
                })
        }
    }

    isFormValid = ({email, password})=> email && password

    handleInPutError = (errors, inputName) =>{
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : ""
    }

    logInGoogle= ()=>{
        firebase.auth().signInWithRedirect(this.state.provider)
        .then((result) =>{
            if(result.credential){
                const token = result.credential.accessToken
                console.log(result)
            }   
        })
    }


    render(){
        const {email, errors, password, loading} = this.state
        return(
            <div>
                <ParticleContainer/>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h1" icon color="red" textAlign="center">
                            <Icon name="sign-in" color="red"/>
                            Login to GLU-praag
                        </Header>
                        <Form onSubmit={this.handleSubmit} size="large">
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="e-mail"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInPutError(errors, "mail")}
                                type="email"
                            />
                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="password"
                                onChange={this.handleChange}
                                value={password}
                                className={this.handleInPutError(errors, "password")}
                                type="password"
                            />
                            <Button
                                disabled={loading}
                                className={loading ? "loading" : ""}
                                color="white"
                                fluid
                                size="large"
                            >
                                Login
                            </Button>
                            <br/>
                            <Link to="/umu"><Button fluid size="large">Register</Button></Link>
                            <br/>
                            <Button icon onClick={this.logInGoogle} labelPosition="left">
                                <Icon name="google"/>
                                Login with Google
                            </Button>
                            <Button onClick={this.openReset}>Forgot password</Button>
                        </Form>
                        <Modal open={this.state.reset} onClose={this.closeReset} size="mini">
                        <Modal.Header>
                            Wachtwoord vergeten
                        </Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.resetPassword} size="mini">
                                <Form.Input
                                    fluid
                                    name="email"
                                    icon="mail"
                                    placeholder="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    type="email"
                                    iconPosition="left"
                                />
                                <Button 
                                    color="grey"
                                    fluid
                                    size="large"
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}