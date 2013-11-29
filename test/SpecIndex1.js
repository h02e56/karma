/**
 * Created by josep on 13/11/13.
 */

describe("test", function(){
	it("las propiedades son fijas de cada instancia, no modiifca otras inst", function(){
		e2.health = 5;
		expect(e1.health).toBe(20);
	});

	it("modificamos el metodo de una instancia y no afacta las otras inst", function(){
		e2.attack = function(){
			return "defense";
		};
		expect(e1.attack()).toBe("attack");
	});

	e1.setPosition(10,20);
	it("overraidion arrays or object just a fect selected intance", function(){
		expect(e2.position["x"]).toEqual(0);
		expect(e2.position["y"]).toEqual(0);
	});

	it("expects added method kill to exist on instaNCES", function(){
		expect(typeof e2.kill).toBe("function");
	})

	it("mofy new method applys all inst", function(){
		enemy.kill="fucm";
		expect(e1.kill).toBe("fucm");
	});
});


describe("prototype", function(){
	obj.method = "quack";

	it("object.create(null) create obj without prototype", function(){
		expect(Object.getPrototypeOf(obj)).toBe(null);
	});
	it("we can not use hasownproperty with an object without prototype", function(){
		expect(obj.hasOwnProperty).toBe(undefined);
	});
	it("we can fake hasownproperty", function(){
		expect(Object.prototype.hasOwnProperty.call(obj, "method")).toBe(true);
	});

	it("fn gets obj with method quack but not from proto", function(){
		var obj1 = {},
			obj2 = {quack:function(){}},
			obj3 = {quack:"a"};

		expect(duckCount(obj1, obj2, obj3)).toBe(2);
	});
});


var vehicle = {
	name: "car",
	getName: function(){
		return this.name;
	},
	setName: function setName(cadena) {
		this.name = cadena + this.name
		return this;
	},
	properties : {
		wheels:4,
		random: "random"
	}
}

car = Object.create(vehicle);
truck = Object.create(vehicle);

describe("create 2 oject with same prototype", function(){

	beforeEach(function(){
		car.name = "mercedes";
		car.properties = {tema:"s"}
		car.getName = function(){return "changed"};
		var value = car.getWhels = function(){
			return this.properties.wheels;
		}
	});
	afterEach(function(){
		car = Object.create(vehicle);
		truck = Object.create(vehicle);
	})

	it("not ===", function(){
		expect(car === truck).toBe(false);
	});

	it("change property affect just choosen obj", function() {
		
		expect(car.name === truck.name).toBe(false);
		expect(vehicle.name).toBe("car");
		expect(truck.name).toBe("car");
	});
	it("if we change indide object affect both instances", function() {
		
		expect(car.properties === truck.properties).toBe(false);
		console.log(truck, car)

	});
	it("if we change internal method just change in instance selected", function(){
		//car.name = "car"
		expect(car.getName() === truck.getName()).toBe(false);
		expect(truck.getName() === "car").toBe(true);
	})

	it("inserting new method in instance dont afect other ones", function(){
		expect(truck.getWhels).toBeUndefined();
	})
});


var master = function(){

	var width = function width(el){

	};
	return{

	}
}


describe("functional javasc", function(){
    it("combining functions", function(){
        var combinator = compose(sumaa, double);
        var test = combinator(8);
        expect(test).toEqual(17);
    })
})
