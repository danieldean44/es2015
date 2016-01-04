(function Promises(){
	/**
	 * The Promise object is used for deferred and asynchronous computations.
	 * A Promise represents an operation that hasn't completed yet, but is expected in the future.
	 */
	describe('promises', function(){
		it('should have a resolve function that passes data', function(testIsDone){
			// Arrange
			var promise = new Promise(function(resolve, reject){
				resolve(44);
			});
			
			// Act & Assert
			promise.then(function onResolve(data){
				expect(data).toBe(44);
				testIsDone();
			});
		});

		it('should have a static resolve', function(testIsDone){
			// Arrange
			var promise = Promise.resolve(44);	
		
			// Act & Assert
			promise.then(function(data){
				expect(data).toBe(44);
				testIsDone();
			});
		});

		it('should have a reject function', function(testIsDone){
			// Arrange
			var promise = new Promise(function(resolve, reject){
				reject("Erroar.");
			});
					
			// Act & Assert
			promise.then(function onResolve(){}, function onReject(data){
				expect(data).toBe("Erroar.");
				testIsDone();
			});
		});

		it('should have a catch function', function(testIsDone){
			// Arrange
			var promise = new Promise(function(resolve, reject){
				reject("Erroar.");
			});
					
			// Act & Assert
			promise.catch(function (data){
				expect(data).toBe("Erroar.");
				testIsDone();
			});
		});

		it('should be executed asynchronously', function(testIsDone){
			// Arrange
			var async = false;
			var promise = Promise.resolve();
		
			// Act & Assert
			promise.then(function(){ // Callback to then is added to the callstack 
				expect(async).toBe(true);
				testIsDone();
			});
			async = true;
		});

		it('should chain sequentially', function(testIsDone){
			// Arrange		
			var a = function(){ return Promise.resolve("a")};
			var b = function(prev) { return Promise.resolve(prev + "b"); };
			var c = function(prev) { return Promise.resolve(prev + "c"); };
		
			// Act & Assert
			a().then(function(prev){
				return b(prev);
			}).then(function(prev){
				return c(prev);
			}).then(function(letters){
				expect(letters).toBe("abc");
				testIsDone();
			});
		});

		it('should have a static all method', function(testIsDone){
			// Arrange
			var a = function(){ return Promise.resolve("a")};
			var b = function(prev) { return Promise.resolve(prev + "b"); };
			var c = function(prev) { return Promise.resolve(prev + "c"); };
		
			// Act & Assert
			var promises = [];
			promises.push(a());
			promises.push(b());
			promises.push(c());
		
			// Assert
			Promise.all(promises).then(function(values){
				expect(values.length).toBe(3); // Promises will not always be in order
				testIsDone();
			});
		});

		it('should have a static race method', function(testIsDone){
			// Arrange
			var a = function(){ return Promise.resolve("a")};
			var b = function(prev) { return Promise.resolve(prev + "b"); };
			var c = function(prev) { return Promise.resolve(prev + "c"); };
		
			// Act & Assert
			var promises = [];
			promises.push(a());
			promises.push(b());
			promises.push(c());
		
			// Assert
			Promise.race(promises).then(function(firstToResult){
				expect(firstToResult).not.toBe(undefined); 
				testIsDone();
			});
		});
	});
}());