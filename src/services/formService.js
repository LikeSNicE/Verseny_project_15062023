import dataURLtoFile, { isBase64 } from "./fileService";


export default function appendForm(formData,data){
    for (const prop in data) {
        switch(typeof data[prop]){
            case "object":
                Object.values(data[prop]).forEach(
                    (value,index) => formData.append(`${index}`,value)
                );
            break;
            case "string":
                if(isBase64(data[prop])){
                    formData.append(prop,dataURLtoFile(data[prop],`${prop}.png`));
                }else{
                    formData.append(prop,data[prop]);
                }
            break;
            case "number":
                formData.append(prop,data[prop]);
            break;
            default:
                
        }
    }
}