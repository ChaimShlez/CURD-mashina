import { Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";


interface UpdateEmployeeProps {
    employee: any;
    onClose: () => void;
}

export default function UpdateEmployee({ employee, onClose }: UpdateEmployeeProps) {
    const [id, setID] = useState<string>(employee.id);
    const [name, setName] = useState<string>(employee.name);
    const [role, setRole] = useState<string>(employee.role);
    const [salary, setSalary] = useState<number>(employee.salary);
    const [isBonus, setIsBonus] = useState<boolean>(employee.isBonus);


    const saveEmployee = async () => {
        try {
            const employee = { id, name, role, salary, isBonus };

            const response = await axios.put(`${import.meta.env.VITE_API_URL}`, employee,
                {
                    headers:
                        { 'Content-Type': 'application/json' }
                }
            );
            const data = response.data;
            console.log(data)

            if (data.status === "success") {
                notifications.show({
                    title: 'update employee',
                    message: `Employee ${data.updated_id} update successfully!`,
                    icon:<AiOutlineCheck />, 
                    color:'cyan'
                })
            } else {
                notifications.show({
                    title: 'update employee',
                    message: `Error: ${data.message}`,
                    icon: <AiOutlineClose />,
                    color: 'red'
                })
            }
            onClose()
        } catch (e: any) {
            console.error("Error saving employee:", e);
            alert(`Error saving employee: ${e.message || e}`);
        }
    };



    return (
        <div className="bg-green-200  p-4 flex  justify-center items-center ">
            <div className="bg-green-300 p-8 w-80  flex flex-col  justify-center items-center gap-4 rounded-md">
                <TextInput
                    placeholder="ID"
                    label="ID"
                    radius="md"
                    required
                    value={id}
                    onChange={(event) => setID(event.currentTarget.value)}
                />
                <TextInput
                    placeholder="name"
                    label="name"
                    radius="md"
                    required
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />

                <TextInput
                    placeholder="role"
                    label="role"
                    radius="md"
                    required
                    value={role}
                    onChange={(event) => setRole(event.currentTarget.value)}
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