'use strict'
var expect = require("chai").expect;
var Randomizer = require('./randomizer')
describe("Randomizer constructor",function (){
  describe("Prototype methods",function (){
    it("should say hello",function (){
      var randomizer = new Randomizer();
      expect(randomizer.sayHello()).to.equal('hello')  
    })
  })
        
  describe("Randomizer#Roll on cities",function (){
    it("should return a few random objects",function (){
      var cities = ['SF','NY','LA'];
      var rCities = new Randomizer(cities);
      expect(rCities.roll()).to.have.length.above(1);
    })
    it('should return a few random countries',function (){
      var countries = ['United States','France','Singapore','Australia','Canada','Ireland','Great Britain','Sweden','Norway','Denmark'];
      var rCountries = new Randomizer(countries);
      expect(rCountries.roll()).to.have.length.above(4);
    })
    it('should return a few random first names',function (){
      var names = ["Ronna  ","Buddy  ","Conrad  ","Deangelo  ","Sheila  ","Ha  ","Reatha  ","Virginia  ","Luz  ","Kendrick  ","Angela  ","Fairy  ","Lindy  ","Pamella  ","Avril  ","Elwanda  ","Kimberly  ","Launa  ","Broderick  ","Linh  ","Yevette  ","Gilberte  ","Lauralee  ","Jamison  ","Mana  ","Yasmine  ","Drucilla  ","Josefa  ","Elisha  ","Jennifer  ","Ricki  ","Diann  ","Cheyenne  ","Bradley  ","Hiedi  ","Laurene  ","Meghan  ","Rigoberto  ","Jared  ","Chia  ","Leona  ","Rafael  ","Lenora  ","Belkis  ","Tran  ","Jamie  ","Angelo  ","Evie  ","Emil  ","Hermila  "]
      var randomizer = new Randomizer(names);
      expect(randomizer.roll()).to.have.length.above(1);
    })
  })

  describe('Random time set interval',function (){
    it('should not stop',function (){
      function doSomething() {
        console.log("doSomething() just got called")
      }

      (function loop() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 500;
          setTimeout(function() {
                  doSomething();
                  loop();  
          }, rand);
      }());
    })
  })


})