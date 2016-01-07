(function ArrowFunctions(){
	'use strict';

	describe('arrow functions', function(){
		it('should use the => syntax', function(){
			// Arrange
			let add = (x,y) => x + y;		
		
			// Act
			let result = add(4, 5);
		
			// Assert
			expect(result).toBe(9);	
		});

		it('should support multiple lines', function(){
			// Arrange
			let filter = function (array, predicate){
				let items = [];
				array.forEach(x => {
					if(predicate(x)){
						items.push(x);
					}
				});
				return items;
			};		
		
			// Act
			let evens = filter([1,2,3,4,5,6], x => x % 2 === 0);
		
			// Assert
			expect(evens.length).toBe(3);	
		});

		it('lexically binds to "this"', function(testIsDone){
			// Arrange
			this.field = "test";
		
			// Act & Assert
			// var self = this; not needed
			setTimeout(() => {
				expect(this.field).toBe("test");
				testIsDone();
			}, 10);
		});
	});
}());