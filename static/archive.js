// archive form render
function archive () {
    // html name (*.html)
    const all_archive = ["werewolf"]
    const form = document.getElementById("archive_form")
    all_archive.forEach(function(e) {
        const newButton = document.createElement('input')
        // https://stackoverflow.com/questions/16036041
        // type="submit" name="achieve_name" value
        newButton.type = "submit"
        newButton.name = "achieve_name"
        newButton.value = e
        form.appendChild(newButton)
    })
}

window.onload = acrhive;