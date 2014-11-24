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

	this.afterUpdate = function() {
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
			//Commenting out this firePropertiesChanged line will keep the option selected 
			that.firePropertiesChanged(["selectedKey","selectedText" ]);
			that.fireEvent("onSelect");
		});
		this.$().html("");
		this.$().append(select);
		this.$().append(btn);
	}; 
})