// optionsArray
let optionsArray = ["Food","Beverage","Equipment","Entertainment"];
var optionsAsString = "";
let itemId = 0;

$("#add-items").on("click", function() {
    itemId++;
    $("#item-form").prepend(
        "<div class='form-group row'>\
            <label for='example-text-input'>Name</label>\
            <div class=''>\
                <input class='form-control' name='name' type='text' value='' id='item-name'>\
            </div>\
            <label for='example-text-input'>Quantity</label>\
            <div class=''>\
                <input class='form-control' type='text' value='' id='item-quantity'>\
            </div>\
            <label for='itemType'>Type</label>\
            <select></select>\
            <label for='example-text-input'>Cost</label>\
            <div class=''>\
                <input class='form-control' type='text' value='' id='item-name'>\
            </div>\
            <div class=>\
            <button class='btn btn-success btn-delete delete-row' id='delete-row' type='button'>\
                X\
            </button>\
        </div>\
        </div>"
    )

    $("select:not([name])").attr("name",itemId);
    optionsAsString = "";
    for(var i = 0; i < optionsArray.length; i++) {
        optionsAsString += "<option value='" + optionsArray[i] + "'>" + optionsArray[i] + "</option>";
        
    }
    $( 'select[name='+ itemId +']' ).append( optionsAsString );
    console.log(parseInt(optionsArray[i]));
    console.log(optionsArray[i]);
    
    $(".delete-row").on("click", function() {
        console.log("this click worked");
        $(this).closest('.row').remove() 
    })
})
