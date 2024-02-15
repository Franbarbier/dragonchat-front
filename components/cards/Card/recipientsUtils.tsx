import { STATUS } from "../../../enums"
import { ContactInfo } from "../CardsContFree"

export const executeFormat = (inputText:string, type: string, index:number, finalList, {notification, setNotification}) => {

    let breaks = new RegExp("\n")
    let tabs = new RegExp("\t")

    let prevCells:ContactInfo[] = finalList.slice(0, index)

    var newContacts:ContactInfo[] = []

    if (!breaks.test(inputText) && !tabs.test(inputText)) {

        let updateContact = [...finalList]
        updateContact[index][type] = inputText
        

        if (updateContact[index].nombre === "" && updateContact[index].numero === ""  && updateContact.length > 1) {
            updateContact.splice(index, 1)
        }

        newContacts = updateContact

        
    }else if(breaks.test(inputText) && tabs.test(inputText )){
        
        let rawRows = inputText.split("\n");

        let output : ContactInfo[] = [];
        rawRows.forEach((rawRow, idx) => {

            let rowObject: any = {};
            let values = rawRow.split("\t");

            rowObject['nombre'] = values[0];   
            rowObject['numero'] = values[1];
            
            output.push(rowObject);
            
        });
   
        newContacts = prevCells.concat(output);
        

    }else if(breaks.test(inputText)){

        let rawRows = inputText.split("\n");

        let output : ContactInfo[] = [];

        var newList = [...finalList]
        newList = newList.slice(prevCells.length)
        
        rawRows.map((rawRow, index) => {
            
            let rowObject: any = {};
            
            if(newList[index]){
                if (type == "numero") {                       
                    rowObject['numero'] = rawRow;
                    rowObject['nombre'] = newList[index].nombre;
                }
                if (type == "nombre") {
                    rowObject['numero'] = newList[index].numero;  
                    rowObject['nombre'] = rawRow;  
                }
            }else{
                if (type == "numero") {
                    rowObject['numero'] = rawRow;
                    rowObject['nombre'] = '';
                }
                if (type == "nombre") {
                    rowObject['numero'] = '';  
                    rowObject['nombre'] = rawRow;  
                }
            }               
            output.push(rowObject);
        });

        newContacts = prevCells.concat(output);
        

    }else if(tabs.test(inputText)){

        let rawCols = inputText.split("\t");
        let output : ContactInfo[] = [];

        let rowObject: any = {};

        rowObject['nombre'] = rawCols[0];
        rowObject['numero'] = rawCols[1];

        output.push(rowObject);

        newContacts = prevCells.concat(output);
    }


    newContacts.map((item)=>{
        item.numero = item.numero?.replace(/[^0-9]/g, '');
    })
    const lastObject = newContacts[newContacts.length - 1];



    if ((lastObject.hasOwnProperty("nombre") && lastObject.nombre != "") || (lastObject.hasOwnProperty("numero") && lastObject.numero != "") ) {
        newContacts = [...newContacts, {'nombre':'', 'numero':''}]
    }

    let finalDupls = checkDuplicated2(newContacts, notification, setNotification)

    return finalDupls

}

const checkDuplicated2 = (filtered, notification, setNotification) => {

    const data = [...filtered];
    // Create a map to store counts of each numero value
    const countMap = new Map();
    data.forEach((item) => {
            const count = countMap.get(item.numero) || 0;
            countMap.set(item.numero, count + 1);
    });

    const repeatedCounterMap = new Map();

    // Filter the array to get objects with repeated numero values, as long as its not empty
    const objectsWithRepeats = data.filter((item) => countMap.get(item.numero) > 1 && item.numero != "");
    
    // add as "repeated" property to each object the value of the count in case it is repeated
    let newObjectsWithRepeats = objectsWithRepeats.map((item) => {
        
            const repeatedNumber = repeatedCounterMap.get(item.numero) || 1;
            repeatedCounterMap.set(item.numero, repeatedNumber + 1);
            
            setNotification({
                status : STATUS.ERROR,
                render : true,
                message : "No puede haber numeros repetidos en la lista.",
                modalReturn : () => {
                    setNotification({...notification, render : false},
                )}
            })

            return {
                ...item,
                repeated: repeatedNumber,
                selected: repeatedNumber > 1
            }

    });

    //   get all items that are not repeated or are empty
    let objectsWithoutRepeats:any = data.filter((item) => countMap.get(item.numero) == 1 || item.numero == "" );
    objectsWithoutRepeats = objectsWithoutRepeats.map((item) => {
       
        return{
                ...item,
                repeated: countMap.get(item.numero) == 1 && undefined,
                selected: item.selected ? item.selected : (countMap.get(item.numero) > 1 && item.numero != "")
            }
    })

    newObjectsWithRepeats.sort((a, b) => (a.numero > b.numero ? 1 : a.numero < b.numero ? -1 : 0));

    return [...newObjectsWithRepeats, ...objectsWithoutRepeats];
}