import { MyContext } from "@/components/context";
import DashboardLayout from "@/components/dashboardLayout";
// import EmployeeCard from "@/components/employee/card";
import { Container, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { openMessage } from "@/components/functions/message";
import EmployeeCard from "@/components/employee/employeeCard";

const Employees = () => {
  const { user, messageApi } = useContext(MyContext);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminLevel, setAdminLevel] = useState(10);
  const [radio, setRadio] = useState("1");
  // console.log(employees);
  function onOptionChange(radio, data = null) {
    setRadio(radio);
    const emp = data ? data : employees;
    if (radio === "2") {
      setLoading(true);
      const d = emp.filter((emp) => {
        return emp.status === 1 && emp.post === "Digital Marketing & SEO";
      });

      setLoading(false);
      setFilteredEmployees(d);
    } else if (radio === "3") {
      setLoading(true);
      const d = emp.filter((emp) => {
        return emp.status === 1 && emp.post === "Content Writer";
      });
      setLoading(false);
      setFilteredEmployees(d);
    } else if (radio === "4") {
      setLoading(true);
      const d = emp.filter((emp) => emp.post === "Social Media Management");
      setLoading(false);
      setFilteredEmployees(d);
    } else if (radio === "5") {
      setLoading(true);
      const d = emp.filter((emp) => emp.status === 0);
      setLoading(false);
      setFilteredEmployees(d);
    } else {
      setLoading(false);
      setFilteredEmployees(emp);
    }
  }
  console.log(filteredEmployees);
  useEffect(() => {
    if (user && !employees) {
      setLoading(true);
      (async () => {
        const { data } = await axios.post("/api/employee/getAllEmployees", {
          adminLevel: user.adminLevel,
        });
        if (data.status === 200) {
          setEmployees(data.data);
          setFilteredEmployees(data.data);
          setAdminLevel(user.adminLevel && user.adminLevel);
          setLoading(false);
        } else {
          openMessage(messageApi, data.msg);
          setLoading(false);
        }
      })();
    }
  }, [employees, user]);
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Typography variant="h4">Employees</Typography>
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4, padding: 0 }}>
            <div
              class="alert alert-primary employee-filter"
              role="alert"
              style={{ marginBottom: "25px" }}
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="1"
                  checked={radio === "1"}
                  onChange={() => onOptionChange("1")}
                />
                <label class="form-check-label" for="inlineRadio1">
                  All
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="2"
                  checked={radio === "2"}
                  onChange={() => onOptionChange("2")}
                />
                <label class="form-check-label" for="inlineRadio2">
                  Digital Marketing & SEO
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="3"
                  checked={radio === "3"}
                  onChange={() => onOptionChange("3")}
                />
                <label class="form-check-label" for="inlineRadio3">
                  Content Writer
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  value="4"
                  checked={radio === "4"}
                  onChange={() => onOptionChange("4")}
                />
                <label class="form-check-label" for="inlineRadio4">
                  Social Media Management
                </label>
              </div>
              {adminLevel && adminLevel === 1 && (
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio5"
                    value="5"
                    checked={radio === "5"}
                    onChange={() => onOptionChange("5")}
                  />
                  <label class="form-check-label" for="inlineRadio5">
                    Former Employees
                  </label>
                </div>
              )}
            </div>
            <div className="row d-flex justify-content-center align-items-center ">
              {loading ? (
                "Loading..."
              ) : filteredEmployees && filteredEmployees.length !== 0 ? (
                filteredEmployees.map((employee) => {
                  return radio === "5" ? (
                    <EmployeeCard
                      employee={employee}
                      setEmployees={setEmployees}
                      employees={employees}
                      key={employee._id}
                      radio={radio}
                      adminLevel={adminLevel}
                      onOptionChange={onOptionChange}
                    />
                  ) : (
                    employee.status === 1 && (
                      <EmployeeCard
                        employee={employee}
                        setEmployees={setEmployees}
                        employees={employees}
                        key={employee._id}
                        radio={radio}
                        adminLevel={adminLevel}
                        onOptionChange={onOptionChange}
                      />
                    )
                  );
                })
              ) : (
                <Typography>
                  No employee records were found based on the selected criteria.
                </Typography>
              )}
            </div>
          </Container>
        </Stack>
      </Container>
    </DashboardLayout>
  );
};

export default Employees;
