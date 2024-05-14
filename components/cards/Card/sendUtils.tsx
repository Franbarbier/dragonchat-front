
export const globalName = (message:string[]) => {

  const variations = [
      /\[name\]/gi,
      /\[Name\]/gi,
      /\[NAME\]/gi,
      /\(name\)/gi,
      /\(Name\)/gi,
      /\(NAME\)/gi,
      /\{name\}/gi,
      /\{Name\}/gi,
      /\{NAME\}/gi,
      /\[nombre\]/gi,
      /\[Nombre\]/gi,
      /\[NOMBRE\]/gi,
      /\(nombre\)/gi,
      /\(Nombre\)/gi,
      /\(NOMBRE\)/gi,
      /\{nombre\}/gi,
      /\{Nombre\}/gi,
      /\{NOMBRE\}/gi,
      /\[user\]/gi,
      /\(user\)/gi,
      /\{user\}/gi,
      /\[usuario\]/gi,
      /\(usuario\)/gi,
      /\{usuario\}/gi,
    ];
  
const normalizedMessages = message.map(m => {
  variations.forEach(variation => {
    m = m.replace(variation, '[name]');
  });
  return m;
});

return normalizedMessages;

}


export const validationCode = (numero:string) => {

let validatedNum = numero
let caracteristca = validatedNum.slice(0, 2)
let rest = validatedNum.slice(2)

// if starts with 54
if (validatedNum.startsWith("54")) {
  if (rest.charAt(0) != "9") {
      validatedNum = caracteristca + "9" + rest
  }else{
     if (validatedNum.length < 13) {
      validatedNum = caracteristca + "9" + rest
     }
  }
}
// 52
else if (validatedNum.startsWith("52")) {
  if (rest.charAt(0) != "1") {
    validatedNum = caracteristca + "1" + rest
  }else{
    if (validatedNum.length < 13) {
      validatedNum = caracteristca + "1" + rest
    }
  }

}
// 56
else if (validatedNum.startsWith("56")) {
  // console log first character of "Rest"
  if (rest.charAt(0) != "9") {
    validatedNum = caracteristca + "9" + rest
}else{
   if (validatedNum.length < 11) {
    validatedNum = caracteristca + "9" + rest
   }
}

}


return validatedNum
}