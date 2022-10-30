import React, { useEffect, useState, useRef, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import C_379_json from "./csv/C_379.json";
import C_330_json from "./csv/C_330.json";
import C_351_json from "./csv/C_351.json";
import C_69_json from "./csv/C_69.json";
import MapDetails from "./csv/MapDetails.json";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {get_x, get_y, minMax, jsonData, 
  XrangeValues, YrangeValues, get_long, removeDuplicates} from "./util.js";
import CircularProgress from '@mui/material/CircularProgress';
import { Audio } from  'react-loader-spinner';
import { useNavigate } from "react-router-dom";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-image-crop/dist/ReactCrop.css';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);

function Home() {

  const [formdata, setformData] = useState({
    Latitudefrom: "",
    Latitudeto: "",
    Longitudefrom: "",
    Longitudeto: "",
  });
  const [predictedData, setPredictedData] = useState([]);
  const [message, setMessage] = useState(false);
  const [mapValue, setMapValue] = React.useState('');
  const [xlongMin, setXlongMin] = useState('');
  const [xlongMax, setXLongMax] = useState('');
  const [ylatMin, setYlatMin] = useState('');
  const [ylatMax, setYlatMax] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataDepths, setDataDepths] = useState([]);
  const [xyValues, setXY] = useState({});

  let navigate = useNavigate();

  const getformdetails = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
    setPredictedData([]);
  };

  const Formsubmit = async (e) => {
    e.preventDefault();
    setPredictedData([]);
    setDataDepths([]);
    setXY({});
    checkValues();
    setLoading(true);
  };

  const checkValues = () => {
    let xfrom; let xto; let yfrom; let yto;

    if(mapValue === "C_379") {
      xfrom = get_x(formdata.Longitudefrom, ['73.15','73.22'], 7050);
      xto = get_x(formdata.Longitudeto, ['73.15','73.22'], 7050);
      yfrom = get_y(formdata.Latitudefrom, ['16.26', '16.20'], 5980);
      yto = get_y(formdata.Latitudeto, ['16.26', '16.20'], 5980);
      const filteredData = removeDuplicates(C_379_json);
      let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
      setPredictedData(data);
      setDataDepths(dataDepths);
      setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
    } 
    else if(mapValue === "C_330") {
      xfrom = get_x(formdata.Longitudefrom, ['71.0','72.08'], 5050);
      xto = get_x(formdata.Longitudeto, ['71.0','72.08'], 5050);
      yfrom = get_y(formdata.Latitudefrom, ['19.30', '18.13'], 5670);
      yto = get_y(formdata.Latitudeto, ['19.30', '18.13'], 5670);
      const filteredData = removeDuplicates(C_330_json);
      let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
      setPredictedData(data);
      setDataDepths(dataDepths);
      setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
    } 
    else if(mapValue === "C_351") {
      xfrom = get_x(formdata.Longitudefrom, ['69.47','71.03'], 5600);
      xto = get_x(formdata.Longitudeto, ['69.47','71.03'], 5600);
      yfrom = get_y(formdata.Latitudefrom, ['20.00', '18.15'], 7670);
      yto = get_y(formdata.Latitudeto, ['20.00', '18.15'], 7670);
      const filteredData = removeDuplicates(C_351_json);
      let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
      setPredictedData(data);
      setDataDepths(dataDepths);
      setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
    } 
    else if(mapValue === "C_69") {
      xfrom = get_x(formdata.Longitudefrom, ['72.40','72.47.5'], 3300);
      xto = get_x(formdata.Longitudeto, ['72.40','72.47.5'], 3300);
      yfrom = get_y(formdata.Latitudefrom, ['19.02', '18.54.5'], 3250);
      yto = get_y(formdata.Latitudeto, ['19.02', '18.54.5'], 3250);
      const filteredData = removeDuplicates(C_69_json);
      let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
      setPredictedData(data);
      setDataDepths(dataDepths);
      setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
    }
    console.log("mapValue:", mapValue, "xfrom:", xfrom, "xto:", xto);
    console.log("mapValue:", mapValue, "yfrom:", yfrom, "yto:", yto);  
  }

  useEffect(() => {
    if(predictedData.length === 0) {
      setMessage(true);
    } 
    if (predictedData.length > 0) {
      setLoading(false);
    }
  },[predictedData])

  // default navigation
  useEffect(() => {
    navigate("/lat-long")
  }, [])


  // console.log('mapValue', mapValue);
  // console.log('predictedData', predictedData);
  
  // console.log('loading', loading);

  const handleChange = (event) => {
    setMapValue(event.target.value);
    const ranges = minMax(event.target.value);
    setXlongMin(ranges.xlongMin);
    setXLongMax(ranges.xlongMax);
    setYlatMin(ranges.ylatMin);
    setYlatMax(ranges.ylatMax);
    setformData({
      Latitudefrom: ranges.ylatMin,
      Latitudeto: ranges.ylatMax,
      Longitudefrom: ranges.xlongMin,
      Longitudeto: ranges.xlongMax,
    })
    setPredictedData([]);
  };
  // console.log('formdata', formdata);

  const options = {
    tooltip: {
      formatter: function() {
        let tooltip = "";
        dataDepths.length && dataDepths.map((v) => {
          if( v.y === this.y && v.x === this.x) {
            let xRanges = XrangeValues(mapValue);
            let yRanges = YrangeValues(mapValue);
            let x_v = get_long(this.x, xRanges.range, xRanges.height);
            let y_v = get_long(this.y, yRanges.range, yRanges.height);
            tooltip += "<br>Long: " + x_v + "<br>Lat: " + y_v + '<br>Depth: '+ v.Depths;
          }
        })
        return tooltip;
      }
    },
    title: {
      text: mapValue ? MapDetails[mapValue].title : '',
      style: {
        color: '#808080',
        fontWeight: 'bold'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      scatter: {
        width: 10,
        height: 10,
        depth: 10
      }
    },
    yAxis: {
      title: {
        align: "middle",
        text: "Latitude"
      },
      labels: {
        enabled: false
      },
      reversed: true,
      min: xyValues.yfrom,
      max: xyValues.yto,
    },
    xAxis: {
      title: {
        align: "middle",
        text: "Longitude"
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 1,
      min: xyValues.xfrom,
      max: xyValues.xto,
    },
    zAxis: {
      showFirstLabel: false
    },
    legend: {
      enabled: false
    },
    series: [{
      type: "scatter",
      name: "Data",
      // colorByPoint: true,
      // accessibility: {
      //   exposeAsGroupOnly: true
      // },
      data: predictedData,
      color: "green",
      marker: {
        radius: 1
      }
    }]
  }

  return (
    <>
      <div className="section">
        {/* <div className="tittle">Hydrographic data analytics tool
        <img src={flag} className="imageflag" alt="flag"></img></div> */}

        <div className="container-row">
          <Row className="row1">
            <Col lg={3} className="form-bg">
              <form autoComplete="off" onSubmit={Formsubmit}>
                <div className="frombox">
                  <Row>
                  <Col lg={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Maps</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mapValue}
                        label="Maps"
                        onChange={handleChange}
                      >
                        <MenuItem value={"C_379"}>C_379</MenuItem>
                        <MenuItem value={"C_330"}>C_330</MenuItem>
                        <MenuItem value={"C_351"}>C_351</MenuItem>
                        <MenuItem value={"C_69"}>C_69</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  </Row>
                  <Row>
                    <span>Latitude   
                      {ylatMin !== "" && ylatMax !== "" && (
                      <span className="minmax">{`(min: ${ylatMin}, max: ${ylatMax})`}</span>)}
                    </span>
                    <Col lg={6}>
                      <label>From</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Latitudefrom"
                        value={formdata.Latitudefrom}
                        onChange={getformdetails}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label>To</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Latitudeto"
                        value={formdata.Latitudeto}
                        onChange={getformdetails}
                        required
                      />
                    </Col>
                  </Row>

                  <Row>
                    <span>Longitude
                      {xlongMin !== "" && xlongMax !== "" && (
                        <span className="minmax">{`(min: ${xlongMin}, max: ${xlongMax})`}</span>
                      )}
                    </span>
                    <Col lg={6}>
                      <label>From</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Longitudefrom"
                        value={formdata.Longitudefrom}
                        onChange={getformdetails}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label>To</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Longitudeto"
                        value={formdata.Longitudeto}
                        onChange={getformdetails}
                        required
                      />
                    </Col>
                  </Row>

                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-primary cust-bnt"
                  >
                    Submit
                  </button>
                  {/* {message && (<div className="message">
                    There are no detected values in that range
                  </div>)} */}
                </div>
              </form>
            </Col>


          <Col lg={8} className="graph">
            {loading ? (
              <div className="spinner">
                <Audio
                  height="50"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={true}
                />
              </div>
            ): (
              <>
              <div>
                {predictedData.length !== 0 && (
                  // <Col lg={5}>
                    <div className="heatmap">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                      />
                    </div>
                  // </Col>
                )}

                {mapValue && predictedData.length !== 0 &&(
                  <>
                  <div className="box-ctn">
                    
                    <div className="frombox box-2">
                      <div className="su-title"><b><span>Survey Details:</span></b></div>
                      {/* <b>Title: </b>{MapDetails[mapValue].title} <br/> */}
                      <b className="">Surveyed By: </b>
                      <span className="su-text">{MapDetails[mapValue].surveyed_by}&nbsp;&nbsp;&nbsp;</span>

                      <b>Surveying Ship: </b>
                      <span className="su-text">{MapDetails[mapValue].surveying_ship}&nbsp;&nbsp;&nbsp;</span>

                      <b>Date: </b>
                      <span className="su-text">{MapDetails[mapValue].date}</span>
                    </div>
                  </div>
                    
                  </>
                )}
              </div>
              </>
            )}
          </Col>

            {/* <Col lg={3}>
              {mapValue && predictedData.length !== 0 &&(
                <div className="frombox box-2">
                  <b>Title: </b>{MapDetails[mapValue].title} <br/>
                  <b>surveyed_by: </b>{MapDetails[mapValue].surveyed_by}<br/>
                  <b>surveying_ship: </b>{MapDetails[mapValue].surveying_ship}<br/>
                  <b>date: </b>{MapDetails[mapValue].date}
                </div>
              )}
              
            </Col> */}
          </Row>
        </div>
        
      </div>
    </>
  );
}
export default Home;
