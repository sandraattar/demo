
//set a variable that stores every element with the class name change-status

var change = document.getElementsByClassName("change-status");
var hathef = document.getElementsByClassName("delete-posting");
var submitChanges = document.getElementsByClassName("submit-changes");

//html uses node list data type so in order
//turning change into array so we use for
Array.from(change).forEach(function(element){
  //we are adding an event listener to each element with change-status class name
  element.addEventListener('click', function(){
    //set a variable that stores this(element with change-status class)
    //NOTE: each element in html is also reffered to as a node

    const statusText = this.parentNode.childNodes[9].innerText;
    console.log(statusText)
    const status= this.parentNode.childNodes[9];
    console.log(status)
    // create an input element
    const input= document.createElement('input')
    //create a span in the DOM
    const check= document.createElement('span')
    // add an attribute to the input
    //NOTE: attributes describe the element
    input.setAttribute('value', statusText)
    input.setAttribute('class', 'new-posting-status')
    check.innerText = 'save'

    status.appendChild(input)
    status.appendChild(check)

    //add attribute to checkmark
    check.setAttribute('class','submit-changes check')

    // add event listener
    check.addEventListener('click', submitChangesFunc);
    // status.appendChild(check)

  })
})

function submitChangesFunc() {
  // 'this' is refering check
  const name = this.parentNode.parentNode.querySelector('.posting-name').innerText
  const location = this.parentNode.parentNode.querySelector('.posting-location').innerText
  const status = this.parentNode.querySelector('.new-posting-status').value
  console.log(name)
  console.log(location);
  console.log(status);
  //
  fetch('api/status', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name':name,
      'location':location,
      'status': status
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
}

Array.from(hathef).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.querySelector('.posting-name').innerText
        const location = this.parentNode.querySelector('.posting-location').innerText
        //const id = this.parentNode.parentNode.querySelector('.posting-id').innerText
        console.log(name);
        fetch('api/delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name
          })
        }).then(function (response) {
          console.log(response)
          // window.location.reload()
        })
      });
});
