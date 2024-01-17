// Function to generate the table HTML
function generateTable(data) {
    var tableHTML = '<table>';
    tableHTML += '<thead><tr><th>Date</th><th>Amount (R)</th></tr></thead>';
    tableHTML += '<tbody>';

    data.forEach(function (item) {
        tableHTML += '<tr>';
        tableHTML += '<td>' + item.date.toDate().toLocaleDateString() + '</td>'; // Convert Firestore Timestamp to JavaScript Date
        tableHTML += '<td>' + item.amount + '</td>';
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    return tableHTML;
}

// Function to fetch data from Firestore
function fetchDataAndGenerateTable() {
    var paymentHistoryRef = firebase.firestore().collection('paymentHistory'); // Assuming 'db' is your Firestore instance

    paymentHistoryRef.get().then(function (querySnapshot) {
        var paymentHistoryData = [];
        querySnapshot.forEach(function (doc) {
            paymentHistoryData.push(doc.data());
        });

        // Sort the payment history data by date
        paymentHistoryData.sort(function (a, b) {
            return new Date(a.date.toDate()) - new Date(b.date.toDate());
        });

        // Get the container and append the generated table
        var container = document.getElementById('payment-log');
        container.innerHTML = generateTable(paymentHistoryData);
    }).catch(function (error) {
        console.error("Error fetching data: ", error);
    });
}


// Call the function to fetch data and generate the table
fetchDataAndGenerateTable();