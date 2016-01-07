(function Generators(){
	'use strict';   

	/**
	 * The function* declaration (function keyword followed by an asterisk) 
	 * defines a generator function, which returns a Generator object.
	 */
	describe('generators', function(){
		it('can build an iterable', function(){
			// Arrange
			let numbers = function*(){
				yield 1;
				yield 2;
				yield 3;
			};		
			
			// Act
			let sum = 0;
			let iterator = numbers();
			let next = iterator.next();
			while(!next.done){
				sum += next.value;
				next = iterator.next();
			}

			// Assert
			expect(sum).toBe(6);	
		});

		it('can be used in loops', function(){
			// Arrange
			let numbers = function*(start, end){
				for(let i = start; i <= end; i++){
					yield(i);
				}
			};
			
			// Act
			let sum = 0;
			for(let n of numbers(1, 3)){
				sum += n;
			}
		
			// Assert
			expect(sum).toBe(6);
		});
	});
}());