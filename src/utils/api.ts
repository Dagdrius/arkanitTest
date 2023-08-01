

const baseUrl = "https://api2.kod.mobi/api/v1/message"

const commonHeaders = {
  "x-api-key": "09459085-5327-4ae9-85a8-214b7755fc2a",
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",
  "Content-Type": "application/json"
}

const create = async (phone) => {
  try {
    
    const response = await fetch(`${baseUrl}/create?phone=${phone}`,
                                  {
                                    method: "GET",
                                    headers: commonHeaders
                                  })
                                 
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const send = async (session, type) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${baseUrl}/send?session_id=${session}&type=${type}`, {
      method: "GET",
      headers: commonHeaders
    });

    const data = await response.json();

    
    if (data.error) {
      throw new Error(data.error); 
    }

    return data; 
  } catch (err) {
   
    throw err;
  }
};

const check = async (session, code) => {
  console.log(code);
  try {
    const response = await fetch(`${baseUrl}/check?session_id=${session}&code=${code}`, {
      method: "GET",
      headers: commonHeaders
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 410) {
      throw new Error("Your password is invalid :(");
    }

    return data;
  } catch (err) {
    console.log(err);
    // Handle other error cases here if needed
  }
};

export {create, send, check};