let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const future = d3.json(url);
console.log("Future: ", future);
d3.json(url).then(function(data) {
    // let i = 0; while ( i < 5) { i++;  console.log(data.names[i]);}  // checking the names 
    let optionList = d3.select('select');
    optionList.append('option').text("");
    data.names.forEach((element) => {
        // console.log(element);
        optionList.append('option').text(element);
      });

    d3.select('#selDataset').on("change", function() {
        subJectId = this.value; 
        document.getElementById("sample-metadata").innerText = ""
        document.getElementById("bar").innerText = ""
        document.getElementById("bubble").innerText = ""
        // console.log(subJectId);
        var indx = Number(subJectId);
        let metadataObject = data.metadata.find(o => o.id === indx);
        let obj = data.metadata.find(o => o.id === indx);
        let sampleValues = data.samples;
        var sampleValuesFiltered = sampleValues.filter(obj => obj.id == subJectId);
        var s = sampleValuesFiltered[0];
        var otuIds = s.otu_ids;
        var sampplevalues = s.sample_values;
        xval = s.sample_values.slice(0, 10).reverse()
        yval =  s.otu_ids.slice(0, 10).map(val=>"OTU " + val).reverse()
        labels = s.otu_labels.slice(0, 10).reverse()
        // alert(xval);
        // populate sample metadata - demorgraphin info.
        for (const [key, value] of Object.entries(obj)) {
            let addDemoData = d3.select('.panel-body').append('h5');
            addDemoData.text(`${key}:  ${value}`)
          }
        createBarChart(xval, yval, labels);
        createBubbleChart(xval, yval, labels, otuIds);

    });
    

});
  
function optionChanged(){
    selectionMade = document.getElementById("selDataset").value;
    document.getElementById("sample-metadata").style.backgroundColor = "#eaeded"
    console.log("SELECTED SUBJECT ID: " + selectionMade + " -- HANDLING WITH: d3.select('#selDataset').on('change', function() ") // 
}

function createBarChart(xval, yval, labels) {
  let layout = {
    title: " Top 10 OTUs",
    margin: { t: 30, l: 150 }
  }
  var plotData = [{
    x:  xval,
    y:   yval,
    text: labels,
    name: "Belly Flora",
    type: "bar",
    orientation: "h",
    marker: { color: "cyan-blue" }
}]
Plotly.newPlot("bar", plotData, layout) 
    
}

function createBubbleChart(xval, yval, labels, otuIds) {
  var layoutBubble = { 
    title: "Belly Button Biodiversity",
    xaxis: { title: "OTU ID" }, 
  };
    var dataBubble = [{
      x: xval, 
      y: yval, 
      text: labels, 
      mode: "markers", 
      marker: { 
        size: xval, 
        color: "cyan-blue",
      } 
    }];
    Plotly.newPlot("bubble", dataBubble, layoutBubble);
    
}

