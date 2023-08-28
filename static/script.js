document.addEventListener("DOMContentLoaded", function () {
    // Load the list of files on page load
    loadFiles();
});

function loadFiles() {
    fetch("http://127.0.0.1:5000/files")
        .then((response) => response.json())
        .then((data) => {
            const fileList = document.getElementById("fileList");
            fileList.innerHTML = "";

            if (data.files.length === 0) {
                fileList.innerHTML += "<p>No files uploaded yet.</p>";
            } else {
                data.files.forEach((filename) => {
                    fileList.innerHTML += `
                        <p>${filename}</p>
                        <button onclick="downloadFile('${filename}')">Download</button>
                        <button onclick="deleteFile('${filename}')">Delete</button>
                        <hr>
                    `;
                });
            }
        });
}

function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            loadFiles();
            displayApiResponse(data.message);
        });
}

function downloadFile(filename) {
    window.location.href = `http://127.0.0.1:5000/download/${filename}`;
}

function deleteFile(filename) {
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
        fetch(`http://127.0.0.1:5000/files/${filename}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                loadFiles();
                displayApiResponse(data.message);
            });
    }
}

function getFileDetails() {
    const fileName = document.getElementById("fileName").value;
    if (!fileName) {
        alert("Please enter a file name.");
        return;
    }

    fetch(`http://127.0.0.1:5000/files/${fileName}`)
        .then((response) => response.json())
        .then((data) => {
            const fileDetails = document.getElementById("fileDetails");
            if (data.error) {
                fileDetails.innerHTML = `<p>${data.error}</p>`;
            } else {
                fileDetails.innerHTML = `<p>File Type: ${data.file_type}</p>`;
            }
            displayApiResponse(JSON.stringify(data));
        });
}

function updateFile() {
    const updateFileInput = document.getElementById("updateFileInput");
    const file = updateFileInput.files[0];
    const fileName = document.getElementById("fileName").value;
    if (!file || !fileName) {
        alert("Please select a file to update and enter a file name.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch(`http://127.0.0.1:5000/files/${fileName}`, {
        method: "PUT",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            loadFiles();
            displayApiResponse(data.message);
        });
}

function displayApiResponse(response) {
    const apiResponseContainer = document.getElementById("apiResponse");
    apiResponseContainer.innerHTML = `<pre>${response}</pre>`;
}
