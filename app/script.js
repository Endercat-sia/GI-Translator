var menuButton = document.getElementById("menu-button");
var nav = document.querySelector("nav");
menuButton.addEventListener("click", function () {
  nav.classList.toggle("show");
});
const items = [
  {
    id: 999999901,
    name: "Red T-Shirt",
    description: "A comfortable red t-shirt made from 100% cotton.",
    tags: ["clothing", "red", "cotton", "shirt"]
  },
  {
    id: 999999902,
    name: "Blue Jeans",
    description: "Classic blue jeans that fit well and look great.",
    tags: ["clothing", "blue", "jeans", "bottom"]
  },
  {
    id: 999999903,
    name: "Green Hoodie",
    description: "Stay warm and stylish in this green hoodie.",
    tags: ["clothing", "green", "hoodie"]
  },
  {
    id: 999999904,
    name: "Running Shoes",
    description:
      "High-quality running shoes that provide excellent support and comfort.",
    tags: ["shoes", "running", "athletic"]
  },
  {
    id: 999999905,
    name: "Leather Wallet",
    description: "A sleek leather wallet that holds all your essentials.",
    tags: ["accessories", "wallet", "leather"]
  }
];

function searchItems(query) {
  document.getElementById("results").innerHTML = "";
  const filteredItems = items.filter(
    (item) =>
      item.id.toString() === query.toLowerCase() ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );
  if (filteredItems.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No results found.";
    document.getElementById("results").appendChild(listItem);
  } else {
    filteredItems.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `item${item.id}.html`;
      link.target = "_blank";
      link.textContent = item.name;
      listItem.appendChild(link);
      const tagList = document.createElement("ul");
      tagList.classList.add("tags");
      item.tags.forEach((tag) => {
        const tagItem = document.createElement("li");
        tagItem.textContent = tag;
        tagList.appendChild(tagItem);
      });
      listItem.appendChild(tagList);
      document.getElementById("results").appendChild(listItem);
    });
  }
}
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  searchItems(document.getElementById("search").value);
});
$(document).ready(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    var searchTerm = $('input[name="search"]').val();
    $.ajax({
      url: "/search",
      type: "get",
      data: { search: searchTerm },
      success: function (data) {
        // display search results on the page
      }
    });
  });
});
