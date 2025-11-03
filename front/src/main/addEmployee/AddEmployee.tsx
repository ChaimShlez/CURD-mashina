import { Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function AddEmployee() {
    const [id, setID] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);
    const [isBonus, setIsBonus] = useState<boolean>(false);
    const navigate = useNavigate();

    const saveEmployee = async () => {
        try {
            const employee = { id, name, role, salary, isBonus };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/addEmployee`, employee,
                {
                    headers:
                        { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const data = response.data;
            console.log('data', data)

            if (data.status === "success") {
                // alert(data.message);
                notifications.show({
                    title: 'add employee',
                    message: data.message,
                    icon: <AiOutlineCheck />,
                    color: 'cyan'
                })
                navigate('/')

            }

            else {
                notifications.show({
                    title: 'add employee',
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
        <div className="bg-green-200 min-h-full p-12 flex  justify-center items-center ">

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
                    onChange={(event) => setIsBonus(event.target.checked)}
                />

                <Button onClick={saveEmployee}>
                    save employee
                </Button>


            </div>

        </div>

    )
}