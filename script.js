const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector("#primary-menu");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navPanel.classList.toggle("is-open", !isExpanded);
});

navPanel.addEventListener("click", (event) => {
  if (event.target.closest("a") && window.matchMedia("(max-width: 640px)").matches) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navPanel.classList.remove("is-open");
  }
});

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#course-search");
const courseCards = [...document.querySelectorAll(".course-card")];
const emptyState = document.querySelector(".empty-state");
const searchStatus = document.querySelector(".search-status");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  for (const card of courseCards) {
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase();
    const matches = query === "" || searchableText.includes(query);
    card.hidden = !matches;
    visibleCount += Number(matches);
  }

  emptyState.hidden = visibleCount !== 0;
  searchStatus.textContent = query === ""
    ? "Showing all lessons."
    : `${visibleCount} ${visibleCount === 1 ? "lesson" : "lessons"} found.`;
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    for (const card of courseCards) card.hidden = false;
    emptyState.hidden = true;
    searchStatus.textContent = "";
  }
});
