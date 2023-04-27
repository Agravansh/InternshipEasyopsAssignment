// script.js
$(document).ready(function() {
    let persons = [];

    // Submit form to add person
    $('#personForm').submit(function(event) {
        event.preventDefault();
        const name = $('#nameInput').val();
        const contact = $('#contactInput').val();

        // Check for duplicate name and contact
        if (isDuplicate(name, contact, persons)) {
            showAlert('Person with same name and contact already exists.');
            return;
        }

        // Add person to array and populate table
        const person = { name, contact };
        persons.push(person);
        addPersonToTable(person);

        // Clear form inputs
        $('#nameInput').val('');
        $('#contactInput').val('');
    });

    // Delete person from table
    $(document).on('click', '.deleteBtn', function() {
        const row = $(this).closest('tr');
        const name = row.find('.nameCell').text();
        const contact = row.find('.contactCell').text();
        const person = { name, contact };

        // Remove person from array and update table
        persons = persons.filter(p => !(p.name === name && p.contact === contact));
        row.remove();
    });

    // Sort table by name
    $('#personTable').on('click', '.nameHeader', function() {
        const table = $('#personTable');
        const rows = table.find('tbody tr').get();

        // Sort rows based on name
        rows.sort(function(a, b) {
            const nameA = $(a).find('.nameCell').text().toUpperCase();
            const nameB = $(b).find('.nameCell').text().toUpperCase();
            return nameA.localeCompare(nameB);
        });

        // Clear and re-append sorted rows to table
        table.find('tbody').empty();
        $.each(rows, function(index, row) {
            table.find('tbody').append(row);
        });
    });

    // Search by name
    $('#searchInput').on('input', function() {
        const searchVal = $(this).val().toUpperCase();
        const rows = $('#personTable tbody tr');

        rows.each(function() {
            const name = $(this).find('.nameCell').text().toUpperCase();
            if (name.includes(searchVal)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Helper function to check for duplicate name and contact
    function isDuplicate(name, contact, arr) {
        return arr.some(person => person.name === name && person.contact === contact);
    }

    // Helper function to add person to table
    function addPersonToTable(person) {
        const row = $('<tr>');
        row.append($('<td>').addClass('nameCell').text(person.name));
        row.append($('<td>').addClass('contactCell').text(person.contact));
        row.append($('<td>').append($('<button>').addClass('deleteBtn').text('Delete')));
        $('#personTable tbody').append(row);
    }

    // Helper function to show alert
    function showAlert(message) {
        alert(message);
    }
});
