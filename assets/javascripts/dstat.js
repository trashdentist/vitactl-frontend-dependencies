const INTERNAP = false;
const NFO      = !INTERNAP;
const SEC      = 1000;

// General configuration for the charts with Line gradientStroke
gradientChartOptionsConfiguration =  {
  maintainAspectRatio: false,
  legend: {
        display: false
   },

   tooltips: {
     backgroundColor: '#fff',
     titleFontColor: '#333',
     bodyFontColor: '#666',
     bodySpacing: 4,
     xPadding: 12,
     mode: "nearest",
     intersect: 0,
     position: "nearest"
   },
   responsive: true,
   scales:{
     yAxes: [{
       barPercentage: 1.6,
           gridLines: {
             drawBorder: false,
               color: 'rgba(29,140,248,0.0)',
               zeroLineColor: "transparent",
           },
           ticks: {
             suggestedMin: 0,
             suggestedMax: 10,
               padding: 20,
               fontColor: "#9a9a9a"
           }
         }],

     xAxes: [{
       barPercentage: 1.6,
           gridLines: {
             drawBorder: false,
               color: 'rgba(220,53,69,0.1)',
               zeroLineColor: "transparent",
           },
           ticks: {
               padding: 20,
               fontColor: "#9a9a9a"
           }
         }]
     }
}

const ctxes = [
    ctx = document.getElementById("inap-chart").getContext("2d"),
    ctx = document.getElementById("nfo-chart").getContext("2d")
]

const gradientStroke = ctxes[0].createLinearGradient(0,230,0,50);
gradientStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
gradientStroke.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke.addColorStop(0, 'rgba(119,52,169,0)');

const inapData = {
  labels: [1],
  datasets: [{
    label: "Requests",
    fill: true,
    backgroundColor: gradientStroke,
    borderColor: '#d048b6',
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#d048b6',
    pointBorderColor:'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#d048b6',
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: [0]
  }]
}

const nfoData = {
  labels: [1],
  datasets: [{
    label: "Requests",
    fill: true,
    backgroundColor: gradientStroke,
    borderColor: '#d048b6',
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#d048b6',
    pointBorderColor:'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#d048b6',
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: [0]
  }]
}

const inapChart = new Chart(ctxes[0], {
  type: 'line',
  data: inapData,
  options: gradientChartOptionsConfiguration
})

const nfoChart = new Chart(ctxes[1], {
  type: 'line',
  data: nfoData,
  options: gradientChartOptionsConfiguration
})

let update = (rps, isNfo = INTERNAP) => {
    let ptr = isNfo ? nfoData : inapData //ptr stands for pointer
    
    if(ptr.labels.length >= 10) {
        ptr.labels.splice(0, 1)
        ptr.datasets[0].data.splice(0, 1)
    }
    let label = ptr.labels[ptr.labels.length - 1] + 1
    
    ptr.labels.push(label)
    ptr.datasets[0].data.push(Math.abs(Math.ceil(rps - Math.random()*1000)))
    return isNfo ? nfoChart.update() : inapChart.update()
}

setInterval(_ => {
    let xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            update(parseInt(xhr.responseText), INTERNAP);
        }
    }
    xhr.open("GET", "/hub/dstat/statistics?s=Internap2")
    xhr.send()
}, SEC);

setInterval(_ => {
    let xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            update(parseInt(xhr.responseText), NFO);
            console.log(`${xhr.responseText} and int: ${parseInt(xhr.responseText)}`)
        }
    }
    xhr.open("GET", "/hub/dstat/statistics?s=NFO")
    xhr.send()
}, SEC);
