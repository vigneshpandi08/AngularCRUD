using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace angularCRUD.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Get_AllEmployee()
        {
            using (EmployeeAppEntities Obj = new EmployeeAppEntities())
            {
                List<Employee> Emp = Obj.Employees.ToList();
                return Json(Emp, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string Insert_Employee(Employee Employe)
        {
            if (Employe != null)
            {
                using (EmployeeAppEntities Obj = new EmployeeAppEntities())
                {
                    Obj.Employees.Add(Employe);
                    Obj.SaveChanges();
                    return "Employee Added Successfully";
                }
            }
            else
            {
                return "Employee Not Inserted! Try Again";
            }
        }
        [HttpPost]
        public string Delete_Employee(Employee Emp)
        {
            if (Emp != null)
            {
                using (EmployeeAppEntities Obj = new EmployeeAppEntities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    if (Emp_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.Employees.Attach(Emp);
                        Obj.Employees.Remove(Emp);
                    }
                    Obj.SaveChanges();
                    return "Employee Deleted Successfully";
                }
            }
            else
            {
                return "Employee Not Deleted! Try Again";
            }
        }
        [HttpPost]
        public string Update_Employee(Employee Emp)
        {
            if (Emp != null)
            {
                using (EmployeeAppEntities Obj = new EmployeeAppEntities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    Employee EmpObj = Obj.Employees.Where(x => x.EmployeeId == Emp.EmployeeId).FirstOrDefault();
                    EmpObj.EmployeeName = Emp.EmployeeName;
                    EmpObj.DOB = Emp.DOB;
                    EmpObj.EmailId = Emp.EmailId;
                    EmpObj.MobileNo = Emp.MobileNo;
                    EmpObj.Salary = Emp.Salary;
                    Obj.SaveChanges();
                    return "Employee Updated Successfully";
                }
            }
            else
            {
                return "Employee Not Updated! Try Again";
            }
        }
    }
}