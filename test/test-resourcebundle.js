/*global JSORM */
function testResourceBundle(Y) {
	var B = JSORM.ResourceBundle;
	// set paths
	B.path = 'core/';

	return new Y.Test.Case({
		name: "ResourceBundle tests",
		_should: { 
			ignore: { 
				testRetrieveEnUs: false,
				testRetrieveFrFr: false,
				testBadLocale: false,
				testEmptyLocale: false,
				testNullLocale: false,
				testInvalidBundle: false,
				testKeys: false
			} 
		},
		/*
		 * Functions to test currency functionality.
		 * These are the tests we want to perform:
		 * 1) basename returns the appropriate list
		 * 2) retrieve a bundle successfully
		 * 3) error for an invalid bundle
		 * 4) Unknown locale but valid bundle falls back appropriately
		 * 5) Retrieve a key from a bundle
		 * 6) Retrieve the same key from a bundle in two different locales gives two different results
		 */
		testRetrieveEnUs : function() {
			var test = this;
			var cb = function(success,bundle,options) {
				test.resume(function(){
					Y.Assert.isNotNull(bundle,"MyBundle en_US retrieval");
				});
			};
			B.getBundle({name:'MyBundle',locale:'en_US',callback:cb});
			this.wait(3000);
		},
		testRetrieveFrFr : function() {
			var test = this;
			var cb = function(success,bundle,options) {
				test.resume(function(){
					Y.Assert.isNotNull(bundle,"MyBundle fr_FR retrieval");					
				});
			};
			B.getBundle({name:'MyBundle',locale:'fr_FR',callback:cb});
			this.wait(3000);
		},
		testBadLocale : function() {
			var test = this;
			var cb = function(success,bundle,options) {
				test.resume(function(){
					Y.Assert.isNotNull(bundle,"MyBundle FOO locale bad should revert to default en_US");					
					Y.Assert.areEqual(B.defaultLocale,bundle.locale,"MyBundle FOO locale bad should revert to en_US");
				});
			};
			B.getBundle({name:'MyBundle',locale:'FOO',callback:cb});
			this.wait(3000);
		},
		testEmptyLocale : function() {
			var test = this;
			var cb = function(success,bundle,options) {
				test.resume(function(){
					Y.Assert.isNotNull(bundle,"MyBundle <blank> locale bad should revert to default en_US");					
					Y.Assert.areEqual(B.defaultLocale,bundle.locale,"MyBundle <blank> locale bad should revert to en_US");
				});
			};
			B.getBundle({name:'MyBundle',locale:'',callback:cb});
			this.wait(3000);
		},
		testNullLocale : function() {
			var test = this;
			var cb = function(success,bundle,options) {
				test.resume(function(){
					Y.Assert.isNotNull(bundle,"MyBundle null locale bad should revert to default en_US");					
					Y.Assert.areEqual(B.defaultLocale,bundle.locale,"MyBundle null locale bad should revert to en_US");
				});
			};
			B.getBundle({name:'MyBundle',locale:null,callback:cb});
			this.wait(3000);
		},
		testInvalidBundle : function() {
			var test = this;
			var cb = function(success,bundle,options) {
				test.resume(function(){
					Y.Assert.isNull(bundle,"MyBundle2 bad bundlename should remain null");					
				});
			};
			B.getBundle({name:'MyBundle2',locale:'en_US',callback:cb});
			this.wait(3000);
		},
		testKeys : function() {
			var test = this, bundles = {}, count = 0;
			var cb = function(success,bundle,options) {
				count++;
				bundles[options.name] = bundle;
				if (count == 2) {
					test.resume(function(){
						var enUsKey = bundles.en_US.get("hello");
						var frFrKey = bundles.fr_FR.get("hello");

						Y.Assert.isNotNull(enUsKey,"Should be hello");
						Y.Assert.isNotNull(frFrKey,"Should be bonjour");
						Y.Assert.areEqual("hello",enUsKey,"Should be hello");
						Y.Assert.areEqual("bonjour",frFrKey,"Should be bonjour");
					});					
				}
			};
			B.getBundle({name:'MyBundle',locale:'en_US',callback:cb,options: {name: 'en_US'}});
			B.getBundle({name:'MyBundle',locale:'fr_FR',callback:cb,options: {name: 'fr_FR'}});
			this.wait(3000);
		}
		
	});
}
