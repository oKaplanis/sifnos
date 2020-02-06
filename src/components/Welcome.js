import React from "react";

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-left">Sifnos Details</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group row">
                      <label
                        htmlFor="polygon-name"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Polygon Name
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="polygon-name"
                          placeholder="Enter name here"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="historical-info"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Historical Info
                      </label>
                      <div className="col-md-6">
                        <textarea
                          type="text"
                          rows="4"
                          cols="50"
                          id="historical-info"
                          placeholder="Enter historical info here"
                        />
                      </div>
                    </div>
                  </form>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-8 text-left">
                        <p>
                          <i>
                            You can use the map below to make a polygon. After
                            drawing it, the coordinates of the polygon will
                            appear in the text box below.
                          </i>
                        </p>
                        <p>
                          <i>
                            Alternatively, you can ignore this map and use a
                            tool of your preference to draw the polygon. Then
                            copy/paste the coordinates in the text box.
                          </i>
                        </p>
                        <p>
                          <i>Draw and submit a single polygon each time.</i>
                        </p>
                        <p>
                          <i>SRID used: 2100 (Greek)</i>
                        </p>
                      </div>
                    </div>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
