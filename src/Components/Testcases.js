import React, { useEffect, useState, useRef, useMemo } from "react";
import './Testcases.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Container, Row, Col } from "react-bootstrap";
import {get_x, get_y, minMax, jsonData, 
  XrangeValues, YrangeValues, get_long, removeDuplicates} from "./util.js";
import C_379_json from "./csv/C_379.json";
import C_351_json from "./csv/C_351.json";
import C_330_json from "./csv/C_330.json";
import tifimg from "../images/C_351.jpg";
import tifimg2 from "../images/tif2.jpg";
import test_1 from "../images/test1.png";
import test_2 from "../images/test2.png";
import test_3 from "../images/test3.png";
import MapDetails from "./csv/MapDetails.json";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);


function Testcases() {
    const [cases, setCases] = useState('');
    const [caseData, setCaseData] = useState([]);
    const [depthData, setDepthData] = useState([]);
    const [imageData, setImageData] = useState('');
    const [xyValues, setXY] = useState({});

    const handleChange = (event) => {
        setCases(event.target.value);
        setCaseData([]);
        setDepthData([]);
    };

    useEffect(() => {
      let xfrom; let xto; let yfrom; let yto;
      if(cases === "test1") {
        xfrom = get_x('69.47', ['69.47','71.03'], 5600);
        xto = get_x('71.03', ['69.47','71.03'], 5600);
        yfrom = get_y('20.00', ['20.00', '18.15'], 7670);
        yto = get_y('18.15', ['20.00', '18.15'], 7670);
        const filteredData = removeDuplicates(C_351_json);
        let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
        setCaseData(data);
        setDepthData(dataDepths);
        setImageData(tifimg);
        setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
      } 
      if (cases === "test2") {
        xfrom = get_x('71.0', ['71.0','72.08'], 5600);
        xto = get_x('72.08', ['71.0','72.08'], 5600);
        yfrom = get_y('19.30', ['19.30', '18.13'], 7670);
        yto = get_y('18.13', ['19.30', '18.13'], 7670);
        const filteredData = removeDuplicates(C_330_json);
        let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
        setCaseData(data);
        setDepthData(dataDepths);
        setImageData(tifimg2);
        setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
      }
      if (cases === "test3") {
        xfrom = 900;
        xto = 1000 + xfrom;
        yfrom = 0;
        yto = 1000 + yfrom;
        const filteredData = removeDuplicates(C_379_json);
        let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
        setCaseData(data);
        setDepthData(dataDepths);
        setImageData(test_1);
        setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
      }
      if (cases === "test4") {
        xfrom = 1800;
        xto = 1000 + xfrom;
        yfrom = 0;
        yto = 1000 + yfrom;
        const filteredData = removeDuplicates(C_379_json);
        let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
        setCaseData(data);
        setDepthData(dataDepths);
        setImageData(test_2);
        setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
      }
      if (cases === "test5") {
        xfrom = 0;
        xto = 1000 + xfrom;
        yfrom = 0;
        yto = 1000 + yfrom;
        const filteredData = removeDuplicates(C_379_json);
        let [data, dataDepths] = jsonData(filteredData, xfrom, xto, yfrom, yto);
        setCaseData(data);
        setDepthData(dataDepths);
        setImageData(test_3);
        setXY({xfrom: xfrom, xto: xto, yfrom: yfrom, yto: yto});
      }
    },[cases])

    // console.log('caseData', caseData);
    // console.log('depthData', depthData);

    const options = {
        tooltip: {
          formatter: function() {
            let tooltip = "";
            depthData.length && depthData.map((v) => {
              if( v.y === this.y && v.x === this.x) {
                let xRanges;
                let yRanges;
                let x_v;
                let y_v;
                if(cases === "test1") {
                  xRanges = XrangeValues("C_351");
                  yRanges = YrangeValues("C_351");
                } else if(cases === "test2") {
                  xRanges = XrangeValues("C_330");
                  yRanges = YrangeValues("C_330");
                } else {
                  xRanges = XrangeValues("C_379");
                  yRanges = YrangeValues("C_379");
                }
                x_v = get_long(this.x, xRanges.range, xRanges.height);
                y_v = get_long(this.y, yRanges.range, yRanges.height);
                tooltip += "<br>Long: " + x_v + "<br>Lat: " + y_v + '<br>Depth: '+ v.Depths;
              }
            })
            return tooltip;
          }
        },
        title: {
          text: cases === "test1" ? MapDetails["C_351"].title : 
            cases === "test2" ?  MapDetails["C_330"].title : "",
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
          data: caseData,
          color: "green",
          marker: {
            radius: 1
          }
        }]
    }

  return (
    <>
      <div className="test-cases">
        <div className="test-cases-ctn">
            {/* <Row className="row-ctn"> */}
                {/* <Col lg={12} className="col-ctn"> */}
                <div className="test-drop">
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-simple-select-label">Maps</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cases}
                        label="Maps"
                        onChange={handleChange}
                      >
                        <MenuItem value={"test1"}>Map 1</MenuItem>
                        <MenuItem value={"test2"}>Map 2</MenuItem>
                        <MenuItem value={"test3"}>Map 3</MenuItem>
                        <MenuItem value={"test4"}>Map 4</MenuItem>
                        <MenuItem value={"test5"}>Map 5</MenuItem>
                      </Select>
                    </FormControl>
                </div>
                {/* </Col> */}
            {/* </Row> */}

            <Row>
              <Col lg={7} className="col-ctn">
                    {caseData.length !== 0 && (
                        <div className="heatmap">
                          <HighchartsReact
                              highcharts={Highcharts}
                              options={options}
                          />

                        {cases === "test1" && (
                          <>
                            <div className="frombox box-2">
                              <div className="su-title"><b><span>Survey Details:</span></b></div>
                              {/* <b>Title: </b>{MapDetails[mapValue].title} <br/> */}
                              <b className="">Surveyed By: </b>
                              <span className="su-text">{MapDetails["C_351"].surveyed_by}&nbsp;&nbsp;&nbsp;</span>

                              <b>Surveying Ship: </b>
                              <span className="su-text">{MapDetails["C_351"].surveying_ship}&nbsp;&nbsp;&nbsp;</span>

                              <b>Date: </b>
                              <span className="su-text">{MapDetails["C_351"].date}</span>
                            </div>
                          </> 
                        )}
                        {cases === "test2" && (
                          <>
                            <div className="frombox box-2">
                              <div className="su-title"><b><span>Survey Details:</span></b></div>
                              {/* <b>Title: </b>{MapDetails[mapValue].title} <br/> */}
                              <b className="">Surveyed By: </b>
                              <span className="su-text">{MapDetails["C_330"].surveyed_by}&nbsp;&nbsp;&nbsp;</span>

                              <b>Surveying Ship: </b>
                              <span className="su-text">{MapDetails["C_330"].surveying_ship}&nbsp;&nbsp;&nbsp;</span>

                              <b>Date: </b>
                              <span className="su-text">{MapDetails["C_330"].date}</span>
                            </div>
                          </> 
                        )}
                        </div>
                    )}
              </Col>
              <Col lg={5} className="col-ctn">
                <img className="case-img" src={imageData} alt=""></img><br/>
              </Col>
            </Row>
        </div>
      </div>
    </>
  );
}
export default Testcases;
