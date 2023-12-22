var keywords = [];

var keys =
    [
        "Adyen",
        "Bank of America Merchant Services",
        "Braintree",
        "Chase Paymentech",
        "Stripe Payments",
        "Stripe",
        "Shopify Payments",
        "Shopify",
        "Worldpay",
        "First Data",
        "Tsys",
        "PayPal",
        "Payflow",
        "Checkout.com",
        "Paymetric",
        "Vantiv",
        "Xipay",
        "Cybersource",
        "FreedomPay",
        "Amazon Pay",
        "Apple Pay",
        "Google Pay",
        "Chase Pay",
        "Venmo",
        "Click to Pay",
        "Android Pay",
        "Bitcoin",
        "Affirm",
        "Afterpay",
        "Klarna",
        "Quadpay",
        "Sezzle",
        "Shopify",
        "Wix",
        "Bigcommerce",
        "Squarespace",
        "Square online",
        "Weebly",
        "Woocommerce",
        "Demandware",
        "Salesforce",
        "Ecwid",
        "Volusion",
        "3DCart",
        "Magento",
        "Riskified",
        "Bolt",
        "Signifyd",
        "Kount",
        "Sift",
        "Fast",
        "Stripe Radar",
        "Accertify"
    ]

//this is the main function to execute
function countKeywords(inputField, outputField) {
    //check if input field is blank, if so, create a "keywords" json using the keys list
    if (inputField == "") {
        for (var i = 0; i < keys.length; i++) {
            var name = keys[i];
            var row = { "Keyword": name, "Count": 0, "FoundURLs": [], "FoundElements": [] };
            keywords.push(row);
        }
    } else {
        //if not blank, parse the previously captured json from the given input field
        keywords = JSON.parse(M_GetFieldValue(inputField).value);
    }

    //iterate through all keywords using xpath
    for (var i = 0; i < keywords.length; i++) {
        var currRow = keywords[i];
        var key = currRow["Keyword"];

        var allXpaths = createXpaths(key);

        //console.log(allXpaths);

        var xpath = allXpaths;
        var myList = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        var realList = [];
        var nextTag = myList.iterateNext();
        while (nextTag) {
            realList.push(nextTag);
            var nextTag = myList.iterateNext();
        }

        var keywordCount = realList.length;

        var currURL = "";
        var elementsList = [];

        //get the current URL if the keyword was found
        if (keywordCount > 0) {
            currURL = window.location.href;            
        }

        //get list of elements that were found
        for (var j = 0; j < realList.length; j++) {
            el = realList[j];
            elClone = el.cloneNode(true);

            var tmp = document.createElement("div");
            tmp.appendChild(elClone);
            var elementText = tmp.innerHTML;
            elementsList.push(elementText.replace(/\s+/g, " "));
        }

        //update the keywords list with the amount of times the keyword was found (and other fields)
        console.info(key, keywordCount);
        currRow["Count"] = currRow["Count"] + keywordCount;
        //add the current url to an array if the keyword was found
        if (currURL != "") {
            currRow["FoundURLs"].push(currURL);
        }
        //remove possible duplicate urls
        currRow["FoundURLs"] = currRow["FoundURLs"].filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        //count the number of URLs in the array
        currRow["NumFoundURLs"] = currRow["FoundURLs"].length;
        //Add the found elements to the keywords object
        //currRow["FoundElements"] = currRow["FoundElements"].concat(elementsList);
        //remove possible duplicate elements
        /*currRow["FoundElements"] = currRow["FoundElements"].filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })*/
    }

    //set the keywords list to the given output field as a string to be used on other pages
    var outputKeywords = JSON.stringify(keywords);
    console.log(keywords);

    var output = { [outputField]: outputKeywords };
    M_SetFieldValues(output);
    //M_StopWaiting();

}

// this function creates a list of xpaths with several iterations of the keywords (removing whitespace, normalizing case, etc)
function createXpaths(key) {
    var keyNoSpace = key.replace(/\s/g, "");
    var keyLower = key.toLowerCase();
    var keyNoSpaceLower = keyLower.replace(/\s/g, "");
    var keyUpper = key.toUpperCase();
    var keyNoSpaceUpper = keyUpper.replace(/\s/g, "");

    var formattedKeys = [key, keyNoSpace, keyNoSpaceLower, keyUpper, keyNoSpaceUpper];

    //console.log(formattedKeys);

    var xpaths = [];

    for (var i = 0; i < formattedKeys.length; i++) {
        var curFormKey = formattedKeys[i];
        xpaths.push(`//*[contains(@*,"` + curFormKey + `")][not(@id="myScript")]`);
        xpaths.push(`//*[contains(text(),"` + curFormKey + `")][not(@id="myScript")]`);
    }

    xpaths = xpaths.join(" | ");

    return xpaths;
}

function captureFinalOutput(finalInputField) {

    var input = M_GetFieldValue(finalInputField).value;
    var keywords = JSON.parse(input);

    //fix FoundURLs abd FoundElements arrays for mozenda output
    for (var i = 0; i < keywords.length; i++) {
        var row = keywords[i];
        row["FoundURLs"] = row["FoundURLs"].filter(Boolean).join(" | ");
        //row["FoundElements"] = row["FoundElements"].filter(Boolean).join(" | ");
    }

    M_SetFieldValues(keywords);
    //M_StopWaiting();

}