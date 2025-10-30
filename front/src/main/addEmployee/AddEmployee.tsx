import { Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

export default function AddEmployee() {
    const [id, setID] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);
    const [isBonus, setIsBonus] = useState<boolean>(false);


    const saveEmployee = async () => {
        try {
            const employee = { id, name, role, salary, isBonus };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/addEmployee`,employee,
                { headers: 
                    { 'Content-Type': 'application/json' } ,
                    withCredentials: true
                }
            );
            const data = response.data;

            if (data.status === "success") {
                alert(`Employee ${data.id} added successfully!`);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (e: any) {
            console.error("Error saving employee:", e);
            alert(`Error saving employee: ${e.message || e}`);
        }
    };



    return (
        <div className="bg-green-200 h-screen p-4 flex  justify-center items-center ">
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