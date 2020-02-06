import React, { Component } from "react";
import {
  Map,
  TileLayer,
  FeatureGroup,
  LayersControl,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "../map.css";

const { BaseLayer } = LayersControl;

export default class SifnosMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 36.961113508934794,
      lng: 24.71051916502902,
      zoom: 12,
      currentPosition: "",
      polygonDraw: true,
      markerDraw: true
    };
    this.handleClick = this.handleClick.bind(this);
    this._onCreate = this._onCreate.bind(this);
    this._onDeleted = this._onDeleted.bind(this);
  }

  handleClick(e) {
    this.setState({
      currentPosition: e.latlng
    });
  }

  _onCreate(e) {
    let type = e.layerType;
    if (type === "polygon") {
      this.setState({
        polygonDraw: !this.state.polygonDraw
      });
    }else if(type === "marker"){
      this.setState({
        markerDraw: !this.state.markerDraw
      });
    }

    //save to db
  }

  _onDeleted(e) {
    let type = e.type;
    console.log(e);
    if(type === "draw:deleted"){
      if (this.state.polygonDraw === false && this.state.markerDraw === true ) {
        this.setState({
          polygonDraw: !this.state.polygonDraw, 
          markerDraw: this.state.markerDraw 
        });      
      }else if(this.state.polygonDraw === true && this.state.markerDraw === false){
        this.setState({
          polygonDraw: this.state.polygonDraw, 
          markerDraw: !this.state.markerDraw 
        });
      }
      else if(this.state.polygonDraw === false && this.state.markerDraw === false){
        this.setState({          
          polygonDraw: !this.state.polygonDraw,      
          markerDraw: !this.state.markerDraw           
        });
      }else if(this.state.polygonDraw === true && this.state.markerDraw === true){
        this.setState({     
          polygonDraw: this.state.polygonDraw,      
          markerDraw: this.state.markerDraw 
        });
      }

    }
    
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} onClick={this.handleClick} ref='map'>
        <LayersControl collapsed={false} position={"topleft"}>
          <BaseLayer name="Open Street View" checked={true}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Google">
            <TileLayer
              attribution="google"
              url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            />
          </BaseLayer>
          <FeatureGroup ref='featuredGroup'>
            <EditControl
              position="topleft"
              onEdited={this._onEditPath}
              onCreated={this._onCreate}
              onDeleted={this._onDeleted}
              draw={{
                rectangle: false,
                polyline: false,
                polygon: this.state.polygonDraw,
                circle: false,
                circlemarker: false,
                marker: this.state.markerDraw                
              }}
            />
          </FeatureGroup>
        </LayersControl>
      </Map>
    );
  }
}
