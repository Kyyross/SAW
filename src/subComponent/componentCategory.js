import { works } from '../Firebase/firebase_db.js';
import { categories, codContainer, warning, ItemDataSetter, inModal, modalCategState, itemData } from '../globalVar.js';
import { Categoria } from '../myclass.js';
import { reactive } from 'vue';
export const images=["/src/icons/1.svg","/src/icons/2.svg","/src/icons/3.svg","/src/icons/4.svg",
"/src/icons/5.svg","/src/icons/6.svg","/src/icons/7.svg","/src/icons/8.svg","/src/icons/9.svg","/src/icons/10.svg",
"/src/icons/11.svg","/src/icons/12.svg","/src/icons/13.svg","/src/icons/14.svg","/src/icons/15.svg","/src/icons/16.svg",
"/src/icons/17.svg","/src/icons/18.svg","/src/icons/19.svg","/src/icons/20.svg"];
export const colors=reactive({value:{}});
export const matColors = {
	"#ff6f00" : {
		50 : '#fff8e1',
		100 : '#ffecb3',
		200 : '#ffe082',
		300 : '#ffd54f',
		400 : '#ffca28',
		500 : '#ffc107',
		600 : '#ffb300',
		700 : '#ffa000',
		800 : '#ff8f00',
		900 : '#ff6f00',
	},
	"#263238" : {
		50 : '#ECEFF1',
		100 : '#CFD8DC',
		200 : '#B0BEC5',
		300 : '#90A4AE',
		400 : '#78909C',
		500 : '#607D8B',
		600 : '#546E7A',
		700 : '#455A64',
		800 : '#37474F',
		900 : '#263238',
	},
	"#0D47A1" : {
		50 : '#E3F2FD',
		100 : '#BBDEFB',
		200 : '#90CAF9',
		300 : '#64B5F6',
		400 : '#42A5F5',
		500 : '#2196F3',
		600 : '#1E88E5',
		700 : '#1976D2',
		800 : '#1565C0',
		900 : '#0D47A1',
	},
	"#3E2723" : {
		50 : '#EFEBE9',
		100 : '#D7CCC8',
		200 : '#BCAAA4',
		300 : '#A1887F',
		400 : '#8D6E63',
		500 : '#795548',
		600 : '#6D4C41',
		700 : '#5D4037',
		800 : '#4E342E',
		900 : '#3E2723',
	},
	"#006064" : {
		50 : '#E0F7FA',
		100 : '#B2EBF2',
		200 : '#80DEEA',
		300 : '#4DD0E1',
		400 : '#26C6DA',
		500 : '#00BCD4',
		600 : '#00ACC1',
		700 : '#0097A7',
		800 : '#00838F',
		900 : '#006064',
	},
	"#BF360C" : {
		50 : '#FBE9E7',
		100 : '#FFCCBC',
		200 : '#FFAB91',
		300 : '#FF8A65',
		400 : '#FF7043',
		500 : '#FF5722',
		600 : '#F4511E',
		700 : '#E64A19',
		800 : '#D84315',
		900 : '#BF360C',
	},
	"#311B92" : {
		50 : '#EDE7F6',
		100 : '#D1C4E9',
		200 : '#B39DDB',
		300 : '#9575CD',
		400 : '#7E57C2',
		500 : '#673AB7',
		600 : '#5E35B1',
		700 : '#512DA8',
		800 : '#4527A0',
		900 : '#311B92',
	},
	"#1B5E20" : {
		50 : '#E8F5E9',
		100 : '#C8E6C9',
		200 : '#A5D6A7',
		300 : '#81C784',
		400 : '#66BB6A',
		500 : '#4CAF50',
		600 : '#43A047',
		700 : '#388E3C',
		800 : '#2E7D32',
		900 : '#1B5E20',
	},
	"#212121" : {
		50 : '#FAFAFA',
		100 : '#F5F5F5',
		200 : '#EEEEEE',
		300 : '#E0E0E0',
		400 : '#BDBDBD',
		500 : '#9E9E9E',
		600 : '#757575',
		700 : '#616161',
		800 : '#424242',
		900 : '#212121',
	},
	"#1A237E" : {
		50 : '#E8EAF6',
		100 : '#C5CAE9',
		200 : '#9FA8DA',
		300 : '#7986CB',
		400 : '#5C6BC0',
		500 : '#3F51B5',
		600 : '#3949AB',
		700 : '#303F9F',
		800 : '#283593',
		900 : '#1A237E',
	},
	"#01579B" : {
		50 : '#E1F5FE',
		100 : '#B3E5FC',
		200 : '#81D4FA',
		300 : '#4FC3F7',
		400 : '#29B6F6',
		500 : '#03A9F4',
		600 : '#039BE5',
		700 : '#0288D1',
		800 : '#0277BD',
		900 : '#01579B',
	},
	"#33691E" : {
		50 : '#F1F8E9',
		100 : '#DCEDC8',
		200 : '#C5E1A5',
		300 : '#AED581',
		400 : '#9CCC65',
		500 : '#8BC34A',
		600 : '#7CB342',
		700 : '#689F38',
		800 : '#558B2F',
		900 : '#33691E',
	},
	"#827717" : {
		50 : '#F9FBE7',
		100 : '#F0F4C3',
		200 : '#E6EE9C',
		300 : '#DCE775',
		400 : '#D4E157',
		500 : '#CDDC39',
		600 : '#C0CA33',
		700 : '#AFB42B',
		800 : '#9E9D24',
		900 : '#827717',
	},
	"#E65100" : {
		50 : '#FFF3E0',
		100 : '#FFE0B2',
		200 : '#FFCC80',
		300 : '#FFB74D',
		400 : '#FFA726',
		500 : '#FF9800',
		600 : '#FB8C00',
		700 : '#F57C00',
		800 : '#EF6C00',
		900 : '#E65100',
	},
	"#880E4F" : {
		50 : '#FCE4EC',
		100 : '#F8BBD0',
		200 : '#F48FB1',
		300 : '#F06292',
		400 : '#EC407A',
		500 : '#E91E63',
		600 : '#D81B60',
		700 : '#C2185B',
		800 : '#AD1457',
		900 : '#880E4F',
	},
	"#4A148C" : {
		50 : '#F3E5F5',
		100 : '#E1BEE7',
		200 : '#CE93D8',
		300 : '#BA68C8',
		400 : '#AB47BC',
		500 : '#9C27B0',
		600 : '#8E24AA',
		700 : '#7B1FA2',
		800 : '#6A1B9A',
		900 : '#4A148C',
	},
	"#B71C1C" : {
		50 : '#FFEBEE',
		100 : '#FFCDD2',
		200 : '#EF9A9A',
		300 : '#E57373',
		500 : '#F44336',
		600 : '#E53935',
		700 : '#D32F2F',
		800 : '#C62828',
		900 : '#B71C1C',
	},
	"#004D40" : {
		50 : '#E0F2F1',
		100 : '#B2DFDB',
		200 : '#80CBC4',
		300 : '#4DB6AC',
		400 : '#26A69A',
		500 : '#009688',
		600 : '#00897B',
		700 : '#00796B',
		800 : '#00695C',
		900 : '#004D40',
	},
	"#F57F17" : {
		50 : '#FFFDE7',
		100 : '#FFF9C4',
		200 : '#FFF59D',
		300 : '#FFF176',
		400 : '#FFEE58',
		500 : '#FFEB3B',
		600 : '#FDD835',
		700 : '#FBC02D',
		800 : '#F9A825',
		900 : '#F57F17',
	}
}

