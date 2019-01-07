// optionsArray
let optionsArray = ["Food","Beverage","Equipment","Entertainment"];

// When the add-items button is clicked
$("#add-items").on("click", function() {
    // prepend the item form to the item-form div
    $("#item-form").prepend(
        "<div class='form-group row'>\
            <label for='example-text-input'>Name</label>\
            <div class=''>\
                <input class='form-control' name='itemName' type='text' value='' id='item-name'>\
            </div>\
            <label for='example-text-input'>Quantity</label>\
            <div class=''>\
                <input class='form-control' name='quantity' type='text' value='' id='item-quantity'>\
            </div>\
            <label for='itemType'>Type</label>\
            <div class=''>\
            <select name='type'>\
            <option>Food</option>\
            <option>Beverage</option>\
            <option>Equipment</option>\
            <option>Entertainment</option>\
            </select>\
            </div>\
            <label for='cost'>Cost</label>\
            <div class=''>\
                <input class='form-control' name='cost' type='text' id='cost'>\
            </div>\
            <div class=>\
            <button class='btn btn-success btn-delete delete-row' id='delete-row' type='button'>\
                X\
            </button>\
        </div>\
        </div>"
    )
    
    // Create an input variable to access the event-id for the items to connect to the event
    var input = $("<input>").attr("type", "hidden").attr("name", "mydata").val(event_id);
    // Append the hidden value to the item-form div
    $("#item-form").append(input)
    
    // When the delete-row button is clicked
    $(".delete-row").on("click", function() {
        console.log("this click worked");
        // remove the closest row to the button
        $(this).closest('.row').remove() 
    })
});

// When the bringer-button is clicked
$(".bringer-button").on("click", function() {
    console.log("clicky clicky");
    var location = "#bringer-td" + $(this).attr("id");
    // Display the username
    console.log(location);
    $(location).html(username)
})

// When the form-submit button is clicked
$("#form-submit").on("click", function() {
  // Append the information to the item-container div  
 $(".item-container").append("<h3>Thanks for submitting your necessities!</h3><a href='/view2/" + event_id + "'>View Event</a>")
})