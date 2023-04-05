class Obj{
    constructor(title,lastaccess,text=""){
        this.title=title;
        this.lastaccess=lastaccess;
        this.text=text;
    }
}

class Categoria{
    constructor(nCateg,nIcon){
        this.nCateg=nCateg;
        this.nIcon=nIcon;
    }
}

export {Obj, Categoria}