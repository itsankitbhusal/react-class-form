import React, { Component } from "react";

class UserForm extends Component {
    state = {
        userInfo: {
            name: "",
            address: "",
            email: "",
            terms: false,
        },
        errorMessage: {
            name: "",
            address: "",
            email: "",
            terms: "",
        },
        error: true,
        userArray: [],
        showDetails: false
    }

    handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;

        if (key === "terms") {
            this.setState((prevState) => ({
                userInfo: {
                    ...prevState.userInfo,
                    terms: !this.state.userInfo.terms
                },
                errorMessage: {
                    ...prevState.errorMessage,
                    terms: ""

                }
            }))
        } else {
            this.setState((prevState) => (
                {
                    userInfo: {
                        ...prevState.userInfo,
                        [key]: value
                    },
                    errorMessage: {
                        ...prevState.errorMessage,
                        [key]: ""
                    }
                }
            ))
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let { name, address, email, terms } = this.state.userInfo;
        let errors = {};
        
        if (name === "") {
            errors.name = "Name is required!";
        }
        if (address === "") {
            errors.address = "Address is required!"
        }
        if (email === "") {
            errors.email = "Email is required!"
        }
        if (terms === false) {
            errors.terms = "Terms and conditions must be checked!"
        }
        if (name === "" || address === "" || email === "" || terms === "") {
            this.setState({
                error: true,
                errorMessage: errors
            })
            if (this.state.userArray.length > 0) {
                this.setState({
                    showDetails: true
                })
            } 
        } else {
            this.setState({
                error: false
            })
            this.setState({
                showDetails: true
            })
            this.state.userArray.push(this.state.userInfo);
            
            this.setState({
                userInfo: {
                    name: "",
                    address: "",
                    email: "",
                    terms: false,
                }
            })
        }
        console.log("show details: ", this.state.showDetails);
    }
    render() {
        let { name, address, email, terms } = this.state.userInfo;
        let { showDetails, error, errorMessage } = this.state;
        return (
            <div className=" col-12 mt-5 d-flex flex-column justify-content-center align-items-center">
                <form className=" mx-5 col-4" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" value={name} onChange={(e) => this.handleChange(e)} className="form-control" id="name" placeholder="Enter full name" />
                        {
                            errorMessage.name && (
                                <label className="text-danger ">{errorMessage.name}</label>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label for="address">Address</label>
                        <input type="text" name="address" value={address} onChange={(e) => this.handleChange(e)} className="form-control" id="address" placeholder="Enter address" />
                        {
                            errorMessage.address && (
                                <label className="text-danger small">{errorMessage.address}</label>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" value={email} onChange={(e) => this.handleChange(e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        {
                            errorMessage.email && (
                                <label className="text-danger small">{errorMessage.email}</label>
                            )
                        }
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" checked={terms} onChange={(e) => this.handleChange(e)} className="form-check-input" id="exampleCheck1" name="terms" />
                        <label className="form-check-label" for="exampleCheck1">Agree terms and conditions </label>
                        <br />
                        {
                            errorMessage.terms && (
                                <label className="text-danger small">{errorMessage.terms}</label>
                            )
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                    {showDetails && (
                <div className=" mx-5 col-4 mt-5">

                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Terms</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        showDetails && this.state.userArray.map((info, index) => (
                                            <tr key={index}>
                                                <th scope="row">{info.name}</th>
                                                <td>{info.address}</td>
                                                <td>{info.email}</td>
                                                <td>{info.terms && "✅"}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                    )}
            </div>
        )
    }
}
export default UserForm;