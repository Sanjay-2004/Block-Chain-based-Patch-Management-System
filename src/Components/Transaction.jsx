import React from 'react'
import axios from 'axios'

const transactionData = {
    token: localStorage.getItem('token'), // Assuming the email is stored in localStorage
    transactionHash: result.transactionHash,
    blockHash: result.blockHash,
    sender: result.from,
    receiver: result.to,
    blockNumber: result.blockNumber,
    gasUsed: result.gasUsed,
};

try {
    const url = 'http://localhost:8080/transactions'
    await axios.post(url, transactionData);
    console.log('Transaction saved successfully');
} catch (error) {
    console.log('Error saving transaction:', error);
}