  (function VarLetAndConst(){
    'use strict';
  
    /**
     * A variable declared with var is added to the scope of the containing function, not of the nearest block like other languages
     */
    describe('var', function() {

      /**
       * The compiler 'hoists' any var declarations (not assignments) to the top of the function. 
       * The following code will not throw an error.
       */
      it('hoists variable declarations', function() {
        // Arrange
        var test = function(){
          if(false){
            var x = 3;
          }
          return x; // References x outside of the block it was declared
        };

        // Act
        var result = test();

        // Assert result is undefined as opposed to a reference error, since it was hoisted but never assigned
        expect(result).toBeUndefined();
      });

      /**
       * The value assigned within the if statement is avaiable to the entire function
       */
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

        // Assert the value assigned to x within the 'if' is available outside of the 'if' block, further demonstrating hoisting
        expect(result).toBe(3);
      });

      /**
       * vars declared in a for loop are added to function scope
       */
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

    /**
     * let provides block scoping in ES2015
     */
    describe('let', function() {

      /**
       * Variables declared with let are added to the scope of the containing block { }.
       * The following code will throw an error since x is referenced outside of its declaration block 
       */
      it('provides block scoping', function() {
        // Arrange
        let test = function(){
          if(true){
            let x = 3;
          }
          return x;
        };

        // Act & Assert x is only available to the if statement. A reference error is thrown since we tried to access it from outside
        expect(test).toThrow();
      });

      /**
       * lets declared in the for loop initialization are added to the scope of the loop
       */
      it('uses block scoping in for loops', function() {
        // Arrange
        let test = function(){
          for(let x = 0; x < 5; x++) {
          }

          return x;
        };

        // Act & Assert x is only available to the if statement
        expect(test).toThrow();
      });
    });

    /**
     * Variables declared with const are immutable 
     */
    describe('const', function(){

      /**
       * An exception is thrown if the variabled is re-assigned
       */
      it('throws a syntax error on re-assignment', function(){
        // Arrange
        const x = 'test';

        let reassign = function (){
          x = 'test2';
        };

        // Act & Assert re-assignment throws an exception
        expect(reassign).toThrow();
      });

      /**
       * However, a const can still be shadowed via duplicate declaration in a nested scope
       */
      it('can still be shadowed', function(){
        // Arrange
        let test = function(){
          const x = 'test';

          if(true){
            const x = 'test2';
          }

          return x;
        };

        // Act
        let result = test();

        // Assert
        expect(result).toBe('test');
      });
    });
  }());