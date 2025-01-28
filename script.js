document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const quoteInput = document.getElementById('quote-input');
    const authorInput = document.getElementById('author-input');
    const addQuoteBtn = document.getElementById('add-quote-btn');
    const quotesContainer = document.getElementById('quotes-container');

    // Load stored quotes from local storage
    function loadQuotes() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes.forEach(quote => displayQuote(quote));
    }

    // Display a quote in the quotes container
    function displayQuote(quote) {
        const quoteItem = document.createElement('div');
        quoteItem.className = 'quote-item';
        quoteItem.innerHTML = `
            <span>"${quote.text}" - ${quote.author}</span>
            <button class="remove-btn" data-id="${quote.id}">Remove</button>
        `;
        quotesContainer.appendChild(quoteItem);

        // Add event listener to the remove button
        quoteItem.querySelector('.remove-btn').addEventListener('click', function () {
            removeQuote(quote.id);
        });
    }

    // Add a new quote
    function addQuote() {
        const quoteText = quoteInput.value.trim();
        const authorText = authorInput.value.trim();

        if (quoteText !== "" && authorText !== "") {
            const quote = {
                id: Date.now(),
                text: quoteText,
                author: authorText
            };

            // Save the quote to local storage
            const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
            storedQuotes.push(quote);
            localStorage.setItem('quotes', JSON.stringify(storedQuotes));

            // Display the quote
            displayQuote(quote);

            // Clear input fields
            quoteInput.value = "";
            authorInput.value = "";
        }
    }

    // Remove a quote
    function removeQuote(id) {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        const updatedQuotes = storedQuotes.filter(quote => quote.id !== id);
        localStorage.setItem('quotes', JSON.stringify(updatedQuotes));

        // Update the displayed list of quotes
        quotesContainer.innerHTML = "";
        updatedQuotes.forEach(quote => displayQuote(quote));
    }

    // Add event listener to the add quote button
    addQuoteBtn.addEventListener('click', addQuote);

    // Load quotes on page load
    loadQuotes();
});
