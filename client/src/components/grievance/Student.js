import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Jumbotron } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Badge} from 'reactstrap';
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


class Student extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: '1',
      tooltipOpen: false,
      name: '',
      email: '',
      number: '',
      phoneNumber: '',
      address:'',
      department:'',
      value:'Ist',
      message: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChanges = this.onChanges.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggles = this.toggles.bind(this)
  }

  toggle(tab) {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}

toggles() {
 this.setState({
   tooltipOpen: !this.state.tooltipOpen
 });
}

  radioChange = e => {
    this.setState({value: e.target.value});
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value })
  }

  onChanges = e => {
    this.setState({ value: e.target.value });
  }

  async handleSubmit(e) {
     e.preventDefault()

    const { name, email,number, phoneNumber, address, department, year, message } = this.state;

    await axios.post('/api/form2', {
      name,
      email,
      number,
      phoneNumber,
      address,
      department,
      year,
      message
    })
  };


  render() {
     return (
       <div className="contaner">
       <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === '1' })}
          onClick={() => { this.toggle('1'); }}
        >
          Student Grievance Form
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === '2' })}
          onClick={() => { this.toggle('2'); }}
        >
          More Forms
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={this.state.activeTab}>
      <TabPane tabId="1">
        <Row>
          <Col sm="12">
            <h4>Grievance Form</h4>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="2">
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>SC/ST Grievance Form</CardTitle>
              <CardText>Click Below to Open SC/ST Grievance Form</CardText>
              <Badge href="/scst" color="success">SC/ST</Badge>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle>Internal Complaint Committee</CardTitle>
              <CardText>Click Below to Open Internal Grievance Form</CardText>
              <Badge href="/internal" color="success">Internal</Badge>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
   <Form onSubmit={this.handleSubmit} onChange={this.handleChange} style={{ width: '1000px'}}>
    <FormGroup>
    <Jumbotron>
      <h1 style={{ textAlign:'center', fontWeight: '20%', border:' 3px solid navy', color:'#660000'}}>Lodge Your Grievance</h1>
      <p className="lead"><h4>STUDENT GRIEVANCE FORM</h4></p>
      <hr className="my-2" />
      <h6>Occasionally, a student may encounter an issue or problem on campus that he or she has not been able to resolve. AIACTR, Delhi has a formal grievance process that students may initiate by submitting this official Student Grievance Form. Please complete all information requested so your grievance can be processed.
</h6>
      <p className="lead">
      </p>
    </Jumbotron>
    </FormGroup>
    <span style={{color:'red'}}>* = Mandatory Field</span>
    <FormGroup>
      <Label for="name">
         <h5>Name<span style={{color: 'red'}}>*</span></h5>
         </Label>
         <Input
            type="text"
            name="name"
            onChange={this.handleChange} />
    </FormGroup>
    <FormGroup>
      <Label for="email">
           <h5 style={{padding: '5px'}}>Email<span style={{color: 'red'}}>*</span></h5>
      </Label>
            <Input
              type="email"
              name="email"
              onChange={this.handleChange} />
     </FormGroup>
      <FormGroup>
        <Label for="number"><h5>Roll Number<span style={{color: 'red'}}>*</span></h5></Label>
        <Input
        type="number"
        name="number"
        onChange={this.handleChange} />
    </FormGroup>
    <FormGroup>
      <Label for="Phone Number"><h5>Phone Number </h5></Label>
      <Input
      type="number"
      name="phoneNumber"
      onChange={this.handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="Address"><h5>Grievance Address </h5></Label>
        <Input
        type="address"
        name="address"
        onChange={this.handleChange} />
        </FormGroup>
    <FormGroup tag="fieldset">
    <legend><h5>Your Department</h5> </legend>
    <FormGroup check>
      <Label for="department" check>
        <Input type="radio" name="department" onChange={this.radioChange}/>
        CSE
      </Label>
    </FormGroup>
    <FormGroup check>
      <Label for="department" check>
        <Input type="radio" name="department" onChange={this.radioChange} />
        ECE
      </Label>
    </FormGroup>
  </FormGroup>
  <FormGroup>
   <Label for="year"><h5>Year  </h5> </Label>
    <select type="select" name="year" onChange={this.onChanges}>
       <option value="Ist">Ist</option>
       <option value="IInd">IInd</option>
       <option value="IIIrd">IIIrd</option>
       <option value="IVth">IVth</option>
      </select>
    </FormGroup>
    <FormGroup>
      <Label for="name"><h5>Message<span style={{color: 'red'}}>*</span> </h5></Label>
      <Input
      type="textarea"
      name="message"
      onChange={this.handleChange} />
    </FormGroup>

    <Button>Submit</Button>
   </Form>
    </div>
     );


  }
}

export default Student;
