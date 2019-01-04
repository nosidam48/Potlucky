// optionsArray
let optionsArray = ["Food","Beverage","Equipment","Entertainment"];

$("#add-items").on("click", function() {
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
            <select name='type'>\
            <option>Food</option>\
            <option>Beverage</option>\
            <option>Equipment</option>\
            <option>Entertainment</option>\
            </select>\
            </div>\
            <label for='example-text-input'>Cost</label>\
            <div class=''>\
                <input class='form-control' name='cost' type='text' value='' id='item-name'>\
            </div>\
            <div class=>\
            <button class='btn btn-success btn-delete delete-row' id='delete-row' type='button'>\
                X\
            </button>\
        </div>\
        </div>"
    )
    
    var input = $("<input>").attr("type", "hidden").attr("name", "mydata").val(event_id);
    $("#item-form").append(input)
    
    
    $(".delete-row").on("click", function() {
        console.log("this click worked");
        $(this).closest('.row').remove() 
    })
})
