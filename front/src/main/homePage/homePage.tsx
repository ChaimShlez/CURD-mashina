import axios from "axios";
import { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  role:string;
  salary:number;
  isBonus:boolean

}

export default function HomePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  async function getEmployees() {
    try {
      const response = await axios.get('http://localhost:5000/getemployees');
      setEmployees(response.data);
    } catch (e) {
      console.error("Error fetching employees:", e);
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      {/* <h1>Employees List</h1>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name}</li>
        ))}
      </ul> */}
    </div>
  );
}
