angular.module('app',[])
  .controller('bfs2',function($scope){

     $scope.text = "#include <bits/stdc++.h>\nusing namespace std;\nvector< vector<int> > V;\n\nint main(){\nV.assign(nodos+10,vector<int>());\nV[1].push_back(2);\nV[2].push_back(3);\nV[3].push_back(1);\nreturn 0;\n}";
     $scope.eval = true;
     var intent = "";
     var answer = "";
     $scope.calificacion = "";
     $scope.modalview = false;
     var ans = "#include <bits/stdc++.h>\nusing namespace std;\nvector< vector<int> > V;\n\nint main(){\nV.assign(nodos+10,vector<int>());\nV[1].push_back(2);\nV[2].push_back(3);\nV[3].push_back(1);\nfor(int i = 0; i < nodos;i++)\nfor(int j = 0;j < V[i].size();j++)\ncout << i << j <<endl;\nreturn 0;\n}";

     $scope.validate = function(){

       intent = $scope.text.replace(/\n| /g,"");
       answer = ans.replace(/\n| /g,"");

       if(intent == answer){
         $scope.calificacion = "Accepted";
         $scope.modalview = true;
         $('#modal1').openModal();

       }else {
         $scope.calificacion = "Hay algo mal";
       }

       Materialize.toast($scope.calificacion, 4000,'rounded');
     };

  });
