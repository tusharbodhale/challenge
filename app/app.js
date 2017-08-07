var app=angular.module("app",[]);

app.component("mySearch",{
    template:`
    <div class="col-md-4 col-sm-12 col-md-offset-4">
    <div class="form-group">
        <input type="search" class="form-control" placeholder="search" ng-model="$ctrl.searchInput"/>
    </div>
    <div class="form-group">
    <button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.search();">Search</button>
    </div>
    </div>
    <my-search-list query="$ctrl.searchQuery" ></my-search-list>
    `,
    bindings:{},
    controller:function(){
        this.searchInput ="";
        this.search=function(){
            this.searchQuery=this.searchInput;
        }
    }
});

app.component("mySearchList",{
    template:`
    <div class="col-md-4 col-sm-12 col-md-offset-4">    
    <p ng-if="$ctrl.userList.total_count>0">{{$ctrl.userList.total_count}} Users found for "{{$ctrl.query}}"</p>
    <ul class="list-group">
        <li ng-repeat="user in $ctrl.userList.items" class="list-group-item">
            {{$index+1}}. {{user.name}}
        </li>
    </ul>
    </div>
    `,
    bindings:{
        query:"<"
    },
    controller:function($http){
        var self=this;
        self.query="";
        this.getUsers=function(){
            
            $http({
                method: 'GET',
                url: 'https://api.github.com/search/repositories',
                params: {q: self.query}
              }).then(function successCallback(response) {
                    self.userList=response.data;
                }, function errorCallback(response) {                  
                  self.userList="";
                });
        }
        this.$onChanges=function(changesObj){
            if(changesObj.query.currentValue !=undefined && changesObj.query.currentValue.length>=3)
                this.getUsers();
        }
        
    }
})