export const LoadImg = (codIcona) => {
    return images[codIcona];
}

export const PickIcon = (codIcon) => {
    itemData.value.nIcon=codIcon.toString();
    CloseCategGump(1);
}

export const PickColor = (codColor) => {
    itemData.value.color=colors.value[codColor];
    CloseCategGump(1);
}

export const ModCateg=()=>{
    try{
        let nameC=itemData.value.nCateg;
        if(categories.value[nameC]){
            let rename=itemData.value.rename;
            if(rename===""){warning.value="scegliere un nome"; return;}
            if(categories.value[rename]&&nameC!==rename){ 
                warning.value="esiste già questa categoria";
                return;
            }
            for(let key of categories.value[nameC]["Transitions"])
                codContainer[key[0]]=rename;
            categories.value[rename]=categories.value[nameC];
            categories.value[rename]["nCateg"]=rename;
            categories.value[rename]["codIcona"]=itemData.value.nIcon;
            categories.value[rename]["color"]=itemData.value.color;
            if(nameC!==rename)delete(categories.value[nameC]);
            works.updateWork({"codContainer":codContainer, "categories":categories.value});
            CloseCategGump(0);
        } 
    }catch(e){console.error("error on delete categoria"+e);}
}

export const AddCateg=()=>{
    var obje=new Categoria(itemData.value.nCateg,itemData.value.nIcon); 
    if(Check(obje)) return;
    categories.value[itemData.value.nCateg]={"nCateg":itemData.value.nCateg,"codIcona":obje.nIcon, "color": itemData.value.color ,"Transitions":[]};
    let obj={"categories":{}};
    obj.categories[itemData.value.nCateg]=categories.value[itemData.value.nCateg];
    works.addWork("categories",obj);
    CloseCategGump(0);
}

