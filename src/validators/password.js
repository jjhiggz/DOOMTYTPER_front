export function hasNumber(value){
  return( /\d/.test(value) ) ? true : false
}
export function hasLowercaseLetter(value){
  return(/[a-z]/.test(value)) ? true : false
}
export function hasUppercaseLetter(value){
  return(/[A-Z]/.test(value)) ? true : false
}

// export function hasSpecialCharacter(value){
//     return (/[\^\$*.[\]{}()!@#$%&\/\\,<>':;|_~`]/.test(value) ? true : false) // regex taken from stack overflow
// }
