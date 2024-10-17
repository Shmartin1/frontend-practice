# Autocomplete Search Component

## Overview

This project implements an autocomplete search component using vanilla JavaScript. The component provides real-time search suggestions as the user types, enhancing the user experience and efficiency of search functionality.

## Features

- Real-time search suggestions
- Debounced search to optimize performance
- Highlighted matching text in suggestions
- Keyboard navigation support
- Modular and object-oriented design

## Key Takeaways for Developers

1. **Debounce Implementation**: The `debouncedSearchProducts` function in `server.js` demonstrates how to implement debouncing. This technique prevents excessive API calls by delaying the execution of the search function until the user has stopped typing for a specified duration.

2. **Modular Architecture**: The project is structured into separate modules (input.js, list.js, server.js, utils.js) promoting code organization and reusability.

3. **Class-based Component Design**: The use of classes (Input and List) showcases how to create reusable and encapsulated components in vanilla JavaScript.

4. **DOM Manipulation**: Various techniques for DOM manipulation are demonstrated, including creating elements from HTML strings, using document fragments for efficient updates, and replacing child elements.

5. **Event Handling**: The project illustrates how to handle user interactions through event listeners, such as input changes and list clicks.