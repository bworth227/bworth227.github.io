function calculateTips() {
  var total = Number(document.getElementById("total").value)
  var custom = Number(document.getElementById("custom").value);

  var percents = [custom * .01, .15, .18, .2, .25];

  var totals = [];

  for (var i = 0; i < percents.length; i++) {
      var perc = percents[i];
      var actual_total = Math.round(total + (total * perc))
      var actual_tip = Math.round(diff(actual_total, total) * 100) / 100;
      if (actual_total != total + actual_tip) {
          console.log("rounding screwed up");
      }
      var actual_perc = Math.round((actual_tip / total) * 10000) / 100
      totals.push({"Total": "$" + actual_total, "Tip": "$" + actual_tip, "Original Percent": perc * 100 + "%", "Adjusted Percentage": actual_perc + "%"})
  }
  console.log(totals)
  var inNode = document.getElementById("outputContainer");
  inNode.innerText = "";
  parse(totals, inNode)
}

function diff (num1, num2) {
  if (num1 > num2) {
    return num1 - num2;
  } else {
    return num2 - num1;
  }
}

function parse(object, node) {
  for (x in object) {
    var div = document.createElement("div");
    div.setAttribute("class",typeof object[x]);
    div.setAttribute("name",x);
    node.appendChild(div);
    if (typeof object[x] == 'object') {
      parse(object[x],div);
    }
    else{div.textContent = x + ": " + object[x];}
  }
}