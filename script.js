function searchActivities() {
    const zipCode = document.getElementById('zipCodeInput').value.trim();

    if (!zipCode) {
        alert('Please enter a valid zip code.');
        return;
    }

    const apiKey = 'kI8kuRD21DFCHURUiS4Wt02Bt-HBKVLzxZHVQ_P813d3FF1H1PR4kNTDMx2DWvj0VPdVH2nl1ORJLlNihpVNgduz7C-jyDh_UmaHRoXlwDQB2u1xzhfeO05mw7QuZnYx';
    const endpoint = `https://api.yelp.com/v3/businesses/search?term=outdoor&location=${zipCode}`;

    fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to retrieve activities');
        }
        return response.json();
    })
    .then(data => {
        displayActivities(data.businesses);
    })
    .catch(error => {
        console.error('Error fetching activities:', error);
        alert('Failed to retrieve outdoor activities. Please try again.');
    });
}

function displayActivities(activities) {
    const activityResults = document.getElementById('activityResults');
    activityResults.innerHTML = ''; // Clear previous results

    if (activities.length === 0) {
        activityResults.textContent = 'No outdoor activities found nearby.';
        return;
    }

    const activityList = document.createElement('ul');
    activities.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.textContent = activity.name;
        activityList.appendChild(activityItem);
    });

    activityResults.appendChild(activityList);
}
