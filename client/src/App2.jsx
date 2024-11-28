import React, { useState, useEffect } from "react";
import Web3 from "web3";
import tradeKeyAbi from "./TradeKeyABI.json"; // Import your contract ABI here

// Replace with your deployed contract address
<<<<<<< Updated upstream
const contractAddress = "0x310F46F13f3D4f183b5D94D5508348625F22f9f3";
=======
const contractAddress = "0xd903dC0Ea5DF7451B59E0e34E6b3ACf868C62e56";
>>>>>>> Stashed changes

const App2 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [price, setPrice] = useState("");
  const [value, setValue] = useState("");
  const [itemId, setItemId] = useState("");
  const [allItems, setAllItems] = useState([]);

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        // Initialize the contract instance
        const contractInstance = new web3Instance.eth.Contract(tradeKeyAbi, contractAddress);
        setContract(contractInstance);

        alert(`Wallet connected: ${accounts[0]}`);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  // Handle account switching
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]); // Update account when user switches wallets
        alert(`Account changed to: ${accounts[0]}`);
      });
    }
  }, []);

  // Set price and value for an item
  const handleSetPriceAndValue = async () => {
    if (!price || !value) return alert("Please enter both price and value.");

    try {
      await contract.methods.setPriceAndValue(Web3.utils.toWei(price, "ether"), value).send({
        from: account,
      });
      alert("Item listed successfully!");
    } catch (error) {
      console.error(error);
      alert("Error setting price and value");
    }
  };

  // Purchase an item
  const handlePurchase = async () => {
    if (!itemId) return alert("Please enter a valid item ID.");

    try {
      const item = await contract.methods.items(itemId).call();
      if (!item.available) return alert("This item has already been sold.");
      if (Web3.utils.toWei(price, "ether") !== item.price)
        return alert("Incorrect price sent.");

      await contract.methods.purchase(itemId).send({
        from: account,
        value: item.price,
      });

      alert("Purchase successful!");
    } catch (error) {
      console.error(error);
      alert("Error purchasing the item.");
    }
  };

  // Fetch all item details
  const handleGetAllItems = async () => {
    try {
      const items = await contract.methods.getAllItemsDetails().call();
      const itemDetails = items[0].map((_, index) => ({
        seller: items[0][index],
        buyer: items[1][index],
        price: items[2][index],
        value: items[3][index],
        available: items[4][index],
      }));
      setAllItems(itemDetails);
    } catch (error) {
      console.error(error);
      alert("Error fetching item details");
    }
  };

  return (
    <div className="App">
      {/* Connect Wallet Button */}
      <div>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Connected Wallet: {account}</p>
        )}
      </div>

      <h1>Smart Marketplace</h1>

      {/* Set Price and Value Section */}
      <div>
        <h3>Set Price and Value</h3>
        <input
          type="number"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value (Description)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSetPriceAndValue}>Set Price and Value</button>
      </div>

      {/* Purchase Section */}
      <div>
        <h3>Purchase Key</h3>
        <input
          type="number"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <button onClick={handlePurchase}>Purchase</button>
      </div>

      {/* All Items Section */}
      <div>
        <h3>All Item Details</h3>
        <button onClick={handleGetAllItems}>Get All Items</button>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Seller</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Value</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.seller}</td>
                <td>{item.buyer || "Not Sold"}</td>
                <td>{Web3.utils.fromWei(item.price, "ether")}</td>
                <td>{item.value}</td>
                <td>{item.available ? "Available" : "Sold"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App2;
