function ElementDom(tag, data, text, id){
    this.create = function (type){
        this.node = document.createElement(type);
        if (id !== undefined && id !== "") this.node.setAttribute("id", id);
        if (text !== undefined && text !== "") this.node.innerText = text;
    };
    this.style = function(style, value){
        this[style] = value;
    }; 
    this.set_style = function(style, value){
        this.node.style[style] = value;
    };
    this.insert = function(tag, data){
        if (data !== "Object" && data !== "String"){
            this.create(tag);
            for (key in data){
                this.style(key, data[key]);
                this.set_style(key, data[key]);
            }
        }else{
            throw new Error("Не правильный тип данных");
        }
        return this.node;
    }
    return this.insert(tag, data);
}

function constructorLoad(){
    var div = new ElementDom("div", 
    {
        width :  window.outerWidth + "px",
        height : window.outerHeight + "px",
        overflow : "hidden",
        background : "#FFF",
        position : "fixed",
        zIndex : "10000000000",
        display : "block",
        textAlign : "center",
        top : "0"
    }, 
    "","load");
    var childDiv = new ElementDom("div", {
        width : "150px",
        height : "50px",
        margin : "150px auto",
        display : "block"
    });
    var i = new ElementDom("i", {
        width : "50px",
        height : "50px",
        display : "block",
        margin : "0 auto",
        border : "5px solid #589255",
        marginBottom : "10px",
        animation : "fa-spin 2s infinite linear"
    })
    var span = new ElementDom("span", {
        fontSize : "16pt"
    }, "Загрузка..."); 
    
    childDiv.append(i);
    childDiv.append(span);
    div.append(childDiv);
    return div;
}

(function loadWindow(){
    document.loadPage = setInterval(() => {
        if(document.body.childElementCount !== undefined){
            if (document.querySelectorAll("#load").length == 0){
                document.body.prepend(constructorLoad());
            }
        }
    },10)
})(true)

document.addEventListener("DOMContentLoaded", ready);

function ready(){
    clearInterval(document.loadPage);
    document.querySelector("#load").remove();
    document.body.style.overflow = "auto";
}