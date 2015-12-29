  var VarLetAndConst = (function(){
    'use strict';
  
    describe('var', function() {
      
      it('hoists variable declarations', function() {
        // Arrange
        var test = function(){
          // During compilation, var x; is inserted at the top of the function.
          if(false){
            var x = 3;
          }
          return x;
        };

        // Act
        var result = test();

        // Assert result is undefined as opposed to a reference error
        expect(result).toBeUndefined();
      });

      it('uses function scoping', function() {
        // Arrange
        var test = function(){
          if(true){
            var x = 3;
          }
          return x;
        };

        // Act
        var result = test();

        // Assert x is available outside of the 'if' block
        expect(result).toBe(3);
      });

      it('uses function scoping in for loops', function() {
        // Arrange
        var test = function(){
          for(var x = 0; x < 5; x++) {
          }
          return x;
        };

        // Act
        var result = test();

        // Assert x is available outside of the for loop
        expect(result).toBe(5);
      });
    });

    describe('let', function() {
      it('provides block scoping', function() {
        // Arrange
        var test = function(){
          if(true){
            let x = 3;
          }
          return x;
        };

        // Act & Assert x is only available to the if statement
        expect(test).toThrow();
      });

      it('uses block scoping in for loops', function() {
        // Arrange
        var test = function(){
          for(let x = 0; x < 5; x++) {
          }
          return x;
        };

        // Act & Assert x is only available to the if statement
        expect(test).toThrow();
      });
    });

    describe('const', function(){
      it('throws a syntax error on re-assignment', function(){
        // Arrange
        const x = 'test';

        var reassign = function (){
          x = 'test2';
        };

        // Act & Assert reassignment throws an exception
        expect(reassign).toThrow();
      });

      it('can still be shadowed', function(){
        // Arrange
        var test = function(){
          const x = 'test';

          if(true){
            const x = 'test2';
          }

          return x;
        };

        // Act
        var result = test();

        // Assert
        expect(result).toBe('test');
      });
    });
  }());