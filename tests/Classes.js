(function Classes() {
	'use strict';

	describe('classes', function() {
		it('should be supported in ES6', function() {
			// Arrange
			// ES5
			let ES5Paper = function(){};
			ES5Paper.prototype.getArea = function(length, width) {
				return length * width;
			};

			// ES6
			class Paper {
				getArea(length, width) {
					return length * width;
				}
			}
			
			// Act
			let es5Paper = new ES5Paper();
			let es5Result = es5Paper.getArea(8.5, 11);

			let es6Paper = new Paper();
			let es6Result = es6Paper.getArea(11, 14);
		
			// Assert
			expect(es5Result).toBe(93.5);	
			expect(es6Result).toBe(154);
			expect(Paper.prototype.getArea.call(es6Paper, 11, 14)).toBe(154);	
		});

		it('can have a constructor', function() {
			// Arrange
			class Paper {
				constructor(length, width){
					this._length = length;
					this._width = width;
				}

				getArea(){
					return this._length * this._width;
				}
			}
		
			// Act
			let paper = new Paper(8.5, 11);
			let area = paper.getArea();
		
			// Assert
			expect(area).toBe(93.5);	
		});

		it('can have getters and setters', function(){
			// Arrange
			class Paper {
				constructor(length, width){
					this._length = length;
					this.width = width;
				}

				get area(){
					return this._length * this._width;
				}

				get width() {
					return this._width;
				}

				set width(width) {
					if(width <= 0){
						throw "Width must be greater than 0";
					}

					this._width = width;
				}
			}
		
			// Act
			let paper = new Paper(4, 8);
			let area = paper.area;

			// Assert
			expect(area).toBe(32);
			expect(function(){ paper.width = -1; }).toThrow();
			expect(function(){ paper.area = 100; }).toThrow();
		});

		it('should support inheritance', function(){
			// Arrange
			class Paper {
				constructor(length, width){
					this._length = length;
					this._width = width;
				}

				get area(){
					return this._length * this._width;
				}				
			}

			class ConstructionPaper extends Paper {
				constructor(length, width, color){
					super(length, width);
					this._color = color;
				}

				get color(){
					return this._color.toUpperCase();
				}
			}	
		
			// Act
			let constructionPaper = new ConstructionPaper(8.5, 11, "red");
		
			// Assert
			expect(constructionPaper.area).toBe(93.5);
			expect(constructionPaper.color).toBe("RED");	
		});

		it('should support overrides', function(){
			// Arrange
			class Paper {
				constructor(length, width){
					this._length = length;
					this._width = width;
				}

				get area(){
					return this._length * this._width;
				}

				toString() {
					return `The paper is ${this._width} by ${this._length}`;
				}				
			}

			class ConstructionPaper extends Paper {
				constructor(length, width, color){
					super(length, width);
					this._color = color;
				}

				get color(){
					return this._color.toUpperCase();
				}

				toString(){
					return `${super.toString()} and is ${this.color}`;
				}
			}	
		
			// Act
			let constructionPaper = new ConstructionPaper(4, 4, 'blue');
		
			// Assert
			expect(constructionPaper.toString()).toBe("The paper is 4 by 4 and is BLUE");
		});

		it('should support static methods', function(){
			// Arrange
			class Paper {
				constructor(length, width){
					this._length = length;
					this._width = width;
				}

				static get uses(){
					return ['writing', 'printing', 'art', 'cleaning'];
				}		
			}
		
			// Act
			var uses = Paper.uses;
		
			// Assert
			expect(uses.length).toBe(4);
		});
	});
}());