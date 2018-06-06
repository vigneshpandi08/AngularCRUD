var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {  
            $scope.Employe = {};
            $scope.Employe.EmployeeName = $scope.Name;
            $scope.Employe.EmailId = $scope.Email;
            $scope.Employe.MobileNo = $scope.Mobile;
            $scope.Employe.Salary = $scope.Sal;
            $http({
                method: "post",
                url: "/Employee/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Name = "";
                $scope.Email = "";
                $scope.Mobile = "";
                $scope.Sal = "";
            })
        } 
        else {
            $scope.Employe = {};
            $scope.Employe.EmployeeName = $scope.Name;
            $scope.Employe.EmailId = $scope.Email;
            $scope.Employe.MobileNo = $scope.Mobile;
            $scope.Employe.Salary = $scope.Sal;
            $scope.Employe.EmployeeId = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "/Employee/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Name = "";
                $scope.Email = "";
                $scope.Mobile = "";
                $scope.Sal = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "/Employee/Get_AllEmployee"
        }).then(function (response) {
            $scope.employees = response.data;
        }, function () {
            alert("Error Occur");
        })
    };

   
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "/Employee/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Emp) {
        debugger;
        document.getElementById("EmpID_").value = Emp.EmployeeId;
        $scope.Name = Emp.EmployeeName;
        $scope.Email = Emp.EmailId;
        $scope.Mobile = Emp.MobileNo;
        $scope.Sal = Emp.Salary;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "CornFlowerblue";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    }
})