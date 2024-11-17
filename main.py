import google.generativeai as genai

GOOGLE_API_KEY = "1234ABCDEFGHIJKLMNOPQRSTUVWXYZabc"


genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

done = True
while done:
    user_input = input("Enter your brand name (or 'exit'): ")
    if user_input.lower() == 'exit':
        done = False
        break

    response = model.generate_content(
        f"What is the environmental sustainability score of the brand {user_input}? (1-10) only give the score nothing else"
    )
    
    if response and response.candidates:
        text = response.candidates[0].content.parts[0].text.strip()
        print(f"The environmental sustainability score of the brand '{user_input}' is: {text}/10")
    else:
        print("No response received.")
