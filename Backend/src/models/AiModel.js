
import "dotenv/config";


async function getRecommended(payload) {

try {
    const res = await fetch('https://api.openai.com/v1/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,


		},
		method: 'POST',
		body: JSON.stringify(payload)
	});
    if(res.ok){
    const data = await res.json();
    return data;
    }else{
        console.error('API request failed:', res.statusText);
        return null;
    }


}
catch (error) {
    // Handle network errors here
    console.error('Network error:', error);
    return null;
  }
}

export default { getRecommended };
