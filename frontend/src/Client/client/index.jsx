import React from 'react'
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const ProtectedClient  = () => {
    const navigation = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigation("/")
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/user/verify', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.message === 'authorized') {
                navigation("home")
            } else {
                navigation("/")
            }
        } catch (error) {
            navigation("/")
        }
    };

    verifyToken();
}, []);
  return (
    <div>Loading ... </div>
  )
}

export default ProtectedClient 