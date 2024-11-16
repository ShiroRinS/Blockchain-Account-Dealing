// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TradeKey {
    address public marketplaceSeller; // Renamed to avoid conflict with Item struct
    uint256 public price;
    string public value; // Represents the product/service information
    uint256 public nextItemId; // To keep track of the item IDs

    // Struct to represent an item
    struct Item {
        address seller;
        address buyer;
        uint256 price;
        string value;
        bool available; // Availability status, true means available, false means sold
    }

    // Mapping from item ID to Item
    mapping(uint256 => Item) public items;

    // Array to keep track of all item IDs
    uint256[] public allItemIds;

    // Event to emit when a purchase is completed
    event PurchaseCompleted(uint256 indexed itemId, address indexed buyer, address indexed seller, uint256 amount);

    // Event to emit when a new item is created
    event ItemCreated(uint256 indexed itemId, address indexed seller, uint256 price, string value);

    // Function to set both price and value at the same time, only callable by the seller
    function setPriceAndValue(uint256 _price, string calldata _value) external {
        uint256 itemId = nextItemId++; // Create a unique ID for the item

        // Store the new item in the mapping
        items[itemId] = Item({
            seller: msg.sender,
            buyer: address(0), // Initially, no buyer
            price: _price,
            value: _value,
            available: true // The item is available initially
        });

        allItemIds.push(itemId); // Add the new item ID to the array of all item IDs

        marketplaceSeller = msg.sender; // Record the marketplace seller (the one who sets the price and value)

        emit ItemCreated(itemId, msg.sender, _price, _value); // Emit an event when a new item is created
    }

    // Function for a buyer to make a purchase
    function purchase(uint256 itemId) external payable {
        Item storage item = items[itemId];

        require(item.available, "Product is already sold.");
        // require(msg.value == item.price, "Incorrect price sent.");

        item.buyer = msg.sender; // Record the buyer
        item.available = false;  // Mark the item as sold

        // Transfer the funds to the seller
        payable(item.seller).transfer(msg.value);

        emit PurchaseCompleted(itemId, item.buyer, item.seller, msg.value);
    }

    // Function to check the current owner of a specific item
    function getItemOwner(uint256 itemId) external view returns (address) {
        Item storage item = items[itemId];
        if (item.available) {
            return item.seller; // The item is still available, so the seller is the owner
        }
        return item.buyer; // The item is sold, so the buyer is the owner
    }

    // Function to get all created items' IDs
    function getAllItemIds() external view returns (uint256[] memory) {
        return allItemIds;
    }

    // Function to get details of all created items
    function getAllItemsDetails() external view returns (address[] memory sellers, address[] memory buyers, uint256[] memory prices, string[] memory values, bool[] memory availabilities) {
        uint256 itemCount = allItemIds.length;

        // Initialize arrays to store details of all items
        sellers = new address[](itemCount);
        buyers = new address[](itemCount);
        prices = new uint256[](itemCount);
        values = new string[](itemCount);
        availabilities = new bool[](itemCount);

        // Loop through all item IDs and fetch details
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 itemId = allItemIds[i];
            Item storage item = items[itemId];

            sellers[i] = item.seller;
            buyers[i] = item.buyer;
            prices[i] = item.price;
            values[i] = item.value;
            availabilities[i] = item.available;
        }
    }
}
