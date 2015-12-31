(function Destructuring(){
	'use strict';

	/**
	 * The destructuring assignment syntax is a JavaScript expression that makes it possible to extract 
	 * data from arrays or objects using a syntax that mirrors the construction of array and object literals.
	 */
	describe('destructuring', function(){

		it('can destructure arrays', function () {
			// Arrange
			let list = [1,2,3];

			// Act
			// without destructuring
			var a = list[0];
			var b = list[2];

			// with destructuring 
			var [a, , b] = list;

			// Assert
			expect(a).toBe(1);
			expect(b).toBe(3);
		})

		it('can destructure objects', function(){
			// Arrange
			let person = {
				firstName: 'Danny',
				lastName: 'Dean',
				address: {
					state: 'MO'
				}
			};

			// Act
			// without destructuring
			var first = person.firstName;
			var abbreviation = person.address.state;

			// with destructuring
			var { firstName: first, address: { state: abbreviation } } = person;

			// Assert
			expect(first).toBe(person.firstName);
			expect(abbreviation).toBe(person.address.state);
		});

		it('can be used in parameters', function(){
			// Arrange
			const response = "server data";
			let httpGet = function(url, {dataType, timeout}){
				if(dataType !== undefined){
					return response;
				}
			};

			// Act
			let result = httpGet('test', {
				dataType: 'json',
				timeout: 5000
			});

			// Assert
			expect(result).toBe(response);
		});

		it('can be used in parameters with default values', function(){
			// Arrange
			function httpGetES5(url, options) {
			  options = options === undefined ? {} : options;
			  var dataType = options.dataType === undefined ? 'json' : options.dataType;
			  var timeout = options.timeout === undefined ? 5000 : options.timeout;
			  return timeout;
			}			

			function httpGetES6(url, {
				dataType: dataType = 'json', 
				timeout: timeout = 6000} = {}) {
				return timeout;
			}

			// Act
			var es5Result = httpGetES5('es5test', {
			  dataType: 'xml'
			});

			let es6Result = httpGetES6('es6test', {
			  dataType: 'jsonp'
			});

			let es6Result2 = httpGetES6('es6test2');

			// Assert
			expect(es5Result).toBe(5000);
			expect(es6Result).toBe(6000);
			expect(es6Result2).toBe(6000);
		});

		it('can be used in a "for of" loop', function(){
			// Arrange
			var quotes = [
				{
					lastPrice: 5.02,
					ratings: {
						morningstar: 5

					}
				},
				{
					lastPrice: 6.40,
					ratings: {
						morningstar: 4
					}
				}
			];

			// Act
			let total = 0;
			for(let { lastPrice: last, ratings: { morningstar: rating }} of quotes){
				total += last;
			}

			// Assert
			expect(total).toBe(11.42);
		});

		it('can be used to let functions return multiple values', function(){
			// Arrange
			function f(){
				return [1, 2];
			}
		
			// Act
			var [a, b] = f();
		
			// Assert
			expect(a).toBe(1);
			expect(b).toBe(2);	
		});
	});
}());	