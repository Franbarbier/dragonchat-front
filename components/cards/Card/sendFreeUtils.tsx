const variations = [
    /\[name\]/gi,
    /\(name\)/gi,
    /\{name\}/gi,
    /\[nombre\]/gi,
    /\(nombre\)/gi,
    /\{nombre\}/gi,
    /\[user\]/gi,
    /\(user\)/gi,
    /\{user\}/gi,
    /\[usuario\]/gi,
    /\(usuario\)/gi,
    /\{usuario\}/gi,
    // Add more variations here if needed
  ];
function globalName(currentMessage) {
  variations.forEach(variation => {
    currentMessage = currentMessage.replace(variation, '[name]');
  });
  return currentMessage;
}
