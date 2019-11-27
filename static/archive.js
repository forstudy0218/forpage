// archive form render
function archive () {
    // html name (*.html)
    const all_archive = ["werewolf", "wwnext", "test"]
    const form = document.getElementById("archive_form")
    all_archive.forEach(function(e) {
        const newButton = document.createElement('input')
        // https://stackoverflow.com/questions/16036041
        // type="submit" name="achieve_name" value
        newButton.type = "submit"
        newButton.name = "achieve_name"
        newButton.value = e
        newButton.style.textAlign = "center"
        newButton.style.margin = "10px"
        if (e === "test") {
            newButton.disabled = true
        }
        form.appendChild(newButton)
    })
}

window.onload = archive;