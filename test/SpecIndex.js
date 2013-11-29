/**
 * Created by josep on 13/11/13.
 */

describe("functional javasc", function(){
    it("combining functions", function(){
        var combinator = compose(sumaa, double);
        var test = combinator(8);
        expect(test).toEqual(17);
    })
    it("test IE", function(){
        var a =[1,2,3];
        var total=0;
        a.forEach(function(el){
            return total++;
        });
        expect(total).toEqual(3);
    })
})
