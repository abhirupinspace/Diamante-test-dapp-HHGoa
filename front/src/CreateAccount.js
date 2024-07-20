import React, { useState } from 'react';

function CreateAccount() {
  const [keypair, setKeypair] = useState({ publicKey: '', secret: '' });
  const [publicKeyToFund, setPublicKeyToFund] = useState('');
  const [fundingMessage, setFundingMessage] = useState('');

  const generateKeypair = async () => {
    console.log('Generate Keypair button clicked');
    try {
      const response = await fetch('http://localhost:3001/create-keypair', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Keypair generated:', data);
      setKeypair({
        publicKey: data.publicKey,
        secret: data.secret,
      });
      setPublicKeyToFund(data.publicKey);  // Automatically set the generated public key for funding
    } catch (error) {
      console.error('Error generating keypair:', error);
    }
  };

  const fundAccount = async () => {
    console.log('Fund Account button clicked');
    try {
      const response = await fetch('http://localhost:3001/fund-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: publicKeyToFund }),
      });
      const data = await response.json();
      console.log('Account funded:', data);
      setFundingMessage(data.message);
    } catch (error) {
      console.error('Error funding account:', error);
      setFundingMessage('Error funding account.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-6">
      <h1 className="text-4xl font-bold text-gray-100 mb-8">Create Account</h1>

      <section className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Keypair Generator</h2>
        <p className="text-gray-400 mb-4">
          These keypairs can be used on the Diamante network where one is required. For example, it can be used as an account master key, account signer, and/or as a diamnet-core node key.
        </p>
        <button
          onClick={generateKeypair}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 mb-4"
        >
          Generate Keypair
        </button>
        <div className="text-gray-200">
          <p className="mb-2"><strong>Public Key:</strong> {keypair.publicKey}</p>
          <p><strong>Secret Key:</strong> {keypair.secret}</p>
        </div>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Fund Account</h2>
        <p className="text-gray-400 mb-4">
          Fund this account on the test network using the friendbot tool below. Note down the wallet details for making transactions.
        </p>
        <input
          type="text"
          placeholder="Enter Public Key"
          value={publicKeyToFund}
          onChange={(e) => setPublicKeyToFund(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fundAccount}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 mb-4"
        >
          Get Test DIAM
        </button>
        <p className="text-gray-200">{fundingMessage}</p>
      </section>
    </div>
  );
}

export default CreateAccount;