export const RemCateg=(item)=>{
    try{
        if(categories.value[item]){
            for(let key of categories.value[item]["Transitions"]){
                console.log(key[0]);
                delete(codContainer[key[0]]);
            }
            delete(categories.value[item]);
            works.updateWork({"codContainer":codContainer, "categories":categories.value});
            CloseCategGump(0);
        } 
    }catch(e){console.error("error on delete categoria"+e);}
}

export const MergeCateg=()=>{
    try{
        let categ1=itemData.value.nCateg;
        let categ2=itemData.value.rename;
        if(categ2===""||!categories.value[categ2]||categ1==categ2){
            warning.value="Il nome della categoria non è valido";
            return;
        }
        for(let key of categories.value[categ1]["Transitions"]){
            codContainer[key[0]]=categ2;
            categories.value[categ2]["Transitions"].push(key);
        }
        delete(categories.value[categ1]);
        works.updateWork({"codContainer":codContainer,"categories":categories.value})
        CloseCategGump(0);
    }catch(e){console.error(e);}
}

//OPEN MODAL
export const OpenCategGump = (type,...rest) => {
    [inModal.bool,warning.value]=[true,""];
    switch(type){
        case "add":{
            modalCategState.add="block";
            ItemDataSetter("","","","","","","","");
        }break;
        case "mod":{
            modalCategState.mod="block";
            ItemDataSetter(rest[0],rest[1],"","","","",rest[0],rest[2]);
        }
        break;
        case "del":{
            modalCategState.del="block";
            ItemDataSetter(rest[0],rest[1],"","","","","",rest[2]);
        }break;
        case "merge":{
            modalCategState.merge="block";
            ItemDataSetter(rest[0],rest[1],"","","","","",rest[2]);
        }
        break;
        case "genericColorPicker":{
            modalCategState.genericColorPicker="block";
        }break;
        case "colorPicker":{
            colors.value=rest[0];
            modalCategState.colorPicker="block";
        }break;
        case "iconPicker":{
            modalCategState.iconPicker="block";
        }break;
        default:break;
    }
};

//CLOSE MODAL
export const CloseCategGump = (lvl=0) => {
    switch(lvl){
        case 0:{
            [inModal.bool,modalCategState.add,modalCategState.mod,modalCategState.del,modalCategState.merge]=[false,"none","none","none","none"];
        }break;
        case 1:{
            [modalCategState.genericColorPicker, modalCategState.colorPicker, modalCategState.iconPicker]=["none","none","none"];
        }break;
        case 2:{
            [modalCategState.colorPicker]=["none"];
        }
        default:break;
    }
}

function Check(obje){
    if(obje.nCateg==""||obje.nIcon==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
    if(categories.value[obje.nCateg]){warning.value="esiste già una categoria con questo nome"; return true;}
    return false;
}

