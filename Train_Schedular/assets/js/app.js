 var config = {
     apiKey: "AIzaSyBCpfhcmOkMDXpM7qK8Asv__jN5com90lo",
     authDomain: "train-schedular-22c6c.firebaseapp.com",
     databaseURL: "https://train-schedular-22c6c.firebaseio.com",
     projectId: "train-schedular-22c6c",
     storageBucket: "train-schedular-22c6c.appspot.com",
     messagingSenderId: "987635007360"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

 // inputs

 var tableBody = document.getElementById("tableBody");
 console.log(tableBody);

 var trainName = document.getElementById("trainName");
 console.log(trainName);

 var destination = document.getElementById("destination");
 console.log(destination);

 var trainTime = document.getElementById("trainTime");
 console.log(trainTime);

 var frequency = document.getElementById("frequency");
 console.log(frequency);

 var submit = document.getElementById("submit");
 console.log(submit);

 $(submit).on("click", function(event) {
     event.preventDefault();
     console.log(trainName.value);
     console.log($(destination).val());
     console.log(trainTime.value);
     console.log($(frequency).val());
     database.ref().push({
         trainName: trainName.value,
         destination: destination.value,
         trainTime: trainTime.value,
         frequency: frequency.value,
     });

 });


 database.ref().on("child_added", function(childSnapshot) {

     // Log everything that's coming out of snapshot
     var train = childSnapshot.val()
     console.log(train);
     console.log(train.trainName);
     console.log(train.destination);
     console.log(train.trainTime);
     console.log(train.frequency);

// TAKE IN FIRST TRAIN TIME
var firstTime = moment(train.trainTime, "hh:mm");
console.log("The first train time is: ", firstTime);

// GET CURRENT TIME USING MOMENT
var currentTime = moment();
console.log(currentTime);

// CHECK WHAT THE DIFFERENCE IN MINUTES ARE BETWEEN FIRST TRAIN AND CURRENT TIME
var timeDifference = parseInt(moment().diff(moment(firstTime), "minutes"));
console.log(timeDifference);

// GET FREQUENCY OF TRAIN PASSING THROUGH
var frequency = parseInt(train.frequency);
console.log(frequency);

// TIME REMAINING
var timeRemaining = timeDifference % frequency;
console.log(timeRemaining);

//
var minutesUntilArriving = frequency - timeRemaining;
console.log(minutesUntilArriving);
var nextTrain = moment().add(minutesUntilArriving, "minutes");
console.log(nextTrain);

     // full list of items to the well
  $(tableBody).append("<tr><td> " + train.trainName +
         " </td><td> " + train.destination +
         " </td><td> " + frequency +
         " </td><td> " + moment(nextTrain).format("hh:mm") + 
         " </td><td> " + minutesUntilArriving + "</td></tr>");

     // // Handle the errors
 }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });



 console.log(moment());