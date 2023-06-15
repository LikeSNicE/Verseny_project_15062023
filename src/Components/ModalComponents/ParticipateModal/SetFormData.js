export default function SetFormData(formData,data){
    if(typeof data !== "object"){
        console.log("Ваши данные должны быть обьектом!");
        return;
    }
    for(let prop in data){
        if(data[prop] !== ""){
          switch(typeof data[prop]){
            case "object":
                console.log(data[prop])
                Object.values(data[prop]).forEach(
                    (value,index) => formData.append(`${index}`,value)
                );
            break;
            case "undefined":
            break;
            default:
                formData.append(prop,data[prop]);
          }
        }
      }
}

export const getAccept = (type) =>{
    let types = {
        Фото:["image/jpeg", "image/png", "image/jpg"],
        Файлы: [],
    }
    return types[type];
}