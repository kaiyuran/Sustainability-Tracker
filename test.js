function loadCSV(csvPath) {
    // Fetch the CSV file using the fetch API
    fetch(csvPath)
      .then(response => response.text()) // Get the response as text
    //   .then(r => console.log(r))
      .then(csvContent => {
        const rows = csvContent.trim().split('\n'); // Split into rows
        const result = {};
  
        rows.forEach(row => {
          const values = row.split(','); // Split by commas
          const identifier = values[0]; // First value is the identifier
          const data = values.slice(1).map(Number); // Convert data to numbers
        //   console.log(data);
          const numYes = data.filter(num => isNaN(num)).length;
        //   console.log(identifier, numYes);
          result[identifier] = numYes; // Add to the result object
        });
        
        console.log(result); // Output the result object
      })
      .catch(error => console.error('Error fetching CSV:', error)); // Handle any errors
  }

console.log(loadCSV('database.csv')); // Load the CSV file