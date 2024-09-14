/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
    str = str.toLowerCase();
    str = str.split(" ").join(" ");
    let j = str.length - 1, i = 0;
    while (i < j) {
        while (str[i] <= 'a' || str[i] >= 'z') {
            i++; 
    }
        while (str[j] <= 'a' || str[j] >= 'z') {
            j--;
        }
        if (str[i] != str[j]) return false;
        i++; j--;
    }
  return true;
}

module.exports = isPalindrome;
