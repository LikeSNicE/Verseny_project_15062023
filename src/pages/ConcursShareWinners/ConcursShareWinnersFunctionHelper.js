export default function convertTableWinners(json_winners=[],usersOption=[],setValue){
    let arrayConvert = [];
    for(let i = 0; i < json_winners.length; i++){
        arrayConvert.push([...json_winners[i],{SelectUsers:{
            option:usersOption,
            setValue:setValue,
            index:i
        }}]);
    }
    return arrayConvert;
}

export const getConvertTableWinners = (json_winners=[],users_id=[],users=[]) =>{
    let arrayConvert = [];
    for(let i = 0; i < json_winners.length; i++){
        let user = users.filter(item => Number(item.id) === Number(users_id[i]))[0]
        arrayConvert.push([...json_winners[i],{Avatar:
          {
            photo:user.avatar,
            name:user.name,
            email:user.email,
            alt:user.name
          }
        }]);
    }
    return arrayConvert;
}

