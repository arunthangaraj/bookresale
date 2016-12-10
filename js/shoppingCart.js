function shoppingCart(cartName) 
{
    this.cartName = cartName;
    this.items = [];
    this.itemIds = [];
    this.itemQtys = [];
    this.totalPrice=[];
   
    this.loadItems();
}

// load items from local storage
shoppingCart.prototype.loadItems = function()
{
    var items = localStorage !== null ? localStorage[this.cartName + "_items"] : null;
    var itemIds = localStorage !== null ? localStorage[this.cartName + "_itemIds"] : null;
    var amount = localStorage !== null ? localStorage[this.cartName + "_price"] : null;
    if(items != null && JSON !=null)
    {
        var itemSet = JSON.parse(items);
        for(var i=0; i<itemSet.length; i++)
        {
            var item = itemSet[i];
            if(item.id != null &&  item.price != null && item.qty != null)
            {
                item = new cartItem(item.id, item.name, item.price, item.qty);
                this.items.push(item);
                this.itemIds.push(item.id);
          //      alert(item.qty);
                this.itemQtys.push(item.qty);
            }
        }
    }
    localStorage['userId'];
}

// save items to local storage
shoppingCart.prototype.saveItems = function () 
{
    if (localStorage != null && JSON != null) 
    {	
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
		
        localStorage[this.cartName + "_itemIds"] = JSON.stringify(this.itemIds);

        localStorage[this.cartName + "_itemQtys"] = JSON.stringify(this.itemQtys);
	localStorage[this.cartName + "_price"]=	JSON.stringify(this.price);
    }
   }

// adds an item to the cart
shoppingCart.prototype.addItem = function(unitprice,order,amount)
{
    
    var amount=amount+unitprice;
   if(this.itemIds.indexOf(order.id) > -1)
    {
        this.changeQuantity(order);
       
    }
    else
    {
       
        var id = order.id;
        var name =order.product_name+"-"+order.child_name;
        //alert("id"+order.id+"price"+order.price+"count"+order.item_count+""+name);
        var price = order.price;
        var qty = order.item_count;
       // alert(amount);
        //alert(unitprice);
        
       
        //alert(amount);
        var item = new cartItem(id, name, price, qty);
        this.items.push(item);
        this.itemIds.push(id);
        this.itemQtys.push(qty);
        this.totalPrice.push(amount);
        this.saveItems();
    }
}

 shoppingCart.prototype.changeQuantity = function (order)
 {
     var index = this.itemIds.indexOf(order.id);
     var qty = (order.default_qty) ? order.default_qty : order.qty;
     
     if(qty > 0)
     {
         this.items[index].qty = qty;
         this.itemQtys[index] = qty;
         this.saveItems();
     }
     
     
     
     
     else
     {
        this.removeItem(order.id);
     }
 }


shoppingCart.prototype.removeItem = function (id) 
{
    var index = this.itemIds.indexOf(id);
    this.items.splice(index, 1);
    this.itemIds.splice(index, 1);
    this.itemQtys.splice(index, 1);
        
        // save changes
        this.saveItems();	
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function (id) 
{
    var total = 0;
    for (var i = 0; i < this.items.length; i++) 
    {
        var item = this.items[i];
        if (id == null || item.id == id) 
        {
            total += this.toNumber(item.qty * item.price);
        }
    }
    
    return total.toFixed(2);
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalCount = function () 
{
    return this.items.length;
}

// clear the cart
shoppingCart.prototype.clearItems = function () 
{
    this.items = [];
    this.itemIds = [];
    this.itemQtys = [];
    this.saveItems();
}

shoppingCart.prototype.toNumber = function (value) 
{
    value = value * 1;
    return isNaN(value) ? 0 : value;
}

function cartItem(id, name, price, qty) 
{
    this.id = id;
    this.name = name;
    this.qty = qty;
    this.price = price;
}
