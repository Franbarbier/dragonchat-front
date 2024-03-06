
export const globalName = (message:string[]) => {

    const variations = [
        /\[name\]/gi,
        /\[NAME\]/gi,
        /\(name\)/gi,
        /\(NAME\)/gi,
        /\{name\}/gi,
        /\{NAME\}/gi,
        /\[nombre\]/gi,
        /\[NOMBRE\]/gi,
        /\(nombre\)/gi,
        /\(NOMBRE\)/gi,
        /\{nombre\}/gi,
        /\{NOMBRE\}/gi,
        /\[user\]/gi,
        /\(user\)/gi,
        /\{user\}/gi,
        /\[usuario\]/gi,
        /\(usuario\)/gi,
        /\{usuario\}/gi,
        // Add more variations here if needed
      ];
    
      // Loop through each message in the array
  const normalizedMessages = message.map(m => {
    // Replace each variation with '[name]' in the current message
    variations.forEach(variation => {
      m = m.replace(variation, '[name]');
    });
    return m;
  });

  return normalizedMessages;

}
  