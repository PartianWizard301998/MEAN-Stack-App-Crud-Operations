import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  Employees :  any[] = [];
  currentEmpID = "";

  name : string = "";
  phone :  string = "";
  address : string = "";


  constructor(private http: HttpClient){
    this.getAllEmployees();
  }
  
  ngOnInit(): void {
   
  }


  //Methods:

  //This method will fetch all the records availabe in DB and show in UI.
  getAllEmployees() {
    this.http.get("http://localhost:9992/user/getAll").subscribe((resultData : any) => {

      console.log(resultData);
      this.Employees = resultData.data;

    });
  }

  //Method to register the Employee, the details will get store in MongoDB.
  registerEmployee(){
    let bodyData ={
      "name" : this.name,
      "phone" : this.phone,
      "address" : this.address,
    };
    this.http.post("http://localhost:9992/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        console.log("User Registered Successfully")

        //Clear the form after the User got registerd.
        this.name = '';
        this.phone = '';
        this.address = '';
        this.getAllEmployees();
    });
  }

  //Method to delete the particular employee from DB
    setDelete(data: any) {
      this.http.delete("http://localhost:9992/user/delete"+ "/"+data._id).subscribe((resultData) => {

        console.log(resultData);
        console.log("Employee Deleted Successfully.");
        this.getAllEmployees();
        
      });
      }



    //Once we click on edit buton , Method will set the data from db to the Input Fields.
    setUpdate(data: any) {
      
      this.name = data.name;
      this.phone = data.phone;
      this.address = data.address;
      this.currentEmpID = data._id

      console.log(this.currentEmpID)
    }

    updateEmployee() {

      let bodyData = {
        "name" : this.name,
        "phone" : this.phone,
        "address" : this.address,
      };

      this.http.patch("http://localhost:9992/user/update"+ "/"+this.currentEmpID, bodyData).subscribe((resultData:any) => {
        console.log(resultData);
        console.log("User updated Successfully")
         //Clear the form after the User got registerd.
         this.name = '';
         this.phone = '';
         this.address = '';
         this.getAllEmployees();
      });
    
    }

    /* This method will decide which fuction needs to call when the user will click on submit either its a update Employee record or 
    register New Employee */
    save(){
      if(this.currentEmpID == ''){
        this.registerEmployee();
      }else{
        this.updateEmployee();
      }
    }
   


}
