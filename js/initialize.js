window.onload = initialize;

function initialize(){
  showGraphWithFirebaseData();
}

function showGraphWithFirebaseData(){
refSensorData = firebase.database().ref().child("materialsTestApril");
// refSensorData = firebase.database().ref().child("March13Snow");

refSensorData.on("value", function(snapshot){
  var dataReceivedFromFirebase = snapshot.val();
  var averagedHeight = [];
  var temperature = [];

  var minHeightObserved = 1000.0;
  var minTemperatureObserved = 1000.0;

for (var key in dataReceivedFromFirebase){

if (dataReceivedFromFirebase[key].Height < minHeightObserved){
  minHeightObserved = dataReceivedFromFirebase[key].Height;
}

if (dataReceivedFromFirebase[key].Temperature < minTemperatureObserved) {
  minTemperatureObserved = dataReceivedFromFirebase[key].Temperature;
}

temperature.push({Xvalue: dataReceivedFromFirebase[key].timestamp, Yvalue: dataReceivedFromFirebase[key].Temperature});
averagedHeight.push({Xvalue: dataReceivedFromFirebase[key].timestamp, Yvalue: dataReceivedFromFirebase[key].Height});
}
d3.selectAll("svg").remove();

  drawDataPlot(averagedHeight, minHeightObserved);
  drawTemperaturePlot(temperature, minTemperatureObserved);

});
}
