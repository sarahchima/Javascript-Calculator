$(document).ready(function() {
  var a = "";

  function getText() {
    return $("#calculation").html();
  }

  function displayResult(value) {
    $("#result").html(value);
  }

  function displayCalc(val) {
    var text = getText();
    if (text == "Syntax Error") {
      $("#calculation").html(val);
    } else {
      $("#calculation").html(text + val);
    }
  }
  var value = $("#btnPower").html();
  var result = 0;
  $("#btnPower").on("click", function() {

    if (value === "ON") {
      displayResult(0);
      $("#btnPower").html("OFF");
      value = "OFF";
    } else {
      $("#calculation").html("");
      displayResult("");
      $("#btnPower").html("ON");
      value = "ON";
    }
  })

  $(".numbers").each(function(index) {
    $(this).on("click", function() {
      if (value == "OFF" && getText().length < 30) {
        displayCalc($(this).text());
        a += $(this).text();
      }
    });
  });
  $(".arithmetic").each(function(index) {
    $(this).on("click", function() {
      if (value == "OFF"&& $("#calculation").html() === "" && result !== 0) {
        $("#calculation").html(result + $(this).text);
      }
    });
  });

  $(".trig").each(function(index) {

    $(this).on("click", function() {
      if (value == "OFF" && getText().length < 30) {
        var degrees = Math.PI / 180;
        displayCalc($(this).text() + "(");
        a += "Math." + $(this).text() + "(" + degrees + "*";
      }
    });

  });
  $("#btnClear").on("click", function() {
    if (value == "OFF") {
      $("#calculation").html("");
      a = "";
      displayResult(0);
    }
  });
  $("#btnEquals").on("click", function() {

    result = eval(a);
    if (result == undefined) {
      $("#calculation").html("Syntax Error");
    }
    displayResult(result);
    a = "";
    $("#calculation").html("");
  });
  $("#btnPercent").on("click", function() {
    displayResult(eval(a) / 100);
  });

  $("#btnClearOne").on("click", function() {
    var calcText = getText();
    var arr = calcText.split("");
    var copyArr = arr.slice();
    var checker = copyArr.splice(arr.length - 4, 4);
    checker = checker.join("");

    if (checker === "cos(" || checker === "sin(" || checker === "tan(") {
      for (var j = 0; j < 4; j++) {
        arr.pop();
      }
    } else {
      arr.pop();
    }
    a = arr.join("");

    $("#calculation").html(a);
  });
  var index = 0;
  $("#btnSign").on("click", function() {
    if (value == "OFF") {
      if (a[index] != "-") {
        var mathOperators = /([-+/*])/g;
        var count = 0;
        for (var i = a.length - 1; i >= 0; i--) {
          if (mathOperators.test(a[i]) == true && i !== 0) {
            index = i + 1;
            var arrayA = a.split("");
            arrayA.splice(i + 1, 0, "-");
            a = arrayA.join("");
            break;
          }
          count++;
        }
        if (count == a.length) {
          a = "-" + a;
        }
        $("#calculation").html(a);
      } else {
        var arr = a.split("");
        if (index === 0) {
          arr.shift();
        } else {
          arr.splice(index, 1);
        }
        a = arr.join("");
        $("#calculation").html(a);
      }
    }
  });

});