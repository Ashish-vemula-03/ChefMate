const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateFoodImage(title) {
  try {
    const response = await axios({
      method: "post",
      url: "https://api-inference.huggingface.co/models/prompthero/openjourney",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        inputs: `${title}, food icon, minimalistic, isometric design, clean white background, professional illustration, vector style`,
      },
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data).toString("base64");
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Hugging Face Icon generation failed:", error);
    // Fallback food-related icons
    const fallbackIcons = [
      "https://cdn-icons-png.flaticon.com/512/1046/1046751.png",
      "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
      "https://cdn-icons-png.flaticon.com/512/1475/1475933.png"
    ];
    return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
  }
}

async function generateRecipesFromIngredients(ingredients) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new Error("Invalid ingredients list");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Generate an Indian recipe using these ingredients: ${ingredients.join(
      ", "
    )}. 
    Return the response in this exact JSON format:
    {
      "title": "Recipe Name",
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": ["step1", "step2"],
      "cuisine": "Indian",
      "difficulty": "Easy/Medium/Hard",
      "prepTime": number,
      "cookTime": number,
      "servings": number,
      "nutrition": {
        "calories": number,
        "protein": number,
        "fat": number,
        "carbs": number
      }
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const cleanedResponse = text.replace(/```json|```/g, "").trim();
      const recipeData = JSON.parse(cleanedResponse);

      // Generate food image using DeepAI
      const imageUrl = await generateFoodImage(recipeData.title);
      recipeData.imageUrl = imageUrl;

      return recipeData;
    } catch (parseError) {
      console.error("Parse error:", parseError);
      throw new Error("Failed to parse generated recipe");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate recipe using provided ingredients");
  }
}

module.exports = {
  generateRecipesFromIngredients,
};
