// optionsArray
let optionsArray = ["Food","Beverage","Equipment","Entertainment"];

// When the add-items button is clicked
$("#add-items").on("click", function() {
    // prepend the item form to the item-form div
    $("#item-form").append(
        "<div class='form-group row' style = 'padding-right: 20px; padding-left: 20px'>\
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
    
    // When the delete-row button is clicked
    $(".delete-row").on("click", function() {
        console.log("this click worked");
        // remove the closest row to the button
        $(this).closest('.row').remove() 
    })
});
$(".delete-row").on("click", function() {
    console.log("this click worked");
    // remove the closest row to the button
    $(this).closest('.row').remove() 
})
// When the bringer-button is clicked
$(".bringer-button").on("click", function() {
    var id = $(this).attr("value");
    if ($(this).attr("data")=="false"){
    $(this).text(username);
    $.ajax({
        url: '/api/bring',
        type: 'PUT',
        data:{
        bringer_name: username,
        item_id: id},
        success: function(response) {
          console.log(response);
        }
     });
    $(this).attr("data", "true");
    }
    else if ($(this).attr("data")=="true"){
    $.ajax({
        url: '/api/bring',
        type: 'PUT',
        data: {
        bringer_name: null,
        item_id: id},
        success: function(response) {
          console.log(response);
        }
     });
    $(this).text("I'll Bring It!");
    $(this).attr("data", "false");
    }
})

// When the form-submit button is clicked
$("#form-submit").on("click", function() {
  // Append the information to the item-container div  
 $("#thanks").css("display", "inline")
})