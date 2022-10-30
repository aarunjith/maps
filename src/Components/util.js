
export const get_x = (long, range_long, width) => {
    let long_min = parseInt(range_long[0].split('.')[0]) + parseFloat(range_long[0].split('.')[1])/60;
    let long_max = parseInt(range_long[1].split('.')[0])+ parseFloat(range_long[1].split('.')[1])/60;
    let f = width/(long_max - long_min);
    long = parseInt(long.split('.')[0]) + parseFloat(long.split('.')[1])/60;
    let x = (long - long_min) * f;
    return x;
}

export const get_y = (lat, range_lat, height) => {
    let lat_min = parseInt(range_lat[1].split('.')[0]) + parseFloat(range_lat[1].split('.')[1])/60;
    let lat_max = parseInt(range_lat[0].split('.')[0])+ parseFloat(range_lat[0].split('.')[1])/60;
    let f = height/(lat_max - lat_min)
    lat = parseInt(lat.split('.')[0]) + parseFloat(lat.split('.')[1])/60
    let y = (lat - lat_min) * f
    return height - y;
  }

export const jsonData = (mapValue, xfrom, xto, yfrom, yto) =>  {
    const data = [];
    const dataDepths = [];

    mapValue.map((v, i) => {
        if (v.x >= xfrom && v.x <= xto
            && v.y >= yfrom && v.y <= yto) {
            data.push([v.x, v.y, v.Depths]);
            dataDepths.push(v);
        }
    })
    return [data, dataDepths];

}

export const minMax = (mapValue) => {
    if(mapValue === "C_379") {
       return {
        "xlongMin": "73.15",
        "xlongMax": "73.22",
        "ylatMin": "16.26",
        "ylatMax": "16.20"
       }
    } 
    else if(mapValue === "C_330") {
        return {
            "ylatMin": "19.30",
            "ylatMax": "18.13",
            "xlongMin": "71.0",
            "xlongMax": "72.08"
        }
    } 
    else if(mapValue === "C_351") {
        return {
            "xlongMin": "69.47",
            "xlongMax": "71.03",
            "ylatMin": "20.00",
            "ylatMax": "18.15"
        }
    } 
    else if(mapValue === "C_69") {
        return {
            "xlongMin": "72.40",
            "xlongMax": "72.47.5",
            "ylatMin": "19.02",
            "ylatMax": "18.54.5"
            
        }
    }
}

export const XrangeValues = (mapValue) => {
    if(mapValue === "C_379") {
        return {
            "range": ['73.15','73.22'],
            "height": 7050,
        }
     } 
     else if(mapValue === "C_330") {
        return {
        "range": ['71.0','72.08'],
        "height": 5050,
        }
     } 
     else if(mapValue === "C_351") {
        return {
        "range": ['69.47','71.03'],
        "height": 5600,
        }
     } 
     else if(mapValue === "C_69") {
        return {
        "range": ['72.40','72.47.5'],
        "height": 3300,
        }
     }
}

export const YrangeValues = (mapValue) => {
    if(mapValue === "C_379") {
        return {
            "range": ['16.26', '16.20'],
            "height": 5980,
        }
     } 
     else if(mapValue === "C_330") {
        return {
        "range": ['19.30', '18.13'],
        "height": 5670,
        }
     } 
     else if(mapValue === "C_351") {
        return {
        "range": ['20.00', '18.15'],
        "height": 7670,
        }
     } 
     else if(mapValue === "C_69") {
        return {
        "range": ['19.02', '18.54.5'],
        "height": 3250,
        }
     }
}

export const get_long = (x, range_long, width) => {
    let long_min = parseInt(range_long[0].split('.')[0]) + parseFloat(range_long[0].split('.')[1])/60;
    let long_max = parseInt(range_long[1].split('.')[0])+ parseFloat(range_long[1].split('.')[1])/60;
    let f = (long_max - long_min)/width;
    x = parseFloat(x);
    x = long_min + x * f;
    let deg = parseInt(x);
    let min = (x - deg)*60/100;
    let long = String((deg + min).toFixed(2));
    return long
}

export const get_lat = (y, range_lat, height) => {
    let lat_min = parseInt(range_lat[1].split('.')[0]) + parseFloat(range_lat[1].split('.')[1])/60;
    let lat_max = parseInt(range_lat[0].split('.')[0])+ parseFloat(range_lat[0].split('.')[1])/60;
    let f = (lat_max - lat_min)/height;
    y = parseFloat(height - y);
    y = lat_min + y * f;
    let deg = parseInt(y);
    let min = (y - deg)*60/100;
    let lat = String((deg + min).toFixed(2));
    return lat
}

export const removeDuplicates = (jsonData) => {
      
    let obj = jsonData.map(JSON.stringify);

    let uniqueSet = new Set(obj);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    return uniqueArray;
}


// const colors = () => {
    // return predictedData.map((entry) => {
    //   if(mapValue === "C_379") {
    //     return entry.Depths < 23 ? "#FF0000" : "#008000";
    //   } else if (mapValue === "C_330") {
    //     return entry.Depths < 75 ? "#FF0000" : "#008000";
    //   } else if (mapValue === "C_351") {
    //     return entry.Depths < 77 ? "#FF0000" : "#008000";
    //   } else if (mapValue === "C_69") {
    //     return entry.Depths < 23 ? "#FF0000" : "#008000";
    //   } else {
    //     return "green";
    //   }   
    // })
    // return "#008000";
    
//   }