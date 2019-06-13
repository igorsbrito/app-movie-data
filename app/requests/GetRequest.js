const getRequest = (url) => {

    return new Promise((resolve, reject) => {
        if (!url) reject("No URL!");


        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            //console.log(response.status);
            if (response.status == 200) {
                resolve({
                    success: true,
                    response: response,
                    error: null
                })
            } else {
                resolve({
                    success: false,
                    response: response,
                    error: null
                })
            }
        })
            .catch(error => {
                resolve({
                    success: null,
                    response: null,
                    error: error
                })
            });
    });
};

export { getRequest };