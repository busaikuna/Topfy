function showNotification(message, type = "success") {
  console.log(`Notification: ${message}, Type: ${type}`)
}

async function addPreference(genre) {
  try {
    const response = await fetch("/user/preferences/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ genre }),
    })

    const data = await response.json()

    if (data.success) {
      showNotification("Preference added")
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  } catch (error) {
    showNotification("Error adding preference", "error")
  }
}

async function removePreference(genre) {
  try {
    const response = await fetch("/user/preferences/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ genre }),
    })

    const data = await response.json()

    if (data.success) {
      showNotification("Preference removed")
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  } catch (error) {
    showNotification("Error removing preference", "error")
  }
}
