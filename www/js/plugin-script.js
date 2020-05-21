const pluginStyle = () => {
    let width = window.innerWidth;
    width = width > 500 ? 500 : width;
    let height = window.innerHeight;
    const plugin = document.getElementById("fb-plugin");
    plugin.setAttribute("data-width", width);
    plugin.setAttribute("data-height", height);
}
document.addEventListener("DOMContentLoaded", pluginStyle, false);