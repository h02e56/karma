
function compose(a,b){
    return function(c){
        return a(b(c));
    }
}
function sumaa(number){
    return number  + 1;
}
function double(number){
    return number * 2;
}




