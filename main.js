/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.querySelector("#all-messages");
const usernameElem = document.querySelector("#username");
const messageElem = document.querySelector("#message");
const sendBtn = document.querySelector("#send-btn");
sendBtn.onclick = updateDB;
/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event) {
    //prevent default form behavior
    event.preventDefault();

    //make a temp obj called data like in the @TODO
    let data = {
        USERNAME: usernameElem.value,
        MESSAGE: messageElem.value
    };

    //print just in case
    console.log(data);

    //push data object to database
    database.push(data);

    //reset message value
    messageElem.value = "";
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */

database.on("child_added", addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData) {
    console.log(rowData);
    
    //get the "object form" of the data passed from firebase
    let data = rowData.val();
    
    //print for good measure
    console.log(data);
    
    //get the singleMessageElem
    let singleMessage = makeSingleMessageHTML(data.USERNAME, data.MESSAGE);

    // append singleMessage to #all-messages
    allMessages.append(singleMessage);
}

/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt) {
    // create a parent div
    let parentdiv = document.createElement("div");
    // add a .single-message class to div
    parentdiv.setAttribute("class", "single-message");

    //make a p tag called usernameP
    let usernameP = document.createElement("p");
    // add a .single-message-username as a class to this p
    usernameP.classList.add("single-message-username");
    //update the innerHTML of the p tag to the correct data
    usernameP.innerHTML = usernameTxt + ":";
    parentdiv.append(usernameP);

    //create a p tag called messageP
    let messageP = document.createElement("p");
    //update the innerHTML
    messageP.innerHTML = messageTxt;
    //append p tag to parentdiv
    parentdiv.append(messageP);

    
    //return the parentdiv
    return parentdiv
}
/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */