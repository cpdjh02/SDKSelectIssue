sap.designstudio.sdk.Component.subclass("com.test.issue.Select", function() {

	var _parentId=null;
	this.props = {
			selectedKey:"",
			selectedText:""
	};

	/*
	 * Create the  getter/setter of the props object and attach to 'this'.
	 */
	for(var property in this.props){
		this[property] = function(property){
			return function(value){
				try{
					if(value===undefined){
						return this.props[property];
					}else{
						this.props[property] = value;
						return this;
					}
				}catch(e){
					alert(e);
				}
			};
		}(property);
	}

	this.init = function() {
		_parentId=this.$().attr("id");
	};

	//This firePropertiesChanged call will trigger a call to the afterUpdate method with
	//will cause the select box to be removed and regenerated, so it will loose its selected value.
	//So here we set a boolean to tell this function not to remove and redraw the select.
	var firePropertiesChangedCalled=false;
	this.afterUpdate = function() {
		if(firePropertiesChangedCalled){
			firePropertiesChangedCalled=false;
			return;
		}
		var select=$("<select/>");
		select.attr("id",_parentId+"_select");
		for(var i=0;i<5;i++){
			var option = $("<option value=\""+i+"\">Option "+i+"</option>");
			select.append(option);
		}
		var that = this;
		select.change(function(event){
			that.selectedKey($(this).val());
			that.selectedText("Option "+$(this).val());
			//Sets this value to prevent over writing the select box.
			firePropertiesChangedCalled=true;
			that.firePropertiesChanged(["selectedKey","selectedText" ]);
			that.fireEvent("onSelect");
		});
		this.$().html("");
		this.$().append(select);
		console.log( jQuery.fn.jquery );
	}; 
})