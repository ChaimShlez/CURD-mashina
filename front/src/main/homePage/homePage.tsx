import axios from "axios";
import { useEffect} from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeAtom } from '../../jotai/jotai';

interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
  isBonus: boolean;
}

export default function HomePage() {
  const navigate = useNavigate();

const [employees, setEmployees] = useAtom(employeeAtom);


  async function getEmployees() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getEmployees`);
      setEmployees(response.data);
    } catch (e) {
      console.error("Error fetching employees:", e);
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const deleteEmployee = async (employeeID: string) => {
    try {
      const response = await axios.delete
        (`${import.meta.env.VITE_API_URL}/deleteEmployee/${employeeID}`,
          { withCredentials: true }

        );

      const data = response.data;
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeID));

      if (data.status === "success") {


        alert(`Employee ${data.deleted_id} deleted successfully!`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (e: any) {
      console.error("Error deleting employee:", e);
      alert(`Error deleting employee: ${e.message || e}`);
    }
  };

  const update = (employee: Employee) => {

    navigate('/updateEmployee', { state: { employee } });
  };




  const rows = employees.map((employee) => (
    <tr key={employee.id}>
      <td className="border-2 border-black text-center">{employee.id}</td>
      <td className="border-2 border-black text-center">{employee.name}</td>
      <td className="border-2 border-black text-center">{employee.role}</td>
      <td className="border-2 border-black text-center">{employee.salary}</td>
      <td className="border-2 border-black">
        <div className="flex justify-center ">
          {employee.isBonus ? <AiOutlineCheck /> : <AiOutlineClose />}
        </div>
      </td>
      <td className="!border-2 !border-black text-center" onClick={() => deleteEmployee(employee.id)}>
        <button className=" cursor-pointr hover:text-red-600">
          <FaTrash />
        </button>
      </td>
      <td className="!border-2 !border-black text-center ">
        <button className="  hover:text-blue-600"
          onClick={() => update(employee)}
        >
          <FaUserEdit />
        </button>
      </td>
    </tr>
  ));

  return (

    <div className="bg-green-200 min-h-full p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">Employees List</h1>

      <div className="max-w-5xl mx-auto">
        <Table
          horizontalSpacing="sm"
          verticalSpacing="sm"
          withBorder
          withColumnBorders
          className="bg-green-300 border-2 !border-black"
        // style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr className="border-4 border-gray-900">
              <th className="!border-2 !border-black !text-center">ID</th>
              <th className="!border-2 !border-black !text-center">Name</th>
              <th className="!border-2 !border-black !text-center">Role</th>
              <th className="!border-2 !border-black !text-center">Salary</th>
              <th className="!border-2 !border-black !text-center">Bonus</th>
              <th className="!border-2 !border-black !text-center">Delete</th>
              <th className="!border-2 !border-black !text-center">Edit</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>

    </div>
  );
}