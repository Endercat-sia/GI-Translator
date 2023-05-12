fetch("items-list.json")
			.then(response => {
				if (!response.ok) {
					throw new Error(`Failed to load item data (${response.status} ${response.statusText})`);
				}
				return response.json();
			})
			.then(items => {
				function searchItems(query) {
					document.getElementById("results").innerHTML = "";
					const filteredItems = items.filter(item => item.id.toString().toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));
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
				document.getElementById("searchForm").addEventListener("submit", event => {
					event.preventDefault();
					searchItems(document.getElementById("search").value);
				});
			})
			.catch(error => {
				console.error(error);
				const listItem = document.createElement("li");
				listItem.textContent = "Failed to load item data.";
				document.getElementById("results").appendChild(listItem);
			});