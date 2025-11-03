import { Button, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react"
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface LoginProps {
    close: () => void;
}





export default function Login({ close }: LoginProps) {
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const login = async () => {
        try {
            const user = { userName, password };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user,
                {
                    headers:
                        { 'Content-Type': 'application/json' },
                    withCredentials: true

                }
            );
            const data = response.data;
            console.log(data)

            if (data.status === "success") {
                notifications.show({
                    title: 'login',
                    message: `login successfully!`,
                    icon: <AiOutlineCheck />,
                    color: 'cyan'
                })
                close()
            } else {
                notifications.show({
                    title: 'login',
                    message: `Error: ${data.message}`,
                    icon: <AiOutlineClose />,
                    color: 'red'
                })
            }
        } catch (e: any) {
            console.error("Error login:", e);
            alert(`Error login: ${e}`);
        }
    };




    return (
        // <div className="bg-green-200  p-4 flex  justify-center items-center ">
        <div className="bg-green-300 p-8  h-96 flex flex-col justify-evenly   gap-4 rounded-md">


            <h3 className='text-cyan-900 font-mono text-lg  ' >
                login
            </h3>
            <TextInput
                placeholder="user name"
                label="user name"
                radius="md"
                size="md"
                withAsterisk
                required
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
            />



            <PasswordInput
                label="password"
                radius="md"
                size="md"
                withAsterisk
                required
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={login} >
                sing in
            </Button>
        </div>




        // </div>

    )
};
