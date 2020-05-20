const pluginStyle = () => {
    let width = window.innerWidth;
    width = width > 500 ? 500 : width;
    let height = window.innerHeight * 0.75;
    const plugin = document.getElementById("fb-plugin");
    plugin.style.setAttribute("data-width", width);
}
document.addEventListener("DOMContentLoaded", pluginStyle, false);