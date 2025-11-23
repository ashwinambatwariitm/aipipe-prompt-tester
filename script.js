async function sendRequest() {
    const token = document.getElementById("token").value;
    const systemPrompt = document.getElementById("systemPrompt").value;
    const userPrompt = document.getElementById("userPrompt").value;
    const model = document.getElementById("model").value;

    if (!token) {
        alert("Please enter your API token.");
        return;
    }

    const payload = {
        model: model,
        max_tokens: 500,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]
    };

    try {
        const response = await fetch(
            "https://aipipe.org/openrouter/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();
        document.getElementById("output").innerText =
            result.choices?.[0]?.message?.content || JSON.stringify(result, null, 2);

    } catch (err) {
        document.getElementById("output").innerText = "Error: " + err;
    }
}
