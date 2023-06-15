export default function dataURLtoFile(dataurl = "", filename) {
  if (dataurl === "") {
    return;
  }
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const isBase64 = (str) => {
  let keySearch = "base64,";
  let base64Pattern = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  if(!str.includes(keySearch)){
   return false;
  }
  let start = str.indexOf(keySearch)+keySearch.length;
  let token = str.slice(start,str.length);
  return base64Pattern.test(token)
}

