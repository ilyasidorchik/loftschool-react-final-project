export const fetchRoute = (address1, address2) =>
    fetch(`https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`)
        .then((response) => 
            (response.status !== 200) ? Promise.reject(response) : response.json()
        );