import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import emailjs from 'emailjs-com';

class Home extends Component {
    state = {
        yourName: '',
        crushName: '',
        percentData: ""
    }
    change1 = (event) => {
        this.setState({ yourName: event.target.value })
    }
    change2 = (event) => {
        this.setState({ crushName: event.target.value })
    }
    calculate = () => {
        axios({
            "method": "GET",
            "url": "https://love-calculator.p.rapidapi.com/getPercentage",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "love-calculator.p.rapidapi.com",
                "x-rapidapi-key": "9b8304711emsh4b1948c6cb443fep1a1fb7jsn36e92bc275f6",
                "useQueryString": true
            },
            "params": {
                "fname": this.state.yourName,
                "sname": this.state.crushName
            }
        })
            .then((response) => {
                this.setState({ percentData: response.data })
            this.send()
            })
            .catch((error) => {
                console.log(error)
            })
    }

      send = () => {
        const templateParams = {
            name: this.state.yourName,
            cname: this.state.crushName,
            percentage: this.state.percentData.percentage
        };
        emailjs.send('gmail','template_UYhnZQ5b', templateParams, 'user_1RUUikJxx9ptVCRz6kaTv')
	.then((response) => {
	   console.log('SUCCESS!', response.status, response.text);
	}, (err) => {
	   console.log('FAILED...', err);
	});       
    }
    
    render() {
        return (
            <React.Fragment>
                <section className="main">
                    {/* <div style={{paddingLeft:'5%', paddingRight:'5%'}}> */}
                    <h2>Welcome to this great invention of Doctor Love!</h2>
                    <p>To find out what the chances for you and your dream partner are, just fill in both full names (both first and last name) in the two text boxes below, and press Calculate.</p>

                    {/* </div> */}
                    <div className="background">
                        <form className="form" noValidate autoComplete="off" netlify>
                            <TextField onChange={(event) => this.change1(event)} id="outlined-basic" label="Your Name" variant="outlined" />
                            <TextField onChange={(event) => this.change2(event)} id="outlined-basic" label="Your Crush" variant="outlined" />
                            <Button onClick={this.calculate} id="submit" variant="contained" color="primary" disabled={this.state.yourName === '' || this.state.crushName === ''}> Calculate your Love</Button>
                        </form>

                        {this.state.percentData === "" ? null :
                        <div className="result">
                            <h1>Your Love Results</h1>
                            <h3>{this.state.yourName} and {this.state.crushName}</h3>
                            {/* <div className="heart"><img style={{ width: '100%', height: '100%', backgroundColor:'transperent' }} src={require('./he.jpg')}></img></div> */}
                            <h2>{this.state.percentData.percentage}%</h2>
                            <p>{this.state.percentData.result}</p>
                        </div>}
                      
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Home;
