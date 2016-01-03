(function FunctionParameters(){
	'use strict';

	/**
	 * Default function parameters allow formal parameters to be initialized 
	 * with default values if no value or undefined is passed.
	 */
	describe('default parameter values', function(){
		it('can be specified', function(){
			// Arrange
			function es5test(x, y, z){
				y = y === undefined ? 3 : y;
				z = z === undefined ? 2 : z;
				return x + y + z;
			}
			
			function es6test (x, y = 3, z = 2) {
				return x + y + z;
			}	
		
			// Act
			let es5Result = es5test(5);
			let es6Result = es6test(5);

			// Assert	
			expect(es5Result).toBe(10);
			expect(es6Result).toBe(10);
		});		
	});

	/**
	 * The rest parameter converts individual parameters into an array.
	 * No parameters can occur after a rest parameter.
	 */
	describe('rest parameters', function(){
		it('can be specified', function(){
			// Arrange
			function count(...items){
				return items.length;
			}
		
			// Act
			let numberOfFruits = count('banana', 'apple', 'blueberry');
		
			// Assert	
			expect(numberOfFruits).toBe(3);
		});
	});

	/**
	 * The spread operator allows an expression to be expanded in places where 
	 * multiple arguments (for function calls) or multiple elements (for array literals) are expected.
	 */
	describe('spread operators', function(){
		it('can be used instead of apply', function(){
			// Arrange
			function test(x, y, z){
				return x + y + z;
			}		
		
			// Act
			let args = [1, 2, 3];
			var es5Result = test.apply(null, args);
			var es6Result = test(...args);

			// Assert
			expect(es5Result).toBe(6);	
			expect(es6Result).toBe(6);	
		});
	});
}());