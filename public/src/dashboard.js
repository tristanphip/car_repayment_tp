function generateTable(data) {
    var tableHTML = '<table>';
    tableHTML += '<thead><tr><th>Date</th><th>Amount (R)</th><th>Type</th></tr></thead>';
    tableHTML += '<tbody>';

    data.forEach(function (item) {
        tableHTML += '<tr>';
        tableHTML += '<td>' + item.date.toDate().toLocaleDateString() + '</td>';
        tableHTML += '<td>' + item.amount + '</td>';
        tableHTML += '<td>' + item.type + '</td>';
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    return tableHTML;
}

function fetchDataAndGenerateTable() {
    var paymentHistoryRef = firebase.firestore().collection('paymentHistory');

    paymentHistoryRef.get().then(function (querySnapshot) {
        var paymentHistoryData = [];
        querySnapshot.forEach(function (doc) {
            paymentHistoryData.push(doc.data());
        });

        paymentHistoryData.sort(function (a, b) {
            return new Date(a.date.toDate()) - new Date(b.date.toDate());
        });

        var container = document.getElementById('log-table');
        container.innerHTML = generateTable(paymentHistoryData);
    }).catch(function (error) {
        console.error("Error fetching data: ", error);
    });
}

function submitPayment() {
    var paymentDate = document.getElementById('paymentDate').value;
    var amount = parseInt(document.getElementById('amount').value);
    var paymentType = document.getElementById('paytype').value;

    if (!paymentDate || isNaN(amount)) {
        alert("Please enter valid data and amount.");
        return;
    }

    if (paymentType.charAt(0).toUpperCase() == 'S') {
        paymentType = "Scheduled";
    } else {
        paymentType = "Deposit";
    }

    document.getElementById('paytype').value = paymentType;

    var paymentHistoryRef = firebase.firestore().collection('paymentHistory');
    paymentHistoryRef.add({
        date: new Date(paymentDate),
        amount: amount,
        type: paymentType
    }).then(function () {
        fetchDataAndGenerateTable();
        document.getElementById('paymentForm').reset();
    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });
}

