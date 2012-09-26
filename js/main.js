var App = Em.Application.create({});

App.ApplicationView  = Ember.View.extend({
	templateName: 'application-view'
});
App.TextItem = Ember.Object.extend({
    value: "defaultItemName"
});
App.TextItemController = Ember.ArrayProxy.extend({
});

App.TypesView =  Ember.View.extend({
	templateName: 'type-view',
	tagName:'div',
	content: App.TextItemController.create({
		content: []
	}),
	init: function(){
		this.set('content',App.TextItemController.create({content: []}));
		return this._super();
	},
	addType: function(e,view){
		var theType = this;
		_gaq.push(['_trackEvent', 'AddType', 'Clicked: ' +  this.label]);
		var modal = App.ModalView.create({modify: this});
	},
	removeType: function(e){
		this.get('content').removeObject(e.context);
		_gaq.push(['_trackEvent', 'RemoveType', 'Clicked']);
	}
});
App.ModalView =  Ember.View.extend({
	templateName: 'modal-view',
	tagName:'div',
	classNames: 'modal hide fade',
	modify: undefined,
	init: function(){
		var theType=this.get('modify');
		var This = this;
		this.append();
		setTimeout(function(){
			$('.modal').modal('show');
			$('.modal').on('shown', function(){
				$('#theAdd').focus();
			});
			$('.modal').on('hidden', function(){
				$('.modal').remove();
				This.destroy();
			});
			$('.btn-primary,form').on('click submit', function(e){
				e.preventDefault();
				_gaq.push(['_trackEvent', 'AddType', 'Saved: ' + theType.get('label')]);
				theType.content.pushObject(App.TextItem.create({value:$('#theAdd').val()}));
				$('.modal').modal('hide');
			});
		},50);
	}
});
App.ApplicationController   = Ember.Controller.extend({});
var router = Ember.Router.create({
	root: Ember.Route.extend({
		index: Ember.Route.extend({
			route: '/',
			enter: function(router) {
			},
			connectOutlets: function (router, context) {
				router.get('applicationController').connectOutlet('application');
			}
		})
	})
});
App.initialize(router);