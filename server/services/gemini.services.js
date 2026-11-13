export const generateGeminiResponse = async (prompt) => {
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";
    const modelsToTry = [
        configuredModel,
        "gemini-3.5-flash",
        "gemini-3.8-flash",
        "gemini-flash-latest"
    ];

    // Remove duplicates while keeping order
    const candidateModels = [...new Set(modelsToTry)];
    let lastError = null;

    for (const model of candidateModels) {
        const Gemini_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        try {
            console.log(`[Gemini] Calling API using model: ${model}...`);
            const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                console.warn(`[Gemini] Model ${model} returned status ${response.status}: ${errText.substring(0, 150)}`);
                lastError = new Error(`Status ${response.status}: ${errText}`);
                continue; // Try next candidate model
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error("No text returned from Gemini");
            }

            let cleanText = text
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            const firstBrace = cleanText.indexOf('{');
            const lastBrace = cleanText.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                cleanText = cleanText.substring(firstBrace, lastBrace + 1);
            }

            return JSON.parse(cleanText);

        } catch (error) {
            console.error(`[Gemini] Error with model ${model}:`, error.message);
            lastError = error;
        }
    }

    throw new Error(lastError ? lastError.message : "All Gemini models failed to generate response");
};
