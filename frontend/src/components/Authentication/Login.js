import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../Context/ChatProvider'

const Login = () => {
    const { setUser } = ChatState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const history = useHistory()
    const submitHandler = async () => {
        setLoading(true)
        if (!email || !password) {
            toast({
                title: 'Please Fill all the Fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            }
            let data;

            try{
                const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
                { email, password },
                config
            )
            data=response
            }catch (error) {
                console.error("Error during axios request:", error);
                if (error.response) {
                  console.error("Server responded with:", error.response.data);
                }
            }
            console.log("Data is",data)

            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setUser(data)
            // console.log('Hi', data, localStorage.getItem('userInfo'))
            setLoading(false)
            history.push('/chats')
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
        }
    }
    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        value={password}
                        placeholder='Enter Password'
                        type={show ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button
                            h='1.75rem'
                            size='sm'
                            onClick={() => setShow(!show)}
                        >
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                width='100%'
                color='white'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant='solid'
                colorScheme='red'
                width='100%'
                onClick={() => {
                    setEmail('guest@example.com')
                    setPassword('123456')
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login
