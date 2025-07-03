export async function predictRent(data: any) {
  // Convert frontend values to match backend model
  const cleanedData = {
    region: data.region,
    type: data.type,
    sqfeet: parseFloat(data.sqfeet),
    beds: parseInt(data.beds),
    baths: parseInt(data.baths),
    comes_furnished: data.comes_furnished.toLowerCase() === "yes" ? 1 : 0,   // will be mapped in backend
    laundry_options: data.laundry_options,
    parking_options: data.parking_options,
    cats_allowed: data.cats_allowed.toLowerCase() === "yes" ? 1 : 0,
    dogs_allowed: data.dogs_allowed.toLowerCase() === "yes" ? 1 : 0,
  };

  console.log(cleanedData);
  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Predicted Rent:", result.predicted_rent);
      return result.predicted_rent;
    } else {
      console.error("❌ API Error:", result.error);
      return null;
    }
  } catch (error) {
    console.error("❌ Network Error:", error);
    return null;
  }
}
