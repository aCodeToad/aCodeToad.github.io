function searchActivities() {
    const zipCode = document.getElementById('zipCodeInput').value;
    const activityResults = document.getElementById('activityResults');

    const apiKey = 'kI8kuRD21DFCHURUiS4Wt02Bt-HBKVLzxZHVQ_P813d3FF1H1PR4kNTDMx2DWvj0VPdVH2nl1ORJLlNihpVNgduz7C-jyDh_UmaHRoXlwDQB2u1xzhfeO05mw7QuZnYx'; // Replace with your actual Yelp API key
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
        console.log('API Response:', data); // Log the API response for debugging
        // Clear previous results
        activityResults.innerHTML = '';

        // Display activity results
        if (data && data.businesses && data.businesses.length > 0) {
            const activityList = document.createElement('ul');
            data.businesses.forEach(business => {
                const activityItem = document.createElement('li');
                activityItem.textContent = business.name;
                activityList.appendChild(activityItem);
            });
            activityResults.appendChild(activityList);
        } else {
            activityResults.textContent = 'No outdoor activities found nearby.';
        }
    })
    .catch(error => {
        console.error('Error fetching activities:', error);
        activityResults.textContent = `Error fetching activities: ${error.message}`;
    });
}
