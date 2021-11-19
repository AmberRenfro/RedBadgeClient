import * as React from "react";
import "./signupLoginStyles.css";
import { Redirect } from 'react-router';

interface signupLoginProps {
    updateToken(newToken: string): void,
    updatePw(newPw: string): void,
    clearToken(): void,
    sessionToken: string | null,
    unhashedPw: string | null
}
 
interface signupLoginState {
    loginUsername: string,
    loginEmail: string,
    loginPassword: string,
    loginSuccess: boolean,
    registerUsername: string,
    registerEmail: string,
    registerPassword: string,
    registerSuccess: boolean,
    admin: boolean
}

interface UserJson {
    user: {
        username: string,
        email: string,
        password: string,
        sessionToken: string,
        admin: boolean
    }
}
 
class signupLogin extends React.Component<signupLoginProps, signupLoginState, UserJson> {
    constructor(props: signupLoginProps) {
        super(props);
        this.state = {
            loginUsername: "", 
            loginEmail: "", 
            loginPassword: "", 
            loginSuccess: false,
            registerUsername: "", 
            registerEmail: "", 
            registerPassword: "", 
            registerSuccess: false,
            admin: false
        };
        this.handleLoginEmailChange = this.handleLoginEmailChange.bind(this)
        this.handleRegisterEmailChange = this.handleRegisterEmailChange.bind(this)
        this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this)
        this.handleRegisterPasswordChange = this.handleRegisterPasswordChange.bind(this)
        this.handleRegisterUsernameChange = this.handleRegisterUsernameChange.bind(this)

    }

    handleRegisterSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch("http://localhost:3000/user/signup", {
            method: "POST",
            body: JSON.stringify({
                email: this.state.registerEmail,
                username: this.state.registerUsername,
                password: this.state.registerPassword,
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then((data: UserJson) => {
            console.log("Token :", data.user.sessionToken);
            this.props.updateToken(data.user.sessionToken);
            this.setState({
                registerSuccess: true,
                admin: data.user.admin
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleLoginSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: "POST",
            body: JSON.stringify({
                email: this.state.loginEmail,
                password: this.state.loginPassword
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then((data: UserJson) => {
            console.log("Token:", data.user.sessionToken);
            console.log("Admin:", data.user.admin )
            this.props.updateToken(data.user.sessionToken);
            this.props.updatePw(data.user.password)
            this.setState({
                loginSuccess: true,
                admin: data.user.admin
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleLoginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            loginEmail: e.target.value
        })
    }

    handleLoginPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            loginPassword: e.target.value
        })
    }
    
    handleRegisterPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            registerPassword: e.target.value
        })
    }

    handleRegisterUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            registerUsername: e.target.value
        })
    }

    handleRegisterEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            registerEmail: e.target.value
        })
    }
    
    signupButtonClick = () => {
        const userForms: any = document.getElementById('user_options-forms')
        userForms.classList.remove('show-forgotPass');
        userForms.classList.remove('bounceRight');
        userForms.classList.add('bounceLeft');
    }

    loginButtonClick = () => {
        const userForms: any = document.getElementById('user_options-forms')
        userForms.classList.remove('show-forgotPass');
        userForms.classList.remove('bounceLeft');
        userForms.classList.add('bounceRight');
    }

    render() { 
        return (  
            <>
                <section className="user-authentication">
                        <div className="user_options-container">
                            <div className="user_options-text">
                                <div className="user_options-unregistered">
                                <h2 className="user_unregistered-title">Don't have an account?</h2>
                                <p className="user_unregistered-text">Sign up for free and join in the conversation. What incredible travel destinations are awaiting your discovery?</p>
                                <button onClick={this.signupButtonClick} className="user_unregistered-signup" id="signup-button">Sign up</button>
                            </div>

                            <div className="user_options-registered">
                                <h2 className="user_registered-title">Have an account?</h2>
                                <p className="user_registered-text">Well? What are you waiting for? Join in the conversation and find your next adventure!.</p>
                                <button onClick={this.loginButtonClick} className="user_registered-login" id="login-button">Login</button>
                            </div>
                        </div>
        
                        <div className="user_options-forms" id="user_options-forms">
                            <div className="user_forms-login">
                                <h2 className="forms_title">Login</h2>
                                <form className="forms_form">
                                    <fieldset className="forms_fieldset">
                                        <div className="forms_field">
                                            <input type="email" value={this.state.loginEmail} onChange={this.handleLoginEmailChange} placeholder="Email" className="forms_field-input" required autoFocus />
                                        </div>
                                        <div className="forms_field">
                                            <input type="password" value={this.state.loginPassword} onChange={this.handleLoginPasswordChange} placeholder="Password" className="forms_field-input" required />
                                        </div>
                                    </fieldset>
                                    <div className="forms_buttons">
                
                                        <button type="submit" onClick={this.handleLoginSubmit} className="forms_buttons-action">Login</button>
                                        <button className="forms_buttons-mb-button" id="signup-button-mb">Sign up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="user_forms-signup">
                                <h2 className="forms_title">Sign Up</h2>
                                <form className="forms_form">
                                    <fieldset className="forms_fieldset">
                                        <div className="forms_field">
                                            <input type="username" placeholder="Username" value={this.state.registerUsername} onChange={this.handleRegisterUsernameChange} className="forms_field-input" required />
                                        </div>
                                        <div className="forms_field">
                                            <input type="email" value={this.state.registerEmail} onChange={this.handleRegisterEmailChange} placeholder="Email" className="forms_field-input" required />
                                        </div>
                                        <div className="forms_field">
                                            <input type="password" value={this.state.registerPassword} onChange={this.handleRegisterPasswordChange} placeholder="Password" className="forms_field-input" required />
                                        </div>
                                    </fieldset>
                                    <div className="forms_buttons">
                                        <button type="submit" onClick={this.handleRegisterSubmit} className="forms_buttons-action">Sign up</button>
                                        <button className="forms_buttons-mb-button" id="login-button-mb">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="user_forms-forgot">
                                <h2 className="forms_title">Forgot Password</h2>
                                <form className="forms_form">
                                    <fieldset className="forms_fieldset">
                                        <div className="forms_field">
                                            <input type="email" placeholder="Email" className="forms_field-input" required autoFocus />
                                        </div>
                                    </fieldset>
                                    <div className="forms_buttons">
                                        <button type="submit" className="forms_buttons-action">Send reset link</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.loginSuccess === true ? <Redirect to="/" /> : <> </>}
                {this.state.registerSuccess === true ? <Redirect to="/" /> : <></>}
            </>
        );
    }
}
 
export default signupLogin;