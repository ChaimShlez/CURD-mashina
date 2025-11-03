import { Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { useLocation, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { employeeAtom } from "../../jotai/jotai";




export default function UpdateEmployee() {
    const location = useLocation();
    const employee = location.state.employee
    const navigate = useNavigate();
    const setEmployees = useSetAtom(employeeAtom);



    const [id, setID] = useState<string>(employee.id);
    const [name, setName] = useState<string>(employee.name);
    const [role, setRole] = useState<string>(employee.role);
    const [salary, setSalary] = useState<number>(employee.salary);
    const [isBonus, setIsBonus] = useState<boolean>(employee.isBonus);




    const saveEmployee = async () => {
        try {

            const updatedEmployee = { id, name, role, salary, isBonus };

            const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateEmployee`, updatedEmployee,
                {
                    headers:
                        { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response)
            const data = response.data;
            console.log(data)

            if (data.status === "success") {
                notifications.show({
                    title: 'update employee',
                    message: `Employee ${data.updated_id} update successfully!`,
                    icon: <AiOutlineCheck />,
                    color: 'cyan'
                })

                setEmployees(prevEmployees =>
                    prevEmployees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp))

                navigate('/')

            }
           else {
                notifications.show({
                    title: 'update employee',
                    message: `Error: ${data.message}`,
                    icon: <AiOutlineClose />,
                    color: 'red'
                })
            }
        } catch (e: any) {
            console.error("Error saving employee:", e);
            alert(`Error saving employee: ${e.message || e}`);
        }
    };



    return (
        <div className="bg-green-200   p-4 flex  justify-center items-center ">

            <div className="bg-green-300 p-8 w-80  flex flex-col  justify-center items-center gap-4 rounded-md">
                <TextInput
                    placeholder="ID"
                    label="ID"
                    radius="md"
                    required
                    value={id}
                    onChange={(event) => setID(event.target.value)}
                />
                <TextInput
                    placeholder="name"
                    label="name"
                    radius="md"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <TextInput
                    placeholder="role"
                    label="role"
                    radius="md"
                    required
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />
                <NumberInput
                    placeholder="salary"
                    label="salary"
                    radius="md"
                    required
                    value={salary}
                    onChange={(value) => setSalary(value || 0)}
                />

                <Checkbox
                    label="Bonus?"
                    color="cyan"
                    checked={isBonus}
                    onChange={(event) => setIsBonus(event.currentTarget.checked)}
                />

                <Button onClick={saveEmployee}>
                    save employee
                </Button>


            </div>

        </div>

    )
}