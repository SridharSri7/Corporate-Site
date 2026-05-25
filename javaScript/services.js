function toggleDetail(element) {

  const wrapper = element.parentElement;

  // close others
  document.querySelectorAll(".service-wrapper").forEach(item => {
    if (item !== wrapper) {
      item.classList.remove("active");
    }
  });

  // toggle current
  wrapper.classList.toggle("active");
}