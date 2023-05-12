fetch("items-list.json")
			.then(response => response.json())
			.then(items => {

		// Function to search for items
		function searchItems(query) {
			// Clear previous search results
			document.getElementById("results").innerHTML = "";

			// Filter items based on search query
			const filteredItems = items.filter(item => item.id.toString().toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));

			// Display search results or feedback if no results found
			if (filteredItems.length === 0) {
				const listItem = document.createElement("li");
				listItem.textContent = "No results found.";
				document.getElementById("results").appendChild(listItem);
			} else {
				filteredItems.forEach(item => {
					const listItem = document.createElement("li");
					const link = document.createElement("a");
					link.href = `item${item.id}.html`;
					link.target = "_blank";
					link.textContent = item.name;
					listItem.appendChild(link);

					// Add tags to the search result
					const tagList = document.createElement("ul");
					tagList.classList.add("tags");
					item.tags.forEach(tag => {
						const tagItem = document.createElement("li");
						tagItem.textContent = tag;
						tagList.appendChild(tagItem);
					});
					listItem.appendChild(tagList);

					document.getElementById("results").appendChild(listItem);
				});
			}
		}

		// Add event listener to search form
		document.getElementById("searchForm").addEventListener("submit", event => {
			event.preventDefault();
			searchItems(document.getElementById("search").value);
		});
    })
