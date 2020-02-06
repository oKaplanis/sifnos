import React from "react";
import arrow from '../images/arrow.png';
import names from '../constants/names';
import inputs from "../constants/formInputs";
import SifnosMap from "./SifnosMap";
import RadioButton from './radio';

const uuid = require('uuid');

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      functionality:{
        progressbar: 12.5,
        currentStep: 1,
        checked: ""
      },
      monument: {
        nameOfMonument: '',
        kindOfMonuments: '',
        subKindOfMonument: '',
        shortDescriptionOfMonument: '',
        published: '',
        region: '',
        location: '',
        access: '',
        coordinates: '',
        height: '',
        connectionWithMaps: '',
      },
      dating: {
        period: {
          from: '',
          until: '',
        },
        subperiod: {
          from: '',
          until: '',
        },
        date: {
          data: ''
        },
        statusOfDate: '',
      },
      functionalityUsage: [{
        functionality: '', certainty: ''
      }],
      detailsOfConstruction: {
        architecturalType: '',
        katopsi: '',
        stegasi: '',
        wallmaking: '',
        dimensions: '',
        observations: ''
      },
      decorations: {
        detailsOfDecoration: '',
        observations: '',
        otherDetails: '',
        otherObservations: '',
        preservationStatus: '',
        operation: ''
      },
      thesmikoPlaisio: {
        kiriksi: '',
        foreasProstasias: '',
        idioktisiakoKathestws: '',
        stoixeiaIdiokthsias: '',
        comments: '',
        organized: true,
        visitable: true
      },
      files: {
        photo: '',
        planning: '',
        video: ''
      },
      relationships: {
        kinitaMnhmeia: '',
        vivliographia: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);    
  }

  handleChange = event => {
    const { name, value } = event.target
    const { monument } = { ...this.state }
    const currentState = monument;
    currentState[name] = value;

    this.setState({
      monument: currentState
    })
    console.log(monument)
  }

  handleDateChange = event => {
    const { name, value ,dataset} = event.target
    const { dating } = { ...this.state }
    const currentState = dating;
    if(event.target.type === "radio"){
      currentState[name] = value
      this.setState({
        dating: currentState
      })
    }else{
        currentState[dataset.dating][name] = value;
        this.setState({
        dating: currentState
      })
    }
    console.log(currentState[dataset.dating],this.state)
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
  }

  componentDidMount(){
    this.refs[`arrow-1`].style.backgroundColor = "#d28700";
    this.refs[`arrow-1`].style.border = "8px solid #da8d00";
    this.state.functionality.currentStep !== 1 ? this.refs[`arrow-text-1`].style.color = "lightgrey" :
    this.refs[`arrow-text-1`].style.color = "#007bff"
  }

  _next = () => {
    let currentStep = this.state.functionality.currentStep
    currentStep = currentStep >= 7 ? 8 : currentStep + 1
    
    const { functionality } = { ...this.state }
    const currentState = functionality;
    currentState.progressbar = this.state.functionality.progressbar + 12.5
    currentState.currentStep = currentStep

    this.setState({
      functionality: currentState,
    })

    this.refs[`arrow-${currentStep}`].style.backgroundColor = "#d28700";
    this.refs[`arrow-${currentStep}`].style.border = "8px solid #da8d00";
    this.refs[`arrow-text-${currentStep}`].style.color = "#007bff"
  }

  _prev = () => {
    let currentStep = this.state.functionality.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    
    const { functionality } = { ...this.state }
    const currentState = functionality;
    currentState.progressbar = this.state.functionality.progressbar - 12.5
    currentState.currentStep = currentStep

    this.setState({
      functionality: currentState,
    })

    this.refs[`arrow-${currentStep+1}`].style.backgroundColor = "rgb(47, 47, 47)";
    this.refs[`arrow-${currentStep+1}`].style.border = "8px solid rgb(47, 47, 47)";
    this.refs[`arrow-text-${currentStep+1}`].style.color = "lightgrey"  
  }

  previousButton() {
    let currentStep = this.state.functionality.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
        </button>
      )
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.functionality.currentStep;
    if (currentStep < 8) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
          Next
        </button>
      )
    }
    return null;
  }

  render() {    
    return (
      <div className="container" id="form-container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="progress top-progress-bar" style={{height: "2px"}}>
                  <ul className="arrow-list">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                      return (
                          <li className="arrow-li" key={num + arrow} ><img className="arrow img-responsive" ref={`arrow-${num}`} src={arrow} width={"50px"} />
                            <p className="arrow-text" ref={`arrow-text-${num}`}>{names[num-1]}</p>                
                          </li>
                      );
                    })}
                  </ul>
                  <div className="progress-bar" style={{ width: `${this.state.functionality.progressbar}%` }} >
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${this.state.functionality.progressbar}%` }}></div>
                </div>
              </div>
            </div>
            <React.Fragment>
              <form onSubmit={this.handleSubmit}>          
                <Step1
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  monument={this.state.monument}
                  published={this.state.monument.published}
                />
                <Step2
                  currentStep={this.state.functionality.currentStep}
                  handleDateChange={this.handleDateChange}
                  handleChange={this.handleChange}
                  dating={this.state.dating}
                />
                <Step3
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  functionalityUsage={this.state.functionalityUsage}
                />
                <Step4
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  detailsOfConstruction={this.state.detailsOfConstruction}
                />
                <Step5
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  decorations={this.state.decorations}
                />
                <Step6
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  thesmikoPlaisio={this.state.thesmikoPlaisio}
                />
                <Step7
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  files={this.state.files}
                />
                <Step8
                  currentStep={this.state.functionality.currentStep}
                  handleChange={this.handleChange}
                  relationships={this.state.relationships}
                />
                {this.previousButton()}
                {this.nextButton()}

              </form>
            </React.Fragment>
          </div>
        </div>        
      </div>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Μνημείο:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      {Object.keys(props.monument).map((currState,index) =>
        <div key={index+1}>
           {Object.values(inputs.monument[index])[0] === true ? 
            <label key={uuid.v4()} className="sub-label">{Object.keys(inputs.monument[index])}
                <small className="required-field">(Απαιτείται)</small>
              </label>
            : Object.keys(inputs.monument[index])[0] === "radio" ?  
            <RadioButton options={Object.values(inputs.monument[index])[0]} name={"published"} published={props.published} handleChange={props.handleChange} />
            : <label key={uuid.v4()} className="sub-label">{Object.keys(inputs.monument[index])}</label>            
          }
          {index !== 10 && Object.keys(inputs.monument[index])[0] !== "radio" ? <input
            className="form-control"
            key={index+1}
            data-title="monument"  
            name={`${currState}`}
            type="text"
            placeholder={`Πληκτρολογήστε ${Object.keys(inputs.monument[index])[0]}`}
            value={props.monument.currState}
            onChange={props.handleChange}
          /> : <></>}          
        </div>
      )}
      <div className="container mapContainer">
        <div className="row">
          <div className= "col-md-10" style={{margin: "auto"}}>
            <SifnosMap />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10" style={{margin: "18px auto"}}>
            <label className="polygon-label">Polygon Coordinates</label>
            <p className="text-center">
              <textarea
                type="text"
                rows="4"
                spellCheck="false"
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </p>
          </div>          
        </div>
      </div>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Χρονολόγηση:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      <label className="sub-label">Περίοδος
        <small className="required-field">(Απαιτείται)</small>
      </label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">Από</span>
        </div>
        <input type="text" 
          data-dating="period"
          name="from"
          onChange={props.handleDateChange} 
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" 
          className="form-control" 
          value={props.dating.period.from}
          />
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">Έως</span>
        </div>
        <input 
          type="text" 
          data-dating="period"
          name="until"
          onChange={props.handleDateChange} 
          aria-label="Default" 
          aria-describedby="inputGroup-sizing-default" 
          className="form-control" 
          value={props.dating.period.until}
        />
      </div>
      <label className="sub-label">Υποπερίοδος 
        <small className="required-field">(Απαιτείται)</small>
      </label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">Από</span>
        </div>
        <input 
          type="text" 
          data-dating="subperiod"
          name="from"
          onChange={props.handleDateChange} 
          aria-label="Default" 
          aria-describedby="inputGroup-sizing-default" 
          className="form-control" 
          value={props.dating.subperiod.from}
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">Έως</span>
        </div>
        <input 
          type="text" 
          data-dating="subperiod"
          name="until"
          onChange={props.handleDateChange} 
          aria-label="Default" 
          aria-describedby="inputGroup-sizing-default" 
          className="form-control" 
          value={props.dating.subperiod.until}
        />
      </div>
      <label className="sub-label">Χρονολογία 
        <small className="required-field">(Απαιτείται)</small>
      </label>      
      <input 
        className="form-control" 
        onChange={props.handleDateChange} 
        value={props.dating.date.data}
        name="data"
        data-dating="date"
      />
      <RadioButton 
        options={inputs.dating[3].radio} 
        name={"statusOfDate"}
        data-dating="statusOfDate"
        published={props.dating.statusOfDate} 
        handleChange={props.handleDateChange} 
      />    
    </div>
  );
}
function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Λειτουργία / Χρήση:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      {Object.keys(props.functionalityUsage).map((currState,index) => 
        <div key={uuid.v4()}>
          <label key={uuid.v4()} className="sub-label" htmlFor={`${currState}`}>{inputs.functionalityUsage[index]}</label>
          <input
            className="form-control"
            key={uuid.v4()}
            id={currState}
            name={currState}
            data-title="functionalityUsage"
            type="text"
            placeholder={`Πληκτρολογήστε ${currState}`}
            value={props.functionalityUsage.currState}
            onChange={props.handleChange}
          />
        </div>
        )}
    </div>
  );
}
function Step4(props) {
  if (props.currentStep !== 4) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Στοιχεία κατασκευής:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      {Object.keys(props.detailsOfConstruction).map((currState,index) => 
      <div key={uuid.v4()}>
        <label key={uuid.v4()} className="sub-label" htmlFor={`${currState}`}>{inputs.detailsOfConstruction[index]}</label>
        <input
          className="form-control"
          key={uuid.v4()}
          id={currState}
          name={currState}
          data-title="detailsOfConstruction"
          type="text"
          placeholder={`Πληκτρολογήστε ${currState}`}
          value={props.detailsOfConstruction.currState}
          onChange={props.handleChange}
        />
        </div>
      )}
    </div>
  );
}
function Step5(props) {
  if (props.currentStep !== 5) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Στοιχεία διακόσμησης \ Λοιπά στοιχεία:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      {Object.keys(props.decorations).map((currState,index) =>
        <div key={uuid.v4()}>
          <label key={uuid.v4()} className="sub-label" htmlFor={`${currState}`}>{inputs.decorations[index]}</label>
          <input
            className="form-control"
            key={uuid.v4()}
            id={currState}
            name={currState}
            data-title="decorations"
            type="text"
            placeholder={`Πληκτρολογήστε ${currState}`}
            value={props.decorations.currState}
            onChange={props.handleChange}
          />
        </div>
      )}
    </div>
  );
}
function Step6(props) {
  if (props.currentStep !== 6) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Θεσμικό πλαίσιο:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      {Object.keys(props.thesmikoPlaisio).map((currState,index) =>
        <div key={uuid.v4()}>
          <label key={uuid.v4()}className="sub-label" htmlFor={`${currState}`}>{inputs.thesmikoPlaisio[index]}</label>
          <input
            className="form-control"
            key={uuid.v4()}
            id={currState}
            name={currState}
            data-title="thesmikoPlaisio"
            type="text"
            placeholder={`Πληκτρολογήστε ${currState}`}
            value={props.thesmikoPlaisio.currState}
            onChange={props.handleChange}
          />
        </div>
      )}
    </div>
  );
}
function Step7(props) {
  if (props.currentStep !== 7) {
    return null
  }
  return (
    <div className="form-group step-class">
      <div className="step-headers">
        <p>Αρχεία:</p>
        <p className="step-measure">{props.currentStep}-8</p>
      </div>
      {Object.keys(props.files).map((currState,index) =>
        <div key={uuid.v4()}>
          <label key={uuid.v4()} className="sub-label" htmlFor={`${currState}`}>{inputs.files[index]}</label>
          <input
            className="form-control"
            key={uuid.v4()}
            id={currState}
            name={currState}
            data-title="files"
            type="text"
            placeholder={`Πληκτρολογήστε ${currState}`}
            value={props.files.currState}
            onChange={props.handleChange}
          />
        </div>
      )}
    </div>
  );
}
function Step8(props) {
  if (props.currentStep !== 8) {
    return null
  }
  return (
    <React.Fragment>
      <div className="form-group step-class">
        <div className="step-headers">
          <p>Σχέση με άλλα μνημεία \ Βιβλιογραφία:</p>
          <p className="step-measure">{props.currentStep}-8</p>
        </div>
        {Object.keys(props.relationships).map((currState,index) =>
          <div key={uuid.v4()}>
            <label key={uuid.v4()} className="sub-label" htmlFor={`${currState}`}>{inputs.relationships[index]}</label>
            <input
              className="form-control"
              key={uuid.v4()}
              id={currState}
              name={currState}
              data-title="relationships"
              type="text"
              placeholder={`Πληκτρολογήστε ${currState}`}
              value={props.relationships.currState}
              onChange={props.handleChange}
            />
          </div>
        )}
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
    </React.Fragment>
  );
}